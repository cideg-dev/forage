
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

  // Listen for hash changes to pre-fill the subject
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('subject=devis')) {
        setFormData(prev => ({ ...prev, subject: 'Demande de devis forage' }));
      } else if (hash.includes('subject=maintenance')) {
        setFormData(prev => ({ ...prev, subject: 'Maintenance & Réparation' }));
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est obligatoire';
    if (!formData.contact.trim()) {
      newErrors.contact = 'Email ou téléphone obligatoire';
    } else if (formData.contact.includes('@') && !/\S+@\S+\.\S+/.test(formData.contact)) {
      newErrors.contact = 'Format d\'email invalide';
    }
    if (!formData.message.trim()) newErrors.message = 'Le message est obligatoire';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', contact: '', subject: 'Demande de devis forage', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error on change
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 scroll-mt-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Contactez-nous</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Une Question ? Un Projet ?</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: <Phone />, title: "Téléphones", content: CONTACT_PHONES, color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" },
              { icon: <MapPin />, title: "Siège Social", content: ["Zone Industrielle, Rue du Forage", "Lomé, Togo"], color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" },
              { icon: <Clock />, title: "Heures d'Ouverture", content: ["Lun - Ven: 08:00 - 18:00", "Samedi: 08:00 - 13:00"], color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" }
            ].map((info, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-6 group hover:shadow-xl transition-all h-full">
                  <div className={`${info.color} p-4 rounded-2xl transition-colors`} aria-hidden="true">
                    {React.cloneElement(info.icon as React.ReactElement, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3 dark:text-white">{info.title}</h4>
                    {info.content.map((line, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400 font-medium mb-1">
                        {info.title === "Téléphones" ? (
                          <a href={`tel:${line.replace(/\s/g, '')}`} className="hover:text-cyan-600 transition-colors">{line}</a>
                        ) : line}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="lg:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="bg-cyan-100 dark:bg-cyan-900/30 p-6 rounded-full mb-6 text-cyan-600 animate-bounce">
                  <CheckCircle className="w-16 h-16" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Message Envoyé !</h4>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Merci, nous vous recontacterons sous 24h.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-cyan-600 font-bold hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            )}

            <h4 id="contact-form-title" className="text-2xl font-bold mb-8 dark:text-white">Envoyez-nous un message</h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-labelledby="contact-form-title" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Nom Complet</label>
                <input 
                  id="name" 
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Jean Dupont" 
                  className={`w-full bg-slate-50 dark:bg-slate-900 border-2 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none dark:text-white placeholder:text-slate-400 ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent'}`} 
                />
                {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email / Téléphone</label>
                <input 
                  id="contact" 
                  type="text" 
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Ex: email@example.com" 
                  className={`w-full bg-slate-50 dark:bg-slate-900 border-2 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none dark:text-white placeholder:text-slate-400 ${errors.contact ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent'}`} 
                />
                {errors.contact && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.contact}</p>}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300">Sujet</label>
                <select 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none appearance-none dark:text-white cursor-pointer"
                >
                  <option value="Demande de devis forage">Demande de devis forage</option>
                  <option value="Maintenance & Réparation">Maintenance & Réparation</option>
                  <option value="Conseil technique">Conseil technique</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Votre Message</label>
                <textarea 
                  id="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Décrivez votre projet (profondeur, localisation, type de terrain...)" 
                  className={`w-full bg-slate-50 dark:bg-slate-900 border-2 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none resize-none dark:text-white placeholder:text-slate-400 ${errors.message ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-transparent'}`}
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="md:col-span-2 w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-200 flex items-center justify-center gap-2 focus:ring-4 focus:ring-cyan-300 outline-none disabled:opacity-70 disabled:cursor-not-wait"
              >
                {isSubmitting ? 'Envoi en cours...' : (
                  <>Envoyer le message <Send className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
