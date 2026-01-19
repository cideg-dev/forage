import React from 'react';
import { SERVICES } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Notre Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Des Solutions de Forage sur Mesure</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 100}>
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 h-full">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm inline-block mb-6">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;