
import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { CONTACT_PHONES } from '../constants';
import ScrollReveal from './ScrollReveal';

interface FormState {
  name: string;
  contact: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    contact: '',
    subject: 'Demande de devis forage',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash.includes('contact')) return;

      const queryString = hash.split('?')[1];
      if (queryString) {
        const params = new URLSearchParams(queryString);
        const subjectParam = params.get('subject');
        const messageParam = params.get('message');
        const targetField = params.get('focus');

        setFormData(prev => ({
          ...prev,
          subject: subjectParam === 'devis' ? 'Demande de devis forage' : (subjectParam || prev.subject),
          message: messageParam || prev.message
        }));

        // Focus le champ spécifié après le défilement
        if (targetField) {
          setTimeout(() => {
            const el = document.getElementById(targetField);
            if (el) el.focus();
          }, 800);
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash(); // Appel initial au cas où on arrive directement sur le lien
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Veuillez saisir votre nom complet';
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Email ou téléphone requis';
    } else if (formData.contact.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contact)) newErrors.contact = 'Format email invalide';
    } else if (formData.contact.length < 8) {
      newErrors.contact = 'Numéro de téléphone trop court';
    }

    if (!formData.message.trim()) newErrors.message = 'Le message ne peut pas être vide';
    else if (formData.message.length < 10) newErrors.message = 'Le message est trop court (min. 10 caract.)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', contact: '', subject: 'Demande de devis forage', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 6000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 scroll-mt-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Contactez-nous</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Démarrons Votre Projet</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: <Phone />, title: "Téléphones", content: CONTACT_PHONES },
              { icon: <MapPin />, title: "Siège Social", content: ["Zone Industrielle, Rue du Forage", "Lomé, Togo"] },
              { icon: <Clock />, title: "Disponibilité", content: ["24h/24 pour les urgences", "Bureau: 08h - 18h"] }
            ].map((info, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-6 h-full">
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-2xl text-cyan-600">
                    {React.cloneElement(info.icon as React.ReactElement, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 dark:text-white">{info.title}</h4>
                    {info.content.map((line, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400 font-medium mb-1">{line}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="lg:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                <CheckCircle className="w-20 h-20 text-green-500 mb-6 animate-bounce" />
                <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Merci !</h4>
                <p className="text-slate-600 dark:text-slate-400 text-center max-w-sm px-6">Votre demande a été transmise. Un expert vous recontactera très prochainement.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-cyan-600 font-bold hover:underline">Envoyer un autre message</button>
              </div>
            )}

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Nom Complet</label>
                <input 
                  id="name" 
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont" 
                  className={`w-full bg-slate-50 dark:bg-slate-900 border-2 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white transition-all ${errors.name ? 'border-red-500' : 'border-transparent'}`} 
                />
                {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 font-bold"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email ou Téléphone</label>
                <input 
                  id="contact" 
                  type="text" 
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="00228..." 
                  className={`w-full bg-slate-50 dark:bg-slate-900 border-2 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white transition-all ${errors.contact ? 'border-red-500' : 'border-transparent'}`} 
                />
                {errors.contact && <p className="text-xs text-red-500 flex items-center gap-1 font-bold"><AlertCircle className="w-3 h-3" /> {errors.contact}</p>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300">Type de Demande</label>
                <select 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none appearance-none dark:text-white cursor-pointer"
                >
                  <option value="Demande de devis forage">Demande de devis forage</option>
                  <option value="Maintenance & Réparation">Maintenance & Réparation</option>
                  <option value="Expertise Géophysique">Expertise Géophysique</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Votre Message</label>
                <textarea 
                  id="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Précisez votre zone géographique et vos besoins..." 
                  className={`w-full bg-slate-50 dark:bg-slate-900 border-2 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none resize-none dark:text-white transition-all ${errors.message ? 'border-red-500' : 'border-transparent'}`}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 font-bold"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="md:col-span-2 w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? 'Envoi...' : <><Send className="w-5 h-5" /> Envoyer la Demande</>}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
