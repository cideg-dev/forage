// components/CookieConsent.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Enregistrer le consentement positif
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    // Enregistrer le consentement négatif
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-4 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 max-w-3xl">
          <p className="text-sm">
            {t('cookieNotice') || 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En poursuivant votre navigation, vous acceptez notre utilisation des cookies.'}
          </p>
          <a 
            href="/privacy-policy" 
            className="text-cyan-400 hover:text-cyan-300 text-sm underline mt-1 inline-block"
          >
            {t('learnMore') || 'En savoir plus'}
          </a>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm"
          >
            {t('decline') || 'Refuser'}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm"
          >
            {t('accept') || 'Accepter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;