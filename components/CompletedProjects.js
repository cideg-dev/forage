import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useStore from '../src/store/useStore';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CompletedProjects = () => {
  const { currentProjectIndex, nextProject, prevProject, COMPLETED_PROJECTS } = useStore();
  const { t } = useTranslation();

  return (
    <section id="projets" className="py-24 bg-slate-950 text-white scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-red-600 font-black uppercase tracking-widest text-sm mb-4 italic">{t("successStories")}</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">{t("referenceProjects")} de <span className="text-cyan-400">{t("referenceProjects")}</span></h3>
          </div>
          <div className="flex gap-4">
            <button onClick={prevProject} className="p-4 rounded-full border border-white/10 hover:bg-red-600 transition-all"><ChevronLeft /></button>
            <button onClick={nextProject} className="p-4 rounded-full border border-white/10 hover:bg-red-600 transition-all"><ChevronRight /></button>
          </div>
        </ScrollReveal>

        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
          {COMPLETED_PROJECTS.map((p, i) => (
            <div key={p.id} className={`absolute inset-0 transition-all duration-1000 ease-out ${i === currentProjectIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
              <LazyLoadImage
                src={p.image}
                className="w-full h-full object-cover"
                alt={p.title}
                effect="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-8 md:p-16">
                <div className="grid md:grid-cols-2 w-full items-end gap-8">
                  <div>
                    <span className="inline-block bg-red-600 px-4 py-1 rounded-full text-xs font-black uppercase mb-4 tracking-widest">{p.location}</span>
                    <h4 className="text-3xl md:text-5xl font-black mb-2 italic">{p.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-4 md:justify-end">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[140px]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{t("depth")}</span>
                      <span className="text-2xl font-black text-cyan-400">{p.depth}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[140px]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{t("flowRate")}</span>
                      <span className="text-2xl font-black text-cyan-400">{p.flow}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;