import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import gsap from 'gsap';

const Education = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.education-item', {
          opacity: 0,
          x: 50,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power3.out',
        });

        gsap.from('.education-line', {
          scaleY: 0,
          duration: 1.5,
          ease: 'power2.out',
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [inView]);

  const education = t('education.degrees', { returnObjects: true }) as Array<{
    degree: string;
    institution: string;
    period: string;
    location: string;
    specialization: string;
    description?: string;
  }>;

  return (
    <section
      id="education"
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
            {t('education.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-600/50 education-line origin-top md:transform md:-translate-x-1/2" />

          {/* Education Items */}
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`education-item relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-primary-600 rounded-full border-4 border-dark-900 md:transform md:-translate-x-1/2 flex items-center justify-center glow-effect z-10">
                  <GraduationCap size={16} className="text-white" />
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`ml-20 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'
                  }`}
                >
                  <div className="glass-effect p-6 rounded-2xl">
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-primary-400 text-sm">
                        <Calendar size={16} />
                        {edu.period}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gradient">
                        {edu.degree}
                      </h3>
                    </div>

                    <div className="text-lg font-semibold text-dark-100 mb-2">
                      {edu.institution}
                    </div>

                    <div className="flex items-center text-dark-300 mb-4">
                      <MapPin size={16} className="mr-1" />
                      {edu.location}
                    </div>

                    <div className="flex items-start text-dark-200 mb-3">
                      <Award size={18} className="text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Specialization: </span>
                        {edu.specialization}
                      </div>
                    </div>

                    {edu.description && (
                      <p className="text-dark-300 text-sm">{edu.description}</p>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
