
import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import ScrollReveal from './ScrollReveal';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-cyan-900/10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-400 font-bold tracking-widest uppercase mb-4">Galerie Interactive</h2>
          <h3 className="text-3xl md:text-5xl font-black mb-6">Aperçu de nos opérations</h3>
        </ScrollReveal>

        <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={img.url} 
                alt={img.caption} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <p className="text-xl font-bold text-cyan-200">{img.caption}</p>
              </div>
            </div>
          ))}

          <button 
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-cyan-600 transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-cyan-600 transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {GALLERY_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-16 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-cyan-500' : 'bg-slate-800'}`}
              aria-label={`Aller à l'image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
