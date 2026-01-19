
import React from 'react';
import { SERVICES } from '../constants';
import ScrollReveal from './ScrollReveal';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-cyan-50 dark:bg-cyan-900/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Notre Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Des Solutions de Forage sur Mesure
          </h3>
          <div className="w-24 h-2 bg-cyan-500 mx-auto rounded-full"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 100}>
              <div 
                className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-cyan-200 dark:hover:border-cyan-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-cyan-900/5 transition-all group duration-300 h-full"
              >
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm inline-block mb-6 group-hover:scale-110 group-hover:bg-cyan-600 transition-all duration-300">
                  {React.cloneElement(service.icon as React.ReactElement, {
                    className: `w-8 h-8 transition-colors duration-300 group-hover:text-white`
                  })}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-cyan-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
