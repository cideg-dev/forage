import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { FULL_NAME, SLOGAN, CONTACT_PHONES } from '../constants.js';

const Hero = () => {
  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      <picture className="absolute inset-0 z-0">
        <source 
          media="(max-width: 768px)" 
          srcSet="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800" 
        />
        <img 
          src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1920" 
          alt="Force et expertise en forage hydraulique" 
          className="w-full h-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/50 to-slate-950 z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-full mb-6 text-xs font-bold uppercase">
            Expert en Forages Hydrauliques
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            La <span className="text-cyan-400">Force</span> de l'Eau
          </h1>
          <p className="text-lg md:text-xl font-bold italic text-cyan-200 mb-4">{FULL_NAME}</p>
          <p className="text-slate-300 mb-10 text-lg leading-relaxed">{SLOGAN}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#services" className="bg-cyan-600 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              Nos Services <ArrowRight />
            </a>
            <a href={`tel:${CONTACT_PHONES[0].replace(/\s/g, '')}`} className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Phone /> {CONTACT_PHONES[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;