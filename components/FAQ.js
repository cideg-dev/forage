import React, { useState } from 'react';
import { FAQ_DATA } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">FAQ</h2>
          <h3 className="text-3xl font-black">Questions Fréquentes</h3>
        </ScrollReveal>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="border dark:border-slate-800 rounded-2xl overflow-hidden">
               <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full text-left p-6 font-bold bg-slate-50 dark:bg-slate-900 flex justify-between">
                 {faq.question} <span>{openIndex === i ? '-' : '+'}</span>
               </button>
               {openIndex === i && <div className="p-6 text-slate-600 dark:text-slate-400 border-t dark:border-slate-800">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;