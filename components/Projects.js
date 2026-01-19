import React, { useState } from 'react';
import { PROJECTS } from '../constants.js';
import ScrollReveal from './ScrollReveal.js';

const Projects = () => {
  return (
    <section id="projets" className="py-24 bg-slate-50 dark:bg-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">Nos Réalisations</h2>
          <h3 className="text-3xl font-black">Projets Marquants</h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="relative group rounded-3xl overflow-hidden shadow-xl aspect-video">
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-white">
                 <h4 className="font-bold text-xl mb-2">{project.title}</h4>
                 <p className="text-sm text-center">{project.description}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;