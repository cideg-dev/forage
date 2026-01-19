
import React from 'react';
import { CAREER_OPENINGS } from '../constants';
import ScrollReveal from './ScrollReveal';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const Careers: React.FC = () => {
  return (
    <section id="careers" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Recrutement</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Rejoignez l'aventure</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h4 className="text-2xl font-bold mb-8 dark:text-white">Postes ouverts</h4>
            {CAREER_OPENINGS.map((job) => (
              <ScrollReveal key={job.id}>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">{job.title}</h5>
                    <span className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 text-xs font-bold px-3 py-1 rounded-full">{job.type}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Temps plein</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{job.description}</p>
                  <button className="flex items-center gap-2 text-cyan-600 font-bold group-hover:gap-3 transition-all">
                    Postuler maintenant <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 h-fit">
            <h4 className="text-2xl font-bold mb-8 dark:text-white">Candidature Spontanée</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Aucun poste ne vous correspond ? Envoyez-nous votre CV, nous sommes toujours à la recherche de talents passionnés.
            </p>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" placeholder="votre@email.com" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Votre spécialité</label>
                <input type="text" placeholder="Ex: Géologue, Mécanicien..." className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message (Optionnel)</label>
                <textarea rows={3} placeholder="Dites-nous pourquoi vous rejoindre..." className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white resize-none"></textarea>
              </div>
              <button className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-200">
                Envoyer ma candidature
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
