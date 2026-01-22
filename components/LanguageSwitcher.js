import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    
    // Mettre à jour la direction du texte selon la langue
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'fr' 
            ? 'bg-cyan-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        FR
      </button>
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'en' 
            ? 'bg-cyan-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;