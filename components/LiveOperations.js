import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LiveOperations = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full mb-4 font-black text-[10px] uppercase tracking-widest">
            <Play size={12} fill="currentColor" /> {t("liveFromField")}
          </div>
          <h2 className="text-4xl md:text-6xl font-black dark:text-white italic uppercase tracking-tighter leading-none">{t("machinesInAction")} en <span className="text-red-600">Action</span></h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, label: t("mechanicalDrilling"), color: "bg-blue-600" },
            { id: 2, label: "Arrivée d'eau (Jaillissement)", color: "bg-cyan-500" },
            { id: 3, label: "Installation de pompe", color: "bg-slate-800" }
          ].map((vid) => (
            <ScrollReveal key={vid.id} className="relative group aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer">
              <div className={`absolute inset-0 ${vid.color} opacity-20`}></div>
              <LazyLoadImage
                src={`https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600&sig=${vid.id}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                alt="Operation"
                effect="blur"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-125 transition-transform group-hover:bg-red-600">
                  <Play className="text-white fill-current" />
                </div>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-black uppercase text-sm italic tracking-widest bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">{vid.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveOperations;