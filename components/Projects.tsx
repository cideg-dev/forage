
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import ScrollReveal from './ScrollReveal';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const totalSlides = Math.ceil(PROJECTS.length / itemsPerView);
  const maxIndex = PROJECTS.length - itemsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="projets" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      {/* Ocean waves decorative background */}
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
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 z-20">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hover:bg-cyan-600 hover:text-white transition-all text-slate-900 dark:text-white"
              aria-label="Projet précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 z-20">
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hover:bg-cyan-600 hover:text-white transition-all text-slate-900 dark:text-white"
              aria-label="Projet suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Viewport */}
          <div className="overflow-hidden py-4">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {PROJECTS.map((project) => (
                <div 
                  key={project.id} 
                  className="flex-shrink-0"
                  style={{ width: `calc((100% - ${(itemsPerView - 1) * 24}px) / ${itemsPerView})` }}
                >
                  <div className="group relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-slate-200 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
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
                        {project.description}
                      </p>
                      <button className="flex items-center gap-2 text-cyan-400 font-bold group/btn">
                        Voir détails <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
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
    </section>
  );
};

export default Projects;
