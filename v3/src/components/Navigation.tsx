import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const navItems = ['home', 'about', 'experience', 'education', 'certificates', 'projects', 'skills', 'contact'];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop blur when scrolled */}
      <div className={`fixed top-0 left-0 right-0 h-20 z-40 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-dark-900/60' : 'bg-transparent'
      }`} />
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Modern Centered Container */}
          <div className={`relative rounded-2xl transition-all duration-500 ${
            scrolled 
              ? 'bg-dark-800/80 backdrop-blur-md shadow-2xl border border-primary-500/10' 
              : 'bg-dark-800/40 backdrop-blur-sm'
          }`}>
            <div className="flex items-center justify-between px-6 py-3 md:py-4">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <div className="text-xl md:text-2xl font-display font-bold">
                  <span className="text-white">Yassir</span>
                  <span className="text-primary-400"> Aitali</span>
                </div>
              </motion.div>

              {/* Desktop Navigation - Centered */}
              <div className="hidden md:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center space-x-1 bg-dark-900/50 rounded-full px-2 py-1.5 border border-primary-500/10 flex-nowrap">
                  {navItems.map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item)}
                      className="relative px-3 py-2 text-dark-200 hover:text-white transition-all duration-300 font-medium text-xs lg:text-sm rounded-full group whitespace-nowrap"
                    >
                      <span className="relative z-10">{t(`nav.${item}`)}</span>
                      <motion.div
                        className="absolute inset-0 bg-primary-600/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLanguage}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-primary-500/50 transition-all duration-300 font-bold text-sm"
                >
                  {i18n.language.toUpperCase()}
                </motion.button>

                {/* Mobile Buttons */}
                <div className="md:hidden flex items-center space-x-2">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleLanguage} 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-600/20 text-primary-400 hover:bg-primary-600 hover:text-white transition-all text-xs font-bold"
                  >
                    {i18n.language.toUpperCase()}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-600/20 text-primary-400 hover:bg-primary-600 hover:text-white transition-all"
                  >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 mx-4"
            >
              <div className="bg-dark-800/95 backdrop-blur-xl rounded-2xl border border-primary-500/20 shadow-2xl overflow-hidden">
                <div className="p-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item)}
                      className="w-full text-left px-4 py-3 text-dark-100 hover:text-white transition-all text-base font-medium rounded-xl hover:bg-primary-600/20 flex items-center space-x-3 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:scale-150 transition-transform" />
                      <span>{t(`nav.${item}`)}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;
