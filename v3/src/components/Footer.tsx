import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="text-dark-300 text-sm text-center flex items-center gap-2">
            © {currentYear} Yassir Aitali. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
