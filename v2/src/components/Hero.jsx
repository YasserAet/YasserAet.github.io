import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const { t, i18n } = useTranslation();
    const heroRef = useRef(null);
    const cursorRef = useRef(null);
    
    const cvFile = i18n.language === 'en' 
        ? '/cv_kelladi eng.pdf' 
        : '/cv_kelladi fr.pdf';

    useEffect(() => {
        // Animated gradient background
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to('.hero-gradient', {
            backgroundPosition: '100% 50%',
            duration: 8,
            ease: 'none'
        });

        // Floating animation for decorative elements
        gsap.to('.floating-element', {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            stagger: 0.3
        });

        // Custom cursor effect
        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            tl.kill();
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    const handleScrollToWork = () => {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScrollToContact = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero-gradient"></div>
            <div ref={cursorRef} className="custom-cursor"></div>

            {/* Floating decorative elements */}
            <div className="floating-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
            </div>

            <motion.div
                className="hero-content container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="hero-text" variants={itemVariants}>
                    <motion.p
                        className="hero-greeting"
                        variants={itemVariants}
                    >
                        {t('hero.greeting')}
                    </motion.p>

                    <motion.h1
                        className="hero-name"
                        variants={itemVariants}
                    >
                        {t('hero.name')}
                    </motion.h1>

                    <motion.h2
                        className="hero-title"
                        variants={itemVariants}
                    >
                        {t('hero.title')}
                    </motion.h2>

                    <motion.p
                        className="hero-subtitle"
                        variants={itemVariants}
                    >
                        {t('hero.subtitle')}
                    </motion.p>
                </motion.div>

                <motion.div
                    className="hero-cta"
                    variants={itemVariants}
                >
                    <motion.button
                        className="btn-gradient"
                        onClick={handleScrollToWork}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{t('hero.cta')}</span>
                    </motion.button>

                    <motion.button
                        className="btn-outline"
                        onClick={handleScrollToContact}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>{t('hero.contact')}</span>
                    </motion.button>

                    <motion.a
                        href={cvFile}
                        download
                        className="btn-outline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Download size={20} />
                        <span>{t('hero.downloadCV')}</span>
                    </motion.a>
                </motion.div>

                <motion.div
                    className="hero-scroll-indicator"
                    variants={itemVariants}
                    animate={{
                        y: [0, 10, 0],
                        transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }
                    }}
                >
                    <div className="scroll-line"></div>
                    <div className="scroll-dot"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
