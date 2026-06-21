import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, MapPin, GraduationCap, Code2 } from 'lucide-react';
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

  const snapshotRows = [
    { icon: GraduationCap, text: t('about.snapshot.role') },
    { icon: Briefcase, text: t('about.snapshot.pfe') },
    { icon: MapPin, text: t('about.snapshot.location') },
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

          {/* Snapshot */}
          <div className="about-card">
            <div className="glass-effect p-8 rounded-2xl h-full">
              <h3 className="text-xl font-bold text-gradient mb-6">
                {t('about.snapshot.title')}
              </h3>
              <div className="space-y-5">
                {snapshotRows.map((row, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-600/20 rounded-full flex items-center justify-center">
                      <row.icon className="text-primary-400" size={18} />
                    </div>
                    <span className="text-dark-100 font-medium pt-1.5">{row.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-dark-700">
                <div className="flex items-center gap-2 mb-3 text-sm text-dark-300">
                  <Code2 size={16} className="text-primary-400" />
                  {t('about.snapshot.languagesLabel')}
                </div>
                <p className="text-dark-200 text-sm leading-relaxed">
                  {t('about.snapshot.languages')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
