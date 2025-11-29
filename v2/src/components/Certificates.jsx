import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Calendar } from 'lucide-react';
import './Certificates.css';

const Certificates = () => {
    const { t, i18n } = useTranslation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });
    const certificates = [
        {
            title: i18n.language === 'en' 
                ? 'Cloud Computing Fundamentals' 
                : 'Notions de Cloud Computing',
            issuer: 'Microsoft Azure',
            date: '2024'
        },
        {
            title: i18n.language === 'en'
                ? 'Introduction to Containers: Docker, Kubernetes & OpenShift'
                : 'Conteneurs : Docker, Kubernetes & OpenShift',
            issuer: 'Coursera',
            date: '2024'
        },
        {
            title: i18n.language === 'en' 
                ? 'Azure Networking' 
                : 'Réseaux Azure',
            issuer: 'Microsoft',
            date: '2024'
        },
        {
            title: i18n.language === 'en' 
                ? 'React Basics' 
                : 'Fondamentaux de React',
            issuer: 'Coursera',
            date: '2024'
        },
        {
            title: i18n.language === 'en' 
                ? 'Introduction to Java and Object-Oriented Programming' 
                : 'Introduction à Java et la Programmation Orientée Objet',
            issuer: 'Coursera',
            date: '2024'
        }
    ];

    return (
        <section id="certificates" className="certificates-section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="section-title">{t('certificates.title')}</h2>
                </motion.div>

                <div className="certificates-grid">
                    {certificates.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="certificate-card"
                        >
                            <div className="certificate-icon">
                                <Award size={24} />
                            </div>
                            <h3 className="certificate-title">{cert.title}</h3>
                            <p className="certificate-issuer">{cert.issuer}</p>
                            <div className="certificate-meta">
                                <Calendar size={16} />
                                <span>{cert.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
