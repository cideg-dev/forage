import React from 'react';
import { TESTIMONIALS } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';

const Testimonials = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">Témoignages</h2>
          <h3 className="text-3xl font-black">La Parole à nos Clients</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl shadow-lg border dark:border-slate-800">
               <p className="italic text-slate-600 mb-6">"{t.content}"</p>
               <h4 className="font-bold">{t.name}</h4>
               <p className="text-cyan-600 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;