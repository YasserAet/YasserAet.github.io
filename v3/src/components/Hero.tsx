import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, X, Download } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const { t, i18n } = useTranslation();
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
      {/* Value Banner */}
      <AnimatePresence>
        {isAnnouncementVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="fixed top-28 md:top-32 left-0 right-0 z-40 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-dark-800/80 backdrop-blur-md rounded-full shadow-xl border border-primary-500/20 pointer-events-auto overflow-hidden"
              >
                <div className="relative flex items-center gap-3 px-5 py-2.5 pr-10">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  <p className="text-dark-200 text-xs md:text-sm text-center flex-1 leading-snug">
                    {t('announcement.text')}
                  </p>
                  <button
                    onClick={() => setIsAnnouncementVisible(false)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-dark-300 hover:text-white transition-colors"
                    aria-label="Close banner"
                  >
                    <X size={16} />
                  </button>
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

          {/* Tagline */}
          <p className="hero-text text-lg md:text-2xl text-primary-400 font-medium tracking-wide">
            {t('hero.tagline')}
          </p>

          {/* Description */}
          <p className="hero-text text-base md:text-lg text-dark-300 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Capability Badges */}
          <div className="hero-text flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-3xl mx-auto pt-2">
            {(t('hero.badges', { returnObjects: true }) as string[]).map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 bg-primary-600/10 border border-primary-500/20 text-primary-300 rounded-full text-xs md:text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-text flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold text-lg transition-all shadow-lg"
            >
              {t('hero.viewWork')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-4 glass-effect hover:bg-white/10 text-white rounded-full font-semibold text-lg transition-all"
            >
              {t('hero.discuss')}
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

          {/* Discreet availability line */}
          <p className="hero-text text-sm text-dark-400 max-w-2xl mx-auto pt-2">
            {t('hero.availability')}
          </p>
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
