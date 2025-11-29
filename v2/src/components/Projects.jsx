import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Projects.css';

const Projects = () => {
    const { t, i18n } = useTranslation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const projects = [
        {
            title: i18n.language === 'en' 
                ? 'Complete E-Learning Platform' 
                : 'Plateforme E-Learning Complète',
            description: i18n.language === 'en'
                ? 'Full stack web application with integrated payment system for online learning. Modern and secure platform enabling course management, user enrollment, and payment processing.'
                : 'Application web full stack avec système de paiement intégré pour l\'apprentissage en ligne. Plateforme moderne et sécurisée permettant la gestion de cours, l\'inscription des utilisateurs et le traitement des paiements.',
            features: i18n.language === 'en' ? [
                'User authentication and authorization system',
                'Course management and enrollment',
                'Integrated Stripe payment processing',
                'RESTful API with Django REST Framework',
                'Responsive React frontend'
            ] : [
                'Système d\'authentification et d\'autorisation des utilisateurs',
                'Gestion et inscription aux cours',
                'Traitement des paiements Stripe intégré',
                'API RESTful avec Django REST Framework',
                'Frontend React responsive'
            ],
            technologies: ['React', 'Django', 'Django REST Framework', 'Axios', 'SQLite', 'Stripe API'],
            year: '2024'
        },
        {
            title: i18n.language === 'en'
                ? 'Cafeteria Management Application'
                : 'Application de Gestion de Cafétéria',
            description: i18n.language === 'en'
                ? 'Complete management solution with modern interface and REST API for cafeteria operations. Features order management, inventory tracking, and real-time updates.'
                : 'Solution de gestion complète avec interface moderne et API REST pour les opérations de cafétéria. Comprend la gestion des commandes, le suivi des stocks et les mises à jour en temps réel.',
            features: i18n.language === 'en' ? [
                'Modern React interface with Redux state management',
                'RESTful API with Express.js backend',
                'Real-time order tracking and updates',
                'Inventory management system',
                'MS SQL Server database integration'
            ] : [
                'Interface React moderne avec gestion d\'état Redux',
                'API RESTful avec backend Express.js',
                'Suivi et mises à jour des commandes en temps réel',
                'Système de gestion des stocks',
                'Intégration de base de données MS SQL Server'
            ],
            technologies: ['React', 'Redux', 'Express.js', 'Node.js', 'MS SQL Server'],
            year: '2023'
        },
        {
            title: i18n.language === 'en'
                ? 'Real Estate Management System'
                : 'Système de Gestion Immobilière',
            description: i18n.language === 'en'
                ? 'Complete real estate management system with modern and secure web interface developed for Almoftah Real Estate. Features property listings, client management, and transaction tracking.'
                : 'Système complet de gestion immobilière avec interface web moderne et sécurisée développé pour Almoftah Real Estate. Comprend les annonces de propriétés, la gestion des clients et le suivi des transactions.',
            features: i18n.language === 'en' ? [
                'Property listing and management',
                'Client relationship management',
                'Transaction tracking and reporting',
                'Secure authentication system',
                'Responsive modern interface'
            ] : [
                'Gestion et annonces de propriétés',
                'Gestion de la relation client',
                'Suivi et reporting des transactions',
                'Système d\'authentification sécurisé',
                'Interface moderne responsive'
            ],
            technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
            year: '2025'
        },
        {
            title: i18n.language === 'en'
                ? 'University Course Management System'
                : 'Système de Gestion de Cours Universitaires',
            description: i18n.language === 'en'
                ? 'Complete course management solution developed for Faculty of Sciences Semlalia (FSSM). Features course scheduling, student enrollment, grade management, and administrative tools.'
                : 'Solution complète de gestion de cours développée pour la Faculté des Sciences Semlalia (FSSM). Comprend la planification des cours, l\'inscription des étudiants, la gestion des notes et les outils administratifs.',
            features: i18n.language === 'en' ? [
                'Course scheduling and management',
                'Student enrollment system',
                'Grade tracking and reporting',
                'Administrative dashboard',
                'User role management'
            ] : [
                'Planification et gestion des cours',
                'Système d\'inscription des étudiants',
                'Suivi et reporting des notes',
                'Tableau de bord administratif',
                'Gestion des rôles utilisateurs'
            ],
            technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap'],
            year: '2024'
        }
    ];

    return (
        <section id="projects" className="projects-section" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-header"
                >
                    <h2 className="section-title">{t('projects.title')}</h2>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="project-card"
                        >
                            <div className="project-content">
                                <div className="project-header">
                                    <h3 className="project-title">{project.title}</h3>
                                    <span className="year-badge">{project.year}</span>
                                </div>
                                
                                <p className="project-description">{project.description}</p>

                                <div className="project-features">
                                    {project.features.map((feature, idx) => (
                                        <div key={idx} className="feature-item">
                                            <span className="feature-dot">•</span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="project-technologies">
                                    {project.technologies.map((tech, idx) => (
                                        <span key={idx} className="tech-badge">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
