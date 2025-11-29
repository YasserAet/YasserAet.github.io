import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import './Experience.css';

function Experience() {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const experiences = [
        {
            title: t('experience.almoftah.title'),
            company: 'Almoftah Real Estate',
            location: t('experience.almoftah.location'),
            period: t('experience.almoftah.period'),
            description: t('experience.almoftah.description'),
            current: false
        },
        {
            title: t('experience.fssm.title'),
            company: 'Faculty of Sciences Semlalia (FSSM)',
            location: t('experience.fssm.location'),
            period: t('experience.fssm.period'),
            description: t('experience.fssm.description'),
            current: false
        },
        {
            title: t('experience.radeej.title'),
            company: 'RADEEJ - Régie Autonome de Distribution',
            location: t('experience.radeej.location'),
            period: t('experience.radeej.period'),
            description: t('experience.radeej.description'),
            current: false
        }
    ];

    return (
        <section id="experience" className="experience-section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="section-title">{t('experience.title')}</h2>
                    <p className="section-subtitle">{t('experience.subtitle')}</p>
                </motion.div>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="experience-item"
                        >
                            <div className="timeline-marker">
                                <Briefcase size={20} />
                            </div>
                            
                            <div className="experience-content">
                                {exp.current && (
                                    <span className="current-badge">{t('experience.current')}</span>
                                )}
                                <h3 className="experience-title">{exp.title}</h3>
                                <h4 className="experience-company">{exp.company}</h4>
                                
                                <div className="experience-meta">
                                    <div className="meta-item">
                                        <Calendar size={16} />
                                        <span>{exp.period}</span>
                                    </div>
                                    <div className="meta-item">
                                        <MapPin size={16} />
                                        <span>{exp.location}</span>
                                    </div>
                                </div>
                                
                                <p className="experience-description">{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
