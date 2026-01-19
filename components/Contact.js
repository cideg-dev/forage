import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { CONTACT_PHONES } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">Contact</h2>
          <h3 className="text-3xl md:text-5xl font-black">Démarrons Votre Projet</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="space-y-6">
             <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm flex items-center gap-4">
                <Phone className="text-cyan-600" /> <div><h4 className="font-bold">Téléphones</h4><p>{CONTACT_PHONES[0]}</p></div>
             </div>
           </div>
           <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl relative">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                  <h4 className="text-2xl font-bold">Demande Envoyée !</h4>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                   <input className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl" placeholder="Votre Nom" required />
                   <textarea className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl" rows="4" placeholder="Votre message" required></textarea>
                   <button className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                     <Send /> Envoyer
                   </button>
                </form>
              )}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;