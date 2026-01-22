import React, { useEffect } from 'react';
import useStore from './src/store/useStore.js';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import Services from './components/Services.js';
import About from './components/About.js';
import Projects from './components/Projects.js';
import Gallery from './components/Gallery.js';
import Testimonials from './components/Testimonials.js';
import Partners from './components/Partners.js';
import Careers from './components/Careers.js';
import FAQ from './components/FAQ.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import ScrollReveal from './components/ScrollReveal.js';
import AnimatedCounter from './components/AnimatedCounter.js';
import CompletedProjects from './components/CompletedProjects.js';
import LiveOperations from './components/LiveOperations.js';
import ServiceAreaMap from './components/ServiceAreaMap.js';
import { useTranslation } from 'react-i18next';
import './src/i18n/i18n'; // Importer la configuration i18n

const App = () => {
  const { isDark, toggleTheme, scrollTo, handleCTA, WHATSAPP_LINK } = useStore();
  const { t } = useTranslation();

  // Appliquer le thème au chargement de l'application
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const whatsappNumber = "22893445076";
  const whatsappMessage = encodeURIComponent(t("waterLife")); // Utiliser la traduction pour le message WhatsApp

  const scrollToContact = () => {
    scrollTo('contact');
    window.location.hash = '#contact?subject=devis';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300" role="main">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} scrollTo={scrollTo} />
      <main>
        <Hero scrollTo={scrollTo} />

        <section className="bg-cyan-700 py-16 relative overflow-hidden" aria-label={t("successfulDrills")}>
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-12 relative z-10">
            {[
              { label: t("successfulDrills"), val: "500+" },
              { label: t("regionsCovered"), val: "15+" },
              { label: t("peopleSupplied"), val: "10k+" },
              { label: t("satisfaction"), val: "100%" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100} className="text-center text-white" role="listitem">
                <AnimatedCounter value={stat.val} className="text-4xl md:text-6xl font-black mb-2" aria-label={`${stat.val} ${stat.label}`} />
                <div className="text-xs md:text-sm uppercase font-bold opacity-90 tracking-widest">{stat.label}</div>
              </ScrollReveal>
            ))}
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl" aria-hidden="true"></div>
        </section>

        <Services />
        <About />
        <LiveOperations />
        <Gallery />
        <CompletedProjects />
        <Projects />
        <Testimonials />
        <div id="faq" role="region" aria-labelledby="faq-title">
          <FAQ />
        </div>
        <ServiceAreaMap />
        <Partners />

        <section className="py-24 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-900 dark:to-blue-900" role="banner" aria-label={t("readyToDrill")}>
           <ScrollReveal className="max-w-7xl mx-auto px-4 text-center">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight" id="cta-heading">
               {t("readyToDrill")}
             </h2>
             <p className="text-xl text-cyan-50 mb-10 max-w-2xl mx-auto font-medium opacity-90" id="cta-description">
               {t("ctaDescription")}
             </p>
             <button
               onClick={scrollToContact}
               className="bg-white text-cyan-900 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-slate-100 transition-all shadow-2xl inline-block transform hover:-translate-y-1"
               aria-describedby="cta-description"
             >
               {t("requestQuote")}
             </button>
           </ScrollReveal>
        </section>

        <Careers />
        <Contact handleCTA={handleCTA} />
      </main>
      <Footer />

      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14.08 9.01 9.01 0 0 1 5.3 1.5l3.2-1.1z"/></svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold">WhatsApp</span>
      </a>

      <a
        href="tel:93445076"
        className="md:hidden fixed bottom-6 right-6 z-50 bg-cyan-600 text-white p-4 rounded-full shadow-2xl"
        aria-label="Appeler"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </div>
  );
};

export default App;