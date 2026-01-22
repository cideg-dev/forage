// components/Captcha.js
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

const Captcha = ({ onChange, onError, onExpired, onLoaded }) => {
  const { t } = useTranslation();
  const captchaRef = useRef(null);

  // La clé du site pour reCAPTCHA v2
  // En production, cette clé devrait être configurée dans les variables d'environnement
  const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Clé de test fournie par Google

  const handleCaptchaChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleError = () => {
    if (onError) {
      onError();
    }
  };

  const handleExpired = () => {
    if (onExpired) {
      onExpired();
    }
  };

  const handleLoaded = () => {
    if (onLoaded) {
      onLoaded();
    }
  };

  return (
    <div className="my-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {t('captchaVerification') || 'Vérification CAPTCHA'}
      </label>
      <div className="flex justify-center">
        <ReCAPTCHA
          ref={captchaRef}
          sitekey={siteKey}
          onChange={handleCaptchaChange}
          onErrored={handleError}
          onExpired={handleExpired}
          onLoad={handleLoaded}
          hl="fr" // Langue française
        />
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {t('captchaInstruction') || 'Veuillez vérifier que vous êtes un humain.'}
      </p>
    </div>
  );
};

export default Captcha;