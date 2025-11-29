import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate form submission
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    const contactInfo = [
        { 
            icon: Mail, 
            label: 'Email', 
            value: 'fkelladi@gmail.com', 
            link: 'mailto:fkelladi@gmail.com' 
        },
  
        { 
            icon: MapPin, 
            label: 'Location', 
            value: 'Marrakech, Morocco', 
            link: '#' 
        },
        { 
            icon: Github, 
            label: 'GitHub', 
            value: 'github.com/fatimaezzahrakld', 
            link: 'https://github.com/fatimaezzahrakld/' 
        },
        { 
            icon: Linkedin, 
            label: 'LinkedIn', 
            value: 'linkedin.com/in/fatima-ezzahra-kelladi', 
            link: 'https://www.linkedin.com/in/fatima-ezzahra-kelladi/' 
        }
    ];

    return (
        <section id="contact" className="contact section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">{t('contact.title')}</h2>
                    <p className="contact-subtitle">{t('contact.subtitle')}</p>
                </motion.div>

                <div className="contact-content">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={info.link}
                                    className="contact-info-item glass-card"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    target={info.link.startsWith('http') ? '_blank' : undefined}
                                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    <span className="contact-icon">
                                        <Icon size={24} />
                                    </span>
                                    <div className="contact-details">
                                        <div className="contact-label">{info.label}</div>
                                        <div className="contact-value">{info.value}</div>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </motion.div>

                    <motion.form
                        className="contact-form glass-card"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">{t('contact.name')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">{t('contact.email')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">{t('contact.message')}</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="btn-gradient"
                            disabled={status === 'sending'}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>
                                {status === 'sending' ? t('contact.sending') : t('contact.send')}
                            </span>
                        </motion.button>

                        {status === 'success' && (
                            <motion.div
                                className="form-success"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                ✅ {t('contact.success')}
                            </motion.div>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
