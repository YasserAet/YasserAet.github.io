import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, Building2, Eye, ParkingSquare, Hotel, ClipboardList, Code2 } from 'lucide-react';
import gsap from 'gsap';

interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  demo?: string;
  year?: string;
  featured?: boolean;
}

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Function to get icon based on project title
  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('key one') || title.toLowerCase().includes('real estate')) {
      return <Building2 size={64} className="text-white/80" />;
    }
    if (title.toLowerCase().includes('body tracking') || title.toLowerCase().includes('webgl')) {
      return <Eye size={64} className="text-white/80" />;
    }
    if (title.toLowerCase().includes('optipark') || title.toLowerCase().includes('parking')) {
      return <ParkingSquare size={64} className="text-white/80" />;
    }
    if (title.toLowerCase().includes('hotel') || title.toLowerCase().includes('hms')) {
      return <Hotel size={64} className="text-white/80" />;
    }
    if (title.toLowerCase().includes('gestion') || title.toLowerCase().includes('room')) {
      return <ClipboardList size={64} className="text-white/80" />;
    }
    return <Code2 size={64} className="text-white/80" />;
  };

  useEffect(() => {
    if (inView && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.project-card', {
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

  const projects = t('projects.items', { returnObjects: true }) as Project[];

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
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className={`project-card glass-effect rounded-2xl overflow-hidden cursor-pointer group ${
                project.featured ? 'ring-2 ring-primary-500/50' : ''
              }`}
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
                {project.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-3 py-1 bg-yellow-500 text-dark-900 rounded-full text-xs font-bold shadow-lg">
                      ⭐ Featured
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getProjectIcon(project.title)}
                  </motion.div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gradient flex-1">{project.title}</h3>
                  {project.year && (
                    <span className="text-primary-400 text-sm font-semibold ml-2">{project.year}</span>
                  )}
                </div>
                <p className="text-dark-200 mb-4 line-clamp-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-dark-700 text-dark-300 rounded-full text-xs font-medium">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={16} />
                    {t('projects.viewCode')}
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center p-2 glass-effect hover:bg-white/10 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-gradient">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-dark-300 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-dark-200 text-lg mb-6">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-dark-200">
                      <span className="text-primary-400 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary-600/20 text-primary-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors font-medium"
                >
                  <Github size={20} />
                  {t('projects.viewCode')}
                </a>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 glass-effect hover:bg-white/10 text-white rounded-lg transition-colors font-medium"
                  >
                    <ExternalLink size={20} />
                    {t('projects.viewProject')}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
