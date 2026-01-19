
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 dark:bg-slate-950 text-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <ScrollReveal className="lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 border-4 border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1574689232449-3e674b37035a?auto=format&fit=crop&q=80&w=800" 
                alt="Équipement de forage professionnel" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-cyan-500 text-slate-900 p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-4 border-slate-900">
              <span className="text-5xl font-black block mb-2">20+</span>
              <span className="text-lg font-bold leading-tight">Années d'Expérience<br/>sur le terrain</span>
            </div>
          </ScrollReveal>

          <div className="lg:w-1/2">
            <ScrollReveal>
              <h2 className="text-cyan-400 font-bold tracking-widest uppercase mb-4">Qui Sommes-Nous ?</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Le Partenaire de Vos <span className="text-cyan-400">Succès Hydrauliques</span>
              </h3>
              
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Basée sur une expertise rigoureuse et un engagement total pour l'accès à l'eau, 
                <strong> ETS Docteur des Profondeurs</strong> s'est imposé comme un leader du forage mécanique et industriel au Togo.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  "Études de sol géophysiques précises",
                  "Équipements de forage de dernière génération",
                  "Intervention rapide sur tout type de terrain",
                  "Engagement écologique et durable",
                  "Service après-vente et maintenance réactive"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-lg font-medium text-slate-200">{item}</p>
                  </div>
                ))}
              </div>

              <a href="#contact" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-600 hover:text-white transition-all transform hover:-translate-y-1">
                Demander une étude de terrain
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
