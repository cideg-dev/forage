import React from 'react';
import { CAREER_OPENINGS } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';

const Careers = () => {
  return (
    <section id="careers" className="py-24 bg-slate-50 dark:bg-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">Recrutement</h2>
          <h3 className="text-3xl font-black">Rejoignez l'équipe</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {CAREER_OPENINGS.map(job => (
             <div key={job.id} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700">
               <div className="flex justify-between items-start mb-4">
                 <h4 className="font-bold text-xl">{job.title}</h4>
                 <span className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 text-xs px-3 py-1 rounded-full">{job.type}</span>
               </div>
               <p className="text-slate-600 dark:text-slate-400">{job.description}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;