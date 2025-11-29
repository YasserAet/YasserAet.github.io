import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, X, Download } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements
      gsap.from('.hero-text', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Parallax effect
      gsap.to('.parallax-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Professional Announcement Banner */}
      <AnimatePresence>
        {isAnnouncementVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed top-28 md:top-32 left-0 right-0 z-40 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-primary-600/95 via-primary-500/95 to-primary-600/95 backdrop-blur-sm rounded-xl shadow-2xl border border-primary-400/30 pointer-events-auto overflow-hidden"
              >
                <div className="relative">
                  {/* Animated background stripe */}
                  <motion.div
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setIsAnnouncementVisible(false)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
                    aria-label="Close announcement"
                  >
                    <X size={18} />
                  </button>
                  
                  <div className="relative px-6 py-4 md:py-5 pr-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      {/* Main announcement */}
                      <div className="text-center md:text-left flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                          <div className="px-3 py-1 bg-white/20 rounded-full">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">
                              {t('announcement.badge')}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-white font-bold text-xl md:text-2xl mb-1">
                          {t('announcement.title')}
                        </h3>
                        <p className="text-primary-50 text-sm md:text-base">
                          {t('announcement.details')}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                      >
                        {t('announcement.cta')}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 pt-48 md:pt-56"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 parallax-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl float-element" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl float-element" style={{ animationDelay: '1s' }} />
        </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div ref={textRef} className="text-center space-y-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center space-x-2 hero-text"
          >
            <Sparkles className="text-primary-400" size={24} />
            <span className="text-lg md:text-xl text-primary-400 font-medium">
              {t('hero.greeting')}
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-display font-bold">
            <span className="text-gradient">{t('hero.name')}</span>
          </h1>

          {/* Title */}
          <h2 className="hero-text text-2xl md:text-4xl lg:text-5xl font-display font-semibold text-dark-100">
            {t('hero.title')}
          </h2>

          {/* Subtitle */}
          <p className="hero-text text-lg md:text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="hero-text flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold text-lg transition-all shadow-lg"
            >
              {t('hero.cta')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-4 glass-effect hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all"
            >
              {t('hero.contact')}
            </motion.button>
            <motion.a
              href={i18n.language === 'fr' ? '/CV_Yassir_Aitali_FR.pdf' : '/CV_Yassir_Aitali_EN.pdf'}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-effect hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all inline-flex items-center gap-2"
            >
              <Download size={20} />
              {t('hero.downloadCV')}
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToProjects}
      >
        <ChevronDown className="text-primary-400" size={32} />
      </motion.div>
      </section>
    </>
  );
};

export default Hero;
