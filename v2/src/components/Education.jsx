import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import './Education.css';

const Education = () => {
    const { t, i18n } = useTranslation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const education = [
        {
            degree: i18n.language === 'en' ? 'Engineering Cycle – Computer Science and Networks (MIAGE)' : 'Cycle d\'Ingénieur – Informatique et Réseaux (MIAGE)',
            institution: i18n.language === 'en' 
                ? 'Moroccan School of Engineering Sciences (EMSI)' 
                : 'École Marocaine des Sciences de l\'Ingénieur (EMSI)',
            location: i18n.language === 'en' ? 'Marrakech, Morocco' : 'Marrakech, Maroc',
            period: i18n.language === 'en' ? 'October 2023 – Present' : 'Octobre 2023 – En cours',
            specialization: i18n.language === 'en' 
                ? 'Software Development, Networks, Cybersecurity, Cloud Computing'
                : 'Développement logiciel, Réseaux, Cybersécurité, Cloud Computing',
            description: i18n.language === 'en'
                ? 'Advanced engineering program focusing on software development, network infrastructure, cybersecurity, and cloud computing technologies.'
                : 'Programme d\'ingénierie avancé axé sur le développement logiciel, l\'infrastructure réseau, la cybersécurité et les technologies cloud.',
            current: true
        },
        {
            degree: i18n.language === 'en' ? 'Specialized Technician Diploma' : 'Diplôme de Technicien Spécialisé',
            institution: i18n.language === 'en'
                ? 'Applied Technology Institute Al Massira'
                : 'Institut Spécialisé de Technologie Appliquée Al Massira',
            location: i18n.language === 'en' 
                ? 'El Jadida, Morocco' 
                : 'El Jadida, Maroc',
            period: i18n.language === 'en' ? 'July 2021 – July 2023' : 'Juillet 2021 – Juillet 2023',
            specialization: i18n.language === 'en'
                ? 'Digital Infrastructure, Cybersecurity Option'
                : 'Infrastructures digitales, Option cybersécurité',
            description: i18n.language === 'en'
                ? 'Comprehensive technical program focusing on digital infrastructure development and cybersecurity practices.'
                : 'Programme technique complet axé sur le développement d\'infrastructures numériques et les pratiques de cybersécurité.',
            current: false
        },
        {
            degree: i18n.language === 'en' ? 'Scientific Baccalaureate' : 'Baccalauréat Scientifique',
            institution: i18n.language === 'en' 
                ? 'Ezzaytouna School' 
                : 'École Ezzaytouna',
            location: i18n.language === 'en' ? 'El Jadida, Morocco' : 'El Jadida, Maroc',
            period: i18n.language === 'en' ? 'June 2019' : 'Juin 2019',
            specialization: i18n.language === 'en'
                ? 'Life and Earth Sciences'
                : 'Sciences de la vie et de la terre',
            description: i18n.language === 'en'
                ? 'High school diploma with focus on life and earth sciences, providing a strong foundation in scientific methodology.'
                : 'Diplôme d\'études secondaires axé sur les sciences de la vie et de la terre, fournissant une base solide en méthodologie scientifique.',
            current: false
        }
    ];

    return (
        <section id="education" className="education-section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="section-title">{t('education.title')}</h2>
                </motion.div>

                <div className="education-timeline">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`education-item ${edu.current ? 'current' : ''}`}
                        >
                            <div className="timeline-marker">
                                <div className="timeline-dot">
                                    <GraduationCap size={20} />
                                </div>
                                <div className="timeline-line"></div>
                            </div>

                            <motion.div
                                className="education-card"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                {edu.current && (
                                    <div className="current-badge">
                                        {t('education.current')}
                                    </div>
                                )}

                                <div className="education-header">
                                    <h3 className="education-degree">{edu.degree}</h3>
                                    <p className="education-institution">{edu.institution}</p>
                                </div>

                                <div className="education-meta">
                                    <div className="meta-item">
                                        <Calendar size={16} />
                                        <span>{edu.period}</span>
                                    </div>
                                    <div className="meta-item">
                                        <MapPin size={16} />
                                        <span>{edu.location}</span>
                                    </div>
                                </div>

                                <div className="education-specialization">
                                    <strong>
                                        {i18n.language === 'en' ? 'Specialization:' : 'Spécialisation :'}
                                    </strong>
                                    <span>{edu.specialization}</span>
                                </div>

                                <p className="education-description">{edu.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
