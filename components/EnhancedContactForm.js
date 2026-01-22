// components/EnhancedContactForm.js
import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ArrowRight, Send } from 'lucide-react';
import useStore from '../src/store/useStore';
import { useTranslation } from 'react-i18next';
import { validateForm, sanitizeFormData } from '../src/utils/validation';
import { submitContactForm } from '../src/services/contactService';
import Captcha from './Captcha';
import FormValidator from './FormValidator';

const EnhancedContactForm = ({ handleCTA }) => {
  const { formData, updateFormData, resetFormData } = useStore();
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const field = id.split('-')[1]; // Pour correspondre aux champs nommés comme form-name, form-contact, etc.
    updateFormData(field, value);
    
    // Effacer l'erreur associée à ce champ quand l'utilisateur tape
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
    if (value && errors.captcha) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.captcha;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Utiliser le FormValidator pour valider les données du formulaire
    const validation = validateForm(formData);
    
    // Vérifier le CAPTCHA
    if (!captchaVerified) {
      setErrors(prev => ({
        ...prev,
        captcha: t('captchaRequired') || 'Veuillez vérifier que vous êtes un humain.'
      }));
      return;
    }
    
    if (!validation.isValid) {
      setErrors(prev => ({
        ...validation.errors,
        ...prev
      }));
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Nettoyer les données avant envoi
      const sanitizedData = sanitizeFormData(formData);
      
      // Ajouter des vérifications supplémentaires avant l'envoi
      if (!sanitizedData.name || !sanitizedData.contact || !sanitizedData.message) {
        throw new Error('Données de formulaire incomplètes');
      }
      
      // Envoyer les données au backend
      const result = await submitContactForm(sanitizedData);
      
      if (result.success) {
        setSubmitSuccess(true);
        resetFormData(); // Réinitialiser le formulaire après soumission réussie
        setCaptchaVerified(false); // Réinitialiser le CAPTCHA
        
        // Réinitialiser l'état de succès après quelques secondes
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(result.error || 'Une erreur est survenue lors de l\'envoi du formulaire');
      }
    } catch (error) {
      setSubmitError(error.message || 'Une erreur est survenue lors de l\'envoi du formulaire');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 scroll-mt-20" role="region" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <h2 id="contact-heading" className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 italic leading-none">{t("contactOnline")}<br/><span className="text-red-600">Line :</span></h2>
            <div className="space-y-6 mb-16">
              {useStore.getState().CONTACT_PHONES.map(p => (
                <a 
                  key={p} 
                  href={`tel:${p.replace(/\s/g, '')}`} 
                  className="block text-4xl md:text-7xl font-black hover:text-red-600 transition-all tracking-tighter dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  aria-label={`${t("callUs")} ${p}`}
                >
                  {p}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center animate-bounce" aria-hidden="true">
                <ArrowRight className="rotate-90" />
              </div>
              <p className="text-2xl font-black uppercase tracking-widest dark:text-slate-400">{useStore.getState().SLOGAN}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="bg-slate-950 text-white p-12 rounded-[4rem] shadow-2xl border border-white/10">
            <h3 className="text-4xl font-black mb-10 uppercase tracking-tighter italic">{t("startExpertise")}<br/><span className="text-cyan-400">l'expertise</span></h3>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-600 text-white rounded-lg">
                {t("formSubmissionSuccess") || "Votre demande a été envoyée avec succès ! Notre équipe vous contactera bientôt."}
              </div>
            )}
            
            {submitError && (
              <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
                {submitError}
              </div>
            )}
            
            <FormValidator formData={formData} formType="contact">
              {({ isValid, errors: validatorErrors }) => (
                <form className="space-y-8" onSubmit={handleSubmit} aria-label={t("startExpertise")}>
                  <div className="space-y-2">
                    <label htmlFor="form-name" className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      {t("yourName")}
                    </label>
                    <input
                      id="form-name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-6 bg-white/5 border-b-2 outline-none font-bold text-xl focus:border-cyan-400 transition-all rounded-t-2xl focus:ring-2 focus:ring-cyan-500 ${
                        errors.name ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder={t("completeName")} 
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="form-contact" className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      {t("phoneOrWhatsApp")}
                    </label>
                    <input
                      id="form-contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className={`w-full p-6 bg-white/5 border-b-2 outline-none font-bold text-xl focus:border-cyan-400 transition-all rounded-t-2xl focus:ring-2 focus:ring-cyan-500 ${
                        errors.contact ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder={t("contactNumber")} 
                      aria-required="true"
                      aria-invalid={!!errors.contact}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                    />
                    {errors.contact && (
                      <p id="contact-error" className="text-red-500 text-sm mt-1">
                        {errors.contact}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      {t("yourNeed")}
                    </label>
                    <textarea
                      id="form-message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full p-6 bg-white/5 border-b-2 outline-none font-bold text-xl focus:border-cyan-400 transition-all rounded-t-2xl h-32 focus:ring-2 focus:ring-cyan-500 ${
                        errors.message ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder={t("projectTypeAndLocation")} 
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      rows="4"
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <Captcha 
                    onChange={handleCaptchaChange}
                    onError={() => setErrors(prev => ({ ...prev, captcha: t('captchaError') || 'Erreur lors de la vérification CAPTCHA' }))}
                    onExpired={() => {
                      setCaptchaVerified(false);
                      setErrors(prev => ({ ...prev, captcha: t('captchaExpired') || 'Le CAPTCHA a expiré, veuillez réessayer' }));
                    }}
                  />
                  {errors.captcha && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.captcha}
                    </p>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !captchaVerified}
                    className={`w-full bg-red-600 text-white font-black py-6 rounded-[2rem] uppercase tracking-widest text-lg hover:bg-white hover:text-red-600 transition-all shadow-xl flex items-center justify-center gap-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                      isSubmitting || !captchaVerified ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    aria-label={isSubmitting ? t("sending") || "Envoi en cours..." : t("send")}
                  >
                    {isSubmitting ? (
                      <>
                        {t("sending") || "Envoi..."} <Send size={24} className="animate-spin" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        {t("send")} <Send size={24} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </FormValidator>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContactForm;