import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import gsap from 'gsap';

const Contact = () => {
  const { t } = useTranslation();
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
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: t('contact.info.email') },
    { icon: Phone, label: 'Phone', value: t('contact.info.phone') },
    { icon: MapPin, label: 'Location', value: t('contact.info.location') },
  ];

  const socialData = t('contact.social', { returnObjects: true }) as {
    github: string;
    linkedin: string;
    instagram: string;
  };

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

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-element space-y-8">
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const isEmail = info.label === 'Email';
                  const content = (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center">
                        <info.icon className="text-primary-400" size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-dark-300 mb-1">{info.label}</div>
                        <div className={`text-white font-medium ${isEmail ? 'hover:text-primary-400 transition-colors cursor-pointer' : ''}`}>
                          {info.value}
                        </div>
                      </div>
                    </motion.div>
                  );

                  return isEmail ? (
                    <a key={index} href="mailto:yasseraitali@outlook.fr">
                      {content}
                    </a>
                  ) : (
                    content
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-dark-700">
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-primary-600/20 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors group"
                    >
                      <social.icon
                        className="text-primary-400 group-hover:text-white"
                        size={20}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-element">
            <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>

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
                    placeholder=""
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
                    placeholder=""
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
                    placeholder=""
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

                {/* Status Messages */}
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
