
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import AnimatedCounter from './components/AnimatedCounter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        
        {/* Stats Banner with Ocean styling */}
        <section className="bg-cyan-700 py-16 relative overflow-hidden" aria-label="Nos statistiques">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-12 relative z-10">
            {[
              { label: "Forages Réussis", val: "500+" },
              { label: "Régions Couvertes", val: "15+" },
              { label: "Alimentées", val: "10k+" },
              { label: "Satisfaction", val: "100%" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100} className="text-center text-white">
                <AnimatedCounter value={stat.val} className="text-4xl md:text-6xl font-black mb-2" />
                <div className="text-xs md:text-sm uppercase font-bold opacity-90 tracking-widest">{stat.label}</div>
              </ScrollReveal>
            ))}
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 translate-y-1/2 -translate-x-1/2 rounded-full blur-2xl" aria-hidden="true"></div>
        </section>

        <Services />
        <About />
        <Gallery />
        <Projects />
        <Testimonials />
        <Partners />
        
        {/* Call to action section with aquatic touch */}
        <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-900 dark:to-blue-900">
           <ScrollReveal className="max-w-7xl mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
               Besoin d'eau ? Prêt à forer ?
             </h2>
             <p className="text-xl text-cyan-50 mb-10 max-w-2xl mx-auto font-medium opacity-90">
               Nos équipes sont mobilisables immédiatement pour étudier votre terrain et proposer la solution la plus adaptée à vos besoins.
             </p>
             <a href="#contact" className="bg-white text-cyan-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all shadow-2xl inline-block focus:ring-4 focus:ring-cyan-200 outline-none transform hover:-translate-y-1">
               Demander un devis gratuit
             </a>
           </ScrollReveal>
        </section>

        <Careers />
        <Contact />
      </main>
      <Footer />
      
      {/* Floating Action Button for mobile calls */}
      <a 
        href="tel:93445076" 
        className="md:hidden fixed bottom-6 right-6 z-50 bg-cyan-600 text-white p-4 rounded-full shadow-2xl animate-bounce outline-none focus:ring-4 focus:ring-cyan-400"
        aria-label="Appeler maintenant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </div>
  );
};

export default App;
