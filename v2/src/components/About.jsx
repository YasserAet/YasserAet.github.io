import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import './About.css';

const About = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const statsRef = useRef([]);

    useEffect(() => {
        if (isInView && statsRef.current.length > 0) {
            statsRef.current.forEach((stat, index) => {
                const target = parseInt(stat.dataset.target);
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    delay: index * 0.2,
                    snap: { innerText: 1 },
                    ease: 'power1.out'
                });
            });
        }
    }, [isInView]);

    const stats = [
        { value: 2, label: t('about.yearsExperience'), suffix: '+' },
        { value: 10, label: t('about.projectsCompleted'), suffix: '+' },
        { value: 15, label: t('about.technologies'), suffix: '+' }
    ];

    return (
        <section id="about" className="about section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">{t('about.title')}</h2>
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-text glass-card"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p>{t('about.description')}</p>
                    </motion.div>

                    <motion.div
                        className="about-stats"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card glass-card">
                                <div className="stat-value">
                                    <span
                                        ref={(el) => (statsRef.current[index] = el)}
                                        data-target={stat.value}
                                    >
                                        0
                                    </span>
                                    <span className="stat-suffix">{stat.suffix}</span>
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
