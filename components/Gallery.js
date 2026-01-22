import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-400 font-bold uppercase mb-4">Galerie</h2>
          <h3 className="text-3xl font-black">Nos Opérations</h3>
        </ScrollReveal>
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <LazyLoadImage
            src={GALLERY_IMAGES[activeIndex].url}
            className="w-full h-full object-cover"
            effect="blur"
            alt={GALLERY_IMAGES[activeIndex].caption}
          />
          <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black w-full">
            <p className="font-bold">{GALLERY_IMAGES[activeIndex].caption}</p>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
           {GALLERY_IMAGES.map((_, i) => (
             <button key={i} onClick={() => setActiveIndex(i)} className={`h-2 rounded-full ${i === activeIndex ? 'w-12 bg-cyan-500' : 'w-4 bg-slate-800'}`}></button>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;