import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Layers, Boxes, ScanEye } from 'lucide-react';
import gsap from 'gsap';

const icons = [Brain, Layers, Boxes, ScanEye];

const WhatIBuild = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.build-card', {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [inView]);

  const items = t('whatIBuild.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section
      id="what-i-build"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-dark-800 to-dark-900"
    >
      <div ref={inViewRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            {t('whatIBuild.title')}
          </h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-4">
            {t('whatIBuild.subtitle')}
          </p>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="build-card glass-effect rounded-2xl p-6 flex flex-col"
              >
                <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="text-primary-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;
