import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ExternalLink,
  Github,
  Lock,
  Building2,
  Boxes,
  ParkingSquare,
  ScanEye,
  ShieldCheck,
  Gauge,
  Brain,
  Code2,
  ArrowUpRight,
} from 'lucide-react';
import gsap from 'gsap';

interface FeaturedProject {
  title: string;
  tagline: string;
  context: string;
  problem: string;
  built: string;
  stack: string[];
  demonstrates: string;
  status: string;
  tags: string[];
  confidential?: boolean;
  github?: string;
  demo?: string;
  image?: string;
}

interface AlsoBuilt {
  title: string;
  github?: string;
}

// Pick a placeholder icon based on project content
const getProjectIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('digital twin') || t.includes('jumeau')) return Building2;
  if (t.includes('rag') || t.includes('ai ') || t.includes('assistant ia') || t.includes('ia /')) return Brain;
  if (t.includes('key one') || t.includes('real-estate') || t.includes('immobil')) return Boxes;
  if (t.includes('optipark') || t.includes('parking')) return ParkingSquare;
  if (t.includes('body tracking')) return ScanEye;
  if (t.includes('blockchain') || t.includes('certificate') || t.includes('certificat')) return ShieldCheck;
  if (t.includes('benchmark')) return Gauge;
  return Code2;
};

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  useEffect(() => {
    if (inView && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.case-study', {
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

  const featured = t('projects.featured', { returnObjects: true }) as FeaturedProject[];
  const alsoBuilt = t('projects.alsoBuilt', { returnObjects: true }) as AlsoBuilt[];
  const labels = t('projects.labels', { returnObjects: true }) as Record<string, string>;

  return (
    <section
      id="projects"
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
            {t('projects.title')}
          </h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-4">
            {t('projects.subtitle')}
          </p>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Featured Case Studies */}
        <div className="space-y-10 md:space-y-14">
          {featured.map((project, index) => {
            const Icon = getProjectIcon(project.title);
            const reversed = index % 2 === 1;
            return (
              <article
                key={index}
                className="case-study glass-effect rounded-3xl overflow-hidden"
              >
                <div
                  className={`grid lg:grid-cols-5 gap-0 ${
                    reversed ? 'lg:[direction:rtl]' : ''
                  }`}
                >
                  {/* Screenshot slot */}
                  <div className="lg:col-span-2 relative min-h-[220px] lg:min-h-full [direction:ltr]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-dark-800 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_55%)]" />
                        <Icon size={72} className="text-white/85 relative" aria-hidden="true" />
                      </div>
                    )}
                    {project.confidential && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-dark-900/80 backdrop-blur-sm text-amber-300 border border-amber-400/30 rounded-full text-xs font-semibold">
                        <Lock size={12} />
                        {labels.confidential}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 p-6 md:p-8 [direction:ltr]">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-gradient">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-primary-400 text-sm font-medium mb-5">
                      {project.tagline}
                    </p>

                    {/* Tag chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-600/15 text-primary-300 border border-primary-500/20 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Structured case study */}
                    <dl className="space-y-3 mb-6">
                      {[
                        { label: labels.context, value: project.context },
                        { label: labels.problem, value: project.problem },
                        { label: labels.built, value: project.built },
                        { label: labels.demonstrates, value: project.demonstrates },
                      ].map((row) => (
                        <div key={row.label} className="grid sm:grid-cols-[140px,1fr] gap-1 sm:gap-3">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-dark-400 pt-0.5">
                            {row.label}
                          </dt>
                          <dd className="text-sm text-dark-200 leading-relaxed">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    {/* Stack */}
                    <div className="mb-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-dark-400">
                        {labels.stack}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-dark-700/70 text-dark-200 rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-2 h-2 rounded-full bg-primary-400" />
                      <span className="text-xs text-dark-300">
                        <span className="font-semibold text-dark-200">{labels.status}:</span>{' '}
                        {project.status}
                      </span>
                    </div>

                    {/* Links */}
                    {(project.github || project.demo) && (
                      <div className="flex flex-wrap gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            <Github size={16} />
                            {t('projects.viewCode')}
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 glass-effect hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            <ExternalLink size={16} />
                            {t('projects.viewProject')}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Also Built strip */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              {labels.alsoBuilt}
            </h3>
            <p className="text-sm text-dark-400">{labels.alsoBuiltSubtitle}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {alsoBuilt.map((item, index) => {
              const className =
                'group inline-flex items-center gap-2 px-4 py-2.5 glass-effect rounded-xl text-sm text-dark-200 transition-colors';
              return item.github ? (
                <a
                  key={index}
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${className} hover:bg-white/10 hover:text-white`}
                >
                  <Github size={15} className="text-primary-400" />
                  {item.title}
                  <ArrowUpRight
                    size={14}
                    className="text-dark-500 group-hover:text-primary-400 transition-colors"
                  />
                </a>
              ) : (
                <span key={index} className={`${className} cursor-default`}>
                  <Code2 size={15} className="text-primary-400" />
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
