import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            nav: {
                home: "Home",
                about: "About",
                experience: "Experience",
                education: "Education",
                certificates: "Certificates",
                skills: "Skills",
                projects: "Projects",
                contact: "Contact"
            },
            announcement: {
                badge: "Open to Opportunities",
                title: "Actively Seeking PFE Internship",
                details: "Available from February 2025 • 4-6 months • Open to full-time conversion",
                cta: "Get in Touch"
            },
            hero: {
                greeting: "Hello, I'm",
                name: "Fatima Ezzahra Kelladi",
                title: "Full Stack Engineer",
                subtitle: "Fifth-year computer networks engineering student specializing in Full Stack development and cybersecurity",
                cta: "View My Work",
                contact: "Get In Touch",
                downloadCV: "Download CV"
            },
            about: {
                title: "About Me",
                description: "Fifth-year computer networks engineering student specializing in Full Stack development and cybersecurity. Passionate about technological innovation, designing secure and high-performance web and mobile applications. With strong skills in software architecture, cloud computing, and information systems security, I am rigorous, results-oriented, and able to lead technical projects involving performance, scalability, and security.",
                yearsExperience: "Years Experience",
                projectsCompleted: "Projects Completed",
                technologies: "Technologies"
            },
            experience: {
                title: "Professional Experience",
                subtitle: "My professional journey and internships",
                current: "Present",
                almoftah: {
                    title: "Full Stack Developer",
                    location: "Muscat, Oman",
                    period: "July 2025 - August 2025",
                    description: "Development of a full real estate management system with a modern and secure web interface."
                },
                fssm: {
                    title: "Full Stack Developer",
                    location: "Marrakech, Morocco",
                    period: "July 2024 - August 2024",
                    description: "Design and development of a complete course management solution for the university."
                },
                radeej: {
                    title: "Cybersecurity Intern",
                    location: "El Jadida, Morocco",
                    period: "April 2023 - May 2023",
                    description: "User awareness on cybersecurity best practices and information security."
                }
            },
            education: {
                title: "Education",
                current: "Present"
            },
            certificates: {
                title: "Certificates & Achievements",
                viewAll: "View All Certificates",
                credentialId: "Credential ID"
            },
            skills: {
                title: "Skills & Technologies",
                languages: "Programming Languages",
                xr: "Frameworks & Libraries",
                devops: "DevOps & Cloud",
                databases: "Databases",
                aiml: "Tools & IDEs"
            },
            projects: {
                title: "Projects",
                viewProject: "View Project",
                viewCode: "View Code",
                featured: "Featured"
            },
            contact: {
                title: "Let's Work Together",
                subtitle: "Have a project in mind? Let's discuss how I can help bring your ideas to life.",
                name: "Your Name",
                email: "Your Email",
                message: "Your Message",
                send: "Send Message",
                sending: "Sending...",
                success: "Message sent successfully!",
                error: "Failed to send message. Please try again."
            },
            footer: {
                rights: "All rights reserved."
            }
        }
    },
    fr: {
        translation: {
            nav: {
                home: "Accueil",
                about: "À Propos",
                experience: "Expérience",
                education: "Éducation",
                certificates: "Certificats",
                skills: "Compétences",
                projects: "Projets",
                contact: "Contact"
            },
            announcement: {
                badge: "Disponible pour de nouvelles opportunités",
                title: "Recherche Active de Stage PFE",
                details: "Disponible dès Février 2025 • 4-6 mois • Possibilité de recrutement",
                cta: "Me Contacter"
            },
            hero: {
                greeting: "Bonjour, je suis",
                name: "Fatima Ezzahra Kelladi",
                title: "Ingénieure Full Stack",
                subtitle: "Étudiante en cinquième année de Réseaux Informatiques, spécialisée en développement Full Stack et cybersécurité",
                cta: "Voir Mon Travail",
                contact: "Me Contacter",
                downloadCV: "Télécharger CV"
            },
            about: {
                title: "À Propos de Moi",
                description: "Étudiante en cinquième année de Réseaux Informatiques, spécialisée en développement Full Stack et cybersécurité. Passionnée par l'innovation technologique, je conçois des applications web et mobiles performantes et sécurisées. Possédant une solide expertise en architecture logicielle, cloud computing et sécurité des systèmes d'information, je suis rigoureuse, orientée résultats et capable de mener des projets techniques alliant performance, scalabilité et sécurité.",
                yearsExperience: "Années d'Expérience",
                projectsCompleted: "Projets Réalisés",
                technologies: "Technologies"
            },
            experience: {
                title: "Expérience Professionnelle",
                subtitle: "Mon parcours professionnel et stages",
                current: "Présent",
                almoftah: {
                    title: "Développeuse Full Stack",
                    location: "Muscat, Oman",
                    period: "Juillet 2025 - Août 2025",
                    description: "Développement d'un système complet de gestion immobilière avec une interface web moderne et sécurisée."
                },
                fssm: {
                    title: "Développeuse Full Stack",
                    location: "Marrakech, Maroc",
                    period: "Juillet 2024 - Août 2024",
                    description: "Conception et développement d'une solution complète de gestion des cours pour l'université."
                },
                radeej: {
                    title: "Stagiaire en Cybersécurité",
                    location: "El Jadida, Maroc",
                    period: "Avril 2023 - Mai 2023",
                    description: "Sensibilisation des utilisateurs aux bonnes pratiques de cybersécurité et à la sécurité de l'information."
                }
            },
            education: {
                title: "Éducation",
                current: "Présent"
            },
            certificates: {
                title: "Certificats & Réalisations",
                viewAll: "Voir Tous les Certificats",
                credentialId: "ID de certification"
            },
            skills: {
                title: "Compétences & Technologies",
                languages: "Langages de Programmation",
                xr: "Frameworks & Bibliothèques",
                devops: "DevOps & Cloud",
                databases: "Bases de Données",
                aiml: "Outils & IDEs"
            },
            projects: {
                title: "Projets",
                viewProject: "Voir le Projet",
                viewCode: "Voir le Code",
                featured: "En vedette"
            },
            contact: {
                title: "Travaillons Ensemble",
                subtitle: "Vous avez un projet en tête ? Discutons de la façon dont je peux vous aider à concrétiser vos idées.",
                name: "Votre Nom",
                email: "Votre Email",
                message: "Votre Message",
                send: "Envoyer le Message",
                sending: "Envoi en cours...",
                success: "Message envoyé avec succès !",
                error: "Échec de l'envoi du message. Veuillez réessayer."
            },
            footer: {
                rights: "Tous droits réservés."
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
