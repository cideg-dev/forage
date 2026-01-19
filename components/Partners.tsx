
import React from 'react';
import { PARTNERS } from '../constants';
import ScrollReveal from './ScrollReveal';

const Partners: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase text-sm mb-8">Ils nous font confiance</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 dark:opacity-40">
          {PARTNERS.map((partner, idx) => (
            <ScrollReveal key={partner.name} delay={idx * 100} className="flex justify-center grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={partner.logo} 
                alt={`Logo de ${partner.name}`} 
                className="max-h-12 w-auto object-contain"
                loading="lazy"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
