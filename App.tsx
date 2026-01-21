
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
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import AnimatedCounter from './components/AnimatedCounter';

const App: React.FC = () => {
  const whatsappNumber = "22893445076";
  const whatsappMessage = encodeURIComponent("Bonjour, j'aimerais avoir des informations sur vos services de forage.");

  const scrollToContactPrefilled = (subject: string, message: string, focusField: string) => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // Mise à jour de la hash avec les paramètres de pré-remplissage
    window.location.hash = `#contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}&focus=${focusField}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        
        {/* Stats Banner */}
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
        <div id="faq">
          <FAQ />
        </div>
        <Partners />
        
        {/* Call to action section améliorée */}
        <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-900 dark:to-blue-900">
           <ScrollReveal className="max-w-7xl mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
               Besoin d'eau ? Prêt à forer ?
             </h2>
             <p className="text-xl text-cyan-50 mb-10 max-w-2xl mx-auto font-medium opacity-90">
               Nos équipes sont mobilisables immédiatement pour étudier votre terrain et proposer la solution la plus adaptée à vos besoins.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button 
                 onClick={() => scrollToContactPrefilled('devis', "Je souhaite obtenir un devis gratuit pour un nouveau forage. Mon terrain est situé à : ", 'message')}
                 className="bg-white text-cyan-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all shadow-2xl inline-block transform hover:-translate-y-1"
               >
                 Demander un devis gratuit
               </button>
               <button 
                 onClick={() => scrollToContactPrefilled('Expertise Géophysique', "J'ai besoin d'une étude géophysique pour localiser l'eau sur ma parcelle.", 'name')}
                 className="bg-transparent text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all inline-block transform hover:-translate-y-1"
               >
                 Étude de terrain
               </button>
             </div>
           </ScrollReveal>
        </section>

        <Careers />
        <Contact />
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14.08 9.01 9.01 0 0 1 5.3 1.5l3.2-1.1z"/></svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold">WhatsApp</span>
      </a>

      {/* Mobile Call Button */}
      <a 
        href="tel:93445076" 
        className="md:hidden fixed bottom-6 right-6 z-50 bg-cyan-600 text-white p-4 rounded-full shadow-2xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </div>
  );
};

export default App;
