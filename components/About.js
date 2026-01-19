import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal.js';

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 dark:bg-slate-950 text-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        <ScrollReveal className="lg:w-1/2">
           <img src="https://images.unsplash.com/photo-1574689232449-3e674b37035a?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-2xl" alt="Forage" />
        </ScrollReveal>
        <div className="lg:w-1/2">
          <ScrollReveal>
            <h2 className="text-cyan-400 font-bold uppercase mb-4">Qui Sommes-Nous ?</h2>
            <h3 className="text-4xl font-black mb-8 leading-tight">Le Partenaire de Vos Succès Hydrauliques</h3>
            <p className="text-slate-400 text-lg mb-8">Experts reconnus au Togo pour l'accès durable à l'eau potable.</p>
            <div className="space-y-4">
              {["Expertise Géophysique", "Matériel de pointe", "SAV Réactif"].map((item, i) => (
                <div key={i} className="flex items-center gap-3"><CheckCircle2 className="text-cyan-400" /> {item}</div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;