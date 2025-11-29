import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

const Skills = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skillCategories = [
        {
            title: t('skills.languages'),
            skills: [
                { name: 'Java', level: 85 },
                { name: 'Python', level: 85 },
                { name: 'JavaScript', level: 90 },
                { name: 'TypeScript', level: 85 },
                { name: 'C', level: 75 },
                { name: 'C#', level: 75 },
                { name: 'PHP', level: 80 },
                { name: 'SQL', level: 85 },
                { name: 'HTML/CSS', level: 95 }
            ]
        },
        {
            title: t('skills.xr'),
            skills: [
                { name: 'React', level: 90 },
                { name: 'Redux', level: 85 },
                { name: 'Django', level: 85 },
                { name: 'Django REST Framework', level: 85 },
                { name: 'Express.js', level: 85 },
                { name: 'Node.js', level: 85 },
                { name: 'Axios', level: 90 }
            ]
        },
        {
            title: t('skills.devops'),
            skills: [
                { name: 'Git', level: 90 },
                { name: 'GitHub', level: 90 },
                { name: 'Docker', level: 80 },
                { name: 'Azure', level: 75 },
                { name: 'CI/CD', level: 75 }
            ]
        },
        {
            title: t('skills.databases'),
            skills: [
                { name: 'SQLite', level: 85 },
                { name: 'MySQL', level: 85 },
                { name: 'MS SQL Server', level: 85 },
                { name: 'MongoDB', level: 80 }
            ]
        },
        {
            title: t('skills.aiml'),
            skills: [
                { name: 'VS Code', level: 90 },
                { name: 'IntelliJ IDEA', level: 85 },
                { name: 'Postman', level: 85 },
                { name: 'Stripe API', level: 80 }
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="skills" className="skills section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">{t('skills.title')}</h2>
                </motion.div>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            className="skill-category glass-card"
                            variants={itemVariants}
                        >
                            <h3 className="category-title">{category.title}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skillIndex}
                                        className="skill-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                                    >
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <motion.div
                                                className="skill-progress"
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                                transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
