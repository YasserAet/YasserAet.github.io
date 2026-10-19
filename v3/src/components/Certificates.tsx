import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Calendar, X, ZoomIn } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  featured?: boolean;
  image?: string;
}

const Certificates = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const certificates = t('certificates.items', { returnObjects: true }) as Certificate[];
  const featuredCertificates = certificates?.filter(cert => cert.featured) || [];
  const regularCertificates = certificates?.filter(cert => !cert.featured) || [];

  // Debug logging
  console.log('Total certificates:', certificates?.length || 0);
  console.log('Featured certificates:', featuredCertificates.length);
  console.log('Regular certificates:', regularCertificates.length);

  // Ensure we have certificates data
  if (!certificates || certificates.length === 0) {
    return (
      <section id="certificates" className="py-20 md:py-32 bg-gradient-to-b from-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-dark-300">
            <p>Loading certificates...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="certificates"
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
            {t('certificates.title')}
          </h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-4">
            {t('certificates.subtitle')}
          </p>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Featured Certificates with Images */}
        {featuredCertificates.length > 0 && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-8 flex items-center gap-2 flex-wrap"
            >
              <Award className="text-primary-400" size={28} />
              <span>{t('certificates.featured')}</span>
            </motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {featuredCertificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="certificate-card glass-effect rounded-2xl overflow-hidden group border-2 border-primary-500/30 hover:border-primary-500 transition-all w-full"
                >
                  {/* Diploma Image - Clickable */}
                  {cert.image && (
                    <div 
                      className="relative h-80 md:h-96 overflow-hidden bg-dark-900 cursor-pointer"
                      onClick={() => setSelectedImage({ src: cert.image!, title: cert.title })}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Featured Badge - Yellow */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-3 py-1 bg-yellow-500 text-dark-900 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Featured
                        </span>
                      </div>
                      
                      {/* Zoom Icon */}
                      <div className="absolute top-4 left-4">
                        <ZoomIn
                          className="text-white/70 group-hover:text-primary-400 transition-colors"
                          size={24}
                        />
                      </div>
                      {cert.link && cert.link.trim() && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 p-2 bg-primary-600 hover:bg-primary-500 rounded-full transition-colors z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="text-white" size={18} />
                        </a>
                      )}
                    </div>
                  )}
                    
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {cert.title}
                    </h3>
                    
                    <p className="text-primary-400 text-base mb-3 font-semibold">
                      {cert.issuer}
                    </p>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-dark-300 text-sm">
                        <Calendar size={16} />
                        <span>{cert.date}</span>
                      </div>
                      {cert.credentialId && (
                        <div className="text-xs text-dark-400">
                          ID: <span className="text-dark-300 font-mono break-all">{cert.credentialId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Certificates Grid */}
        {regularCertificates.length > 0 && (
          <>
            {featuredCertificates.length > 0 && (
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-white mb-8"
              >
                {t('certificates.all')}
              </motion.h3>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularCertificates.map((cert, index) => {
                const RegularComponent = (cert.link && cert.link.trim()) ? motion.a : motion.div;
                const regularLinkProps = (cert.link && cert.link.trim()) ? {
                  href: cert.link,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {};
                
                return (
                  <RegularComponent
                    key={index}
                    {...regularLinkProps}
                    whileHover={{ y: -5 }}
                    className={`certificate-card glass-effect rounded-2xl p-6 group hover:border-primary-500/50 border border-transparent transition-all ${cert.link ? 'cursor-pointer' : ''}`}
                  >
                    {/* Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                        <Award className="text-primary-400 group-hover:text-white transition-colors" size={24} />
                      </div>
                      {cert.link && cert.link.trim() && (
                        <ExternalLink
                          className="text-dark-400 group-hover:text-primary-400 transition-colors"
                          size={20}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {cert.title}
                    </h3>
                    
                    <p className="text-dark-300 text-sm mb-3 font-medium">
                      {cert.issuer}
                    </p>

                    <div className="flex items-center gap-2 text-dark-400 text-sm">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>

                    {cert.credentialId && (
                      <div className="mt-3 pt-3 border-t border-dark-700">
                        <p className="text-xs text-dark-400">
                          <span className="text-dark-300">ID:</span> {cert.credentialId}
                        </p>
                      </div>
                    )}
                  </RegularComponent>
                );
              })}
            </div>
          </>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.linkedin.com/in/aitali-yassir/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600/20 hover:bg-primary-600 text-primary-400 hover:text-white rounded-full font-medium transition-all group"
          >
            {t('certificates.viewAll')}
            <ExternalLink className="group-hover:translate-x-1 transition-transform" size={18} />
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-dark-800/80 hover:bg-dark-700 text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl max-h-[90vh] w-full cursor-default"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
