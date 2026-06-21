import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Send, Linkedin, Github, Download } from 'lucide-react';
import gsap from 'gsap';

// Set VITE_FORMSPREE_ENDPOINT in a .env file to enable the contact form.
// Example: VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

const Contact = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (inView && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.contact-element', {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const email = t('contact.info.email');
  const socialData = t('contact.social', { returnObjects: true }) as {
    github: string;
    linkedin: string;
    instagram: string;
  };

  const cvHref =
    i18n.language === 'fr' ? '/CV_Yassir_Aitali_FR.pdf' : '/CV_Yassir_Aitali_EN.pdf';

  const contactInfo = [
    { icon: Mail, label: 'Email', value: email, isEmail: true },
    { icon: MapPin, label: '', value: t('contact.info.location'), isEmail: false },
  ];

  const socialLinks = [
    { icon: Github, href: socialData.github, label: 'GitHub' },
    { icon: Linkedin, href: socialData.linkedin, label: 'LinkedIn' },
  ];

  return (
    <section
      id="contact"
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
            {t('contact.title')}
          </h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-4">
            {t('contact.subtitle')}
          </p>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Primary action buttons */}
        <div className="contact-element flex flex-wrap justify-center gap-3 mb-12">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-semibold transition-colors"
          >
            <Mail size={18} /> Email
          </a>
          <a
            href={socialData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect hover:bg-white/10 text-white rounded-full font-semibold transition-colors"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href={socialData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect hover:bg-white/10 text-white rounded-full font-semibold transition-colors"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href={cvHref}
            download
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect hover:bg-white/10 text-white rounded-full font-semibold transition-colors"
          >
            <Download size={18} /> {t('contact.downloadCV')}
          </a>
        </div>

        {/* Contact Grid */}
        <div className={`grid gap-12 ${FORMSPREE_ENDPOINT ? 'lg:grid-cols-2' : 'max-w-xl mx-auto'}`}>
          {/* Contact Info */}
          <div className="contact-element space-y-8">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">{t('contact.infoTitle')}</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const isEmail = info.isEmail;
                  const content = (
                    <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center">
                        <info.icon className="text-primary-400" size={20} />
                      </div>
                      <div>
                        {info.label && <div className="text-sm text-dark-300 mb-1">{info.label}</div>}
                        <div
                          className={`text-white font-medium ${
                            isEmail ? 'hover:text-primary-400 transition-colors' : ''
                          }`}
                        >
                          {info.value}
                        </div>
                      </div>
                    </motion.div>
                  );

                  return isEmail ? (
                    <a key={index} href={`mailto:${email}`}>
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-dark-700">
                <h4 className="text-lg font-semibold text-white mb-4">{t('contact.connectTitle')}</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-primary-600/20 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors group"
                    >
                      <social.icon className="text-primary-400 group-hover:text-white" size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form — only rendered when a Formspree endpoint is configured */}
          {FORMSPREE_ENDPOINT && (
            <div className="contact-element">
              <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{t('contact.formTitle')}</h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-200 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-500 disabled:bg-dark-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-primary-500/50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        {t('contact.form.send')}
                      </>
                    )}
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-400 text-center"
                    >
                      {t('contact.form.success')}
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-center"
                    >
                      {t('contact.form.error')}
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
