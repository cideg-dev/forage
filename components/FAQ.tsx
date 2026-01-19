
import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';
import ScrollReveal from './ScrollReveal';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Questions Fréquentes</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Tout savoir sur nos forages</h3>
          <div className="w-24 h-2 bg-cyan-500 mx-auto rounded-full"></div>
        </ScrollReveal>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => (
            <ScrollReveal key={idx} delay={idx * 100}>
              <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left bg-slate-50 dark:bg-slate-900/50 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors focus:outline-none"
                  aria-expanded={openIndex === idx}
                >
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{faq.question}</span>
                  {openIndex === idx ? <Minus className="text-cyan-600" /> : <Plus className="text-cyan-600" />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="p-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.answer}
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

export default FAQ;
