
import React from 'react';
import { TESTIMONIALS } from '../constants';
import ScrollReveal from './ScrollReveal';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Témoignages</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            La Parole à nos Clients
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal key={t.id} delay={idx * 200}>
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 relative group hover:-translate-y-2 transition-transform duration-300">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-cyan-600/10 group-hover:text-cyan-600/20 transition-colors" />
                <p className="text-slate-600 dark:text-slate-300 italic mb-8 relative z-10 leading-relaxed">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
