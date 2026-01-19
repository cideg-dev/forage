import React from 'react';
import { PARTNERS } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';

const Partners = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 text-center opacity-60">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-12">Nos Partenaires</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {PARTNERS.map(p => <img key={p.name} src={p.logo} alt={p.name} className="h-10 grayscale" />)}
        </div>
      </div>
    </section>
  );
};

export default Partners;