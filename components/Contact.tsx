
import React from 'react';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import { CONTACT_PHONES } from '../constants';
import ScrollReveal from './ScrollReveal';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Contactez-nous</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Une Question ? Un Projet ?</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: <Phone />, title: "Téléphones", content: CONTACT_PHONES.map(p => `+228 ${p}`), color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" },
              { icon: <MapPin />, title: "Siège Social", content: ["Zone Industrielle, Rue du Forage", "Lomé, Togo"], color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" },
              { icon: <Clock />, title: "Heures d'Ouverture", content: ["Lun - Ven: 08:00 - 18:00", "Samedi: 08:00 - 13:00"], color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600" }
            ].map((info, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-6 group hover:shadow-xl transition-all">
                  <div className={`${info.color} p-4 rounded-2xl transition-colors`} aria-hidden="true">
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

          <ScrollReveal className="lg:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
            <h4 id="contact-form-title" className="text-2xl font-bold mb-8 dark:text-white">Envoyez-nous un message</h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-labelledby="contact-form-title" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Nom Complet</label>
                <input id="name" type="text" placeholder="Ex: Jean Dupont" required className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none dark:text-white placeholder:text-slate-400" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-info" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email / Téléphone</label>
                <input id="contact-info" type="text" placeholder="Ex: email@example.com" required className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none dark:text-white placeholder:text-slate-400" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300">Sujet</label>
                <select id="subject" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none appearance-none dark:text-white">
                  <option>Demande de devis forage</option>
                  <option>Maintenance & Réparation</option>
                  <option>Conseil technique</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Votre Message</label>
                <textarea id="message" rows={4} placeholder="Décrivez votre projet..." required className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 transition-all outline-none resize-none dark:text-white placeholder:text-slate-400"></textarea>
              </div>
              <button type="submit" className="md:col-span-2 w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-200 flex items-center justify-center gap-2 focus:ring-4 focus:ring-cyan-300 outline-none">
                Envoyer le message <Send className="w-5 h-5" />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
