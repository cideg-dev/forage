
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import ScrollReveal from './ScrollReveal';
import { ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxIdx = Math.max(0, PROJECTS.length - itemsPerView);
    if (currentIndex > maxIdx) {
      setCurrentIndex(maxIdx);
    }
  }, [itemsPerView, currentIndex]);

  const maxIndex = Math.max(0, PROJECTS.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const gap = 24;

  return (
    <section id="projets" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative scroll-mt-24">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white dark:from-slate-950 to-transparent z-0 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-widest uppercase mb-4">Nos Réalisations</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Projets Marquants sur le Terrain
          </h3>
          <div className="w-24 h-2 bg-cyan-500 mx-auto rounded-full"></div>
        </ScrollReveal>

        <div className="relative group">
          <div className="absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 z-20 flex w-full justify-between pointer-events-none">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hover:bg-cyan-600 hover:text-white transition-all text-slate-900 dark:text-white pointer-events-auto"
              aria-label="Projet précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hover:bg-cyan-600 hover:text-white transition-all text-slate-900 dark:text-white pointer-events-auto"
              aria-label="Projet suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex > 0 ? currentIndex * (gap / itemsPerView) : 0}px))`,
                gap: `${gap}px`
              }}
            >
              {PROJECTS.map((project) => (
                <div 
                  key={project.id} 
                  className="flex-shrink-0"
                  style={{ width: `calc((100% - ${(itemsPerView - 1) * gap}px) / ${itemsPerView})` }}
                >
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="group relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-slate-200 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent opacity-90"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <h4 className="text-2xl font-bold text-white mb-2">{project.title}</h4>
                      <p className="text-cyan-100 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        Cliquez pour voir les détails
                      </p>
                      <button className="flex items-center gap-2 text-cyan-400 font-bold group/btn">
                        Détails <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: PROJECTS.length - itemsPerView + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === i ? 'bg-cyan-600 w-8' : 'bg-slate-300 dark:bg-slate-700 hover:bg-cyan-400'}`}
                aria-label={`Aller au slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-cyan-600 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 aspect-square md:aspect-auto">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-6">{selectedProject.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                  <br/><br/>
                  Ce projet illustre notre engagement envers la qualité et la durabilité. Nous avons utilisé des technologies de pointe pour garantir un accès pérenne à la ressource en eau.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-cyan-600 font-bold">
                    <div className="w-2 h-2 rounded-full bg-cyan-600"></div>
                    Réalisé en un temps record
                  </div>
                  <div className="flex items-center gap-3 text-cyan-600 font-bold">
                    <div className="w-2 h-2 rounded-full bg-cyan-600"></div>
                    Normes environnementales respectées
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
