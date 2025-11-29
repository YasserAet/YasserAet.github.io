import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const Navigation = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };

    const navItems = [
        { key: 'home', href: '#home' },
        { key: 'about', href: '#about' },
        { key: 'experience', href: '#experience' },
        { key: 'education', href: '#education' },
        { key: 'certificates', href: '#certificates' },
        { key: 'projects', href: '#projects' },
        { key: 'skills', href: '#skills' },
        { key: 'contact', href: '#contact' }
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={`navigation ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="nav-container">
                <motion.div
                    className="nav-logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
                        <span className="logo-text">FatimaEzzahra</span>
                    </a>
                </motion.div>

                {/* Desktop Menu */}
                <ul className="nav-menu desktop-menu">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.key}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <a
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="nav-link"
                            >
                                {t(`nav.${item.key}`)}
                            </a>
                        </motion.li>
                    ))}
                </ul>

                {/* Language Toggle */}
                <motion.button
                    className="lang-toggle"
                    onClick={toggleLanguage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="lang-text">{i18n.language === 'en' ? 'FR' : 'EN'}</span>
                </motion.button>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="nav-menu">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.key}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className="nav-link"
                                    >
                                        {t(`nav.${item.key}`)}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navigation;
