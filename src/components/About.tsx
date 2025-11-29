import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Briefcase, Code } from 'lucide-react';
import gsap from 'gsap';

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.about-card', {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [inView]);

  const stats = [
    { icon: Briefcase, value: '2+', label: t('about.yearsExperience') },
    { icon: Code, value: '15+', label: t('about.projectsCompleted') },
    { icon: Award, value: '20+', label: t('about.technologies') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-dark-900 to-dark-800"
    >
      <div ref={inViewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Description */}
          <div className="about-card space-y-6">
            <p className="text-lg text-dark-200 leading-relaxed">
              {t('about.description')}
            </p>
            <p className="text-lg text-dark-300 leading-relaxed">
              {t('about.objective')}
            </p>
          </div>

          {/* Stats */}
          <div className="about-card grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, translateY: -5 }}
                className="glass-effect p-6 rounded-2xl text-center"
              >
                <stat.icon className="w-10 h-10 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-dark-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
