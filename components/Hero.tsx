
import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { FULL_NAME, SLOGAN, CONTACT_PHONES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Background Image */}
      <picture className="absolute inset-0 z-0">
        <source 
          media="(max-width: 768px)" 
          srcSet="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800" 
        />
        <img 
          src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1920" 
          alt="Force et expertise en forage hydraulique" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/50 to-slate-950 z-[1]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-full mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true"></span>
            <span className="text-cyan-300 font-bold text-xs uppercase tracking-wider">Expert en Forages Hydrauliques</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            La <span className="text-cyan-400">Force</span> de l'Eau
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-200 mb-4 font-semibold italic text-cyan-200">
            {FULL_NAME}
          </p>
          
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Spécialiste du forage industriel et domestique. Nous transformons les profondeurs en sources de vie pour vos projets et vos communautés. <br/>
            <span className="font-bold text-white mt-4 block underline decoration-cyan-500">{SLOGAN}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#services" className="flex items-center justify-center gap-2 bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-700 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/20 group outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/50">
              Nos Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`tel:${CONTACT_PHONES[0].replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all transform hover:-translate-y-1 shadow-xl outline-none focus-visible:bg-white focus-visible:text-slate-900">
              <Phone className="w-5 h-5" /> {CONTACT_PHONES[0]}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-8 text-slate-400 border-t border-white/10 pt-8">
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl">500+</span>
              <span className="text-sm">Forages Réalisés</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl">20 ans</span>
              <span className="text-sm">D'Expérience</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl">Lomé</span>
              <span className="text-sm">Siège Social</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
