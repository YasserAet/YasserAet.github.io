import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import './Announcement.css';

const Announcement = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true);

    const handleScrollToContact = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="announcement-banner"
                >
                    <div className="announcement-container">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="announcement-close"
                            aria-label="Close announcement"
                        >
                            <X size={18} />
                        </button>

                        <div className="announcement-content">
                            <div className="announcement-badge">
                                <Sparkles size={16} />
                                <span>{t('announcement.badge')}</span>
                            </div>

                            <h3 className="announcement-title">
                                {t('announcement.title')}
                            </h3>

                            <p className="announcement-details">
                                {t('announcement.details')}
                            </p>

                            <motion.button
                                className="announcement-cta"
                                onClick={handleScrollToContact}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('announcement.cta')}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Announcement;
