import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const Skills = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.skill-category', {
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

  const categories = t('skills.categories', { returnObjects: true }) as Record<
    string,
    { title: string; items: string[] }
  >;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-dark-800 to-dark-900"
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
            {t('skills.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([key, category], index) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05, y: -5 }}
              className="skill-category glass-effect rounded-2xl p-6"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gradient mb-2">{category.title}</h3>
                <div className="w-12 h-1 bg-primary-500 rounded-full" />
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(14, 165, 233, 0.3)' }}
                    className="px-4 py-2 bg-dark-700 hover:bg-primary-600/20 text-dark-200 hover:text-primary-400 rounded-full text-sm font-medium transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
