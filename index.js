import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { 
  Droplets, Construction, Settings, Waves, Map, Pipette, Wrench, GraduationCap, Factory,
  Menu, X, Moon, Sun, Search, Phone, ArrowRight, CheckCircle2, MapPin, Clock, Send, CheckCircle,
  Facebook, Instagram, Linkedin, Twitter, ChevronLeft, ChevronRight
} from 'lucide-react';

// --- CONSTANTES ---
const COMPANY_NAME = "SOCIÉTÉ DE FORAGES";
const FULL_NAME = "ETS: DOCTEUR DES PROFONDEURS HYDRAULIQUE DE TOUS BORDS";
const SLOGAN = "L'eau c'est la vie !!!";
const CONTACT_PHONES = ["+228 93 44 50 76", "+228 97 77 03 50", "+228 99 64 49 10"];
const ICON_COLOR = "text-cyan-600 dark:text-cyan-400";

const SERVICES = [
  { id: "meca", title: "Forages Mécaniques", description: "Forages de précision utilisant des technologies avancées.", icon: <Construction className={`w-8 h-8 ${ICON_COLOR}`} /> },
  { id: "indus", title: "Forages Industriels", description: "Solutions à grande échelle pour usines et complexes agricoles.", icon: <Factory className={`w-8 h-8 ${ICON_COLOR}`} /> },
  { id: "puits", title: "Forages de Puits", description: "Installation de puits domestiques et communautaires.", icon: <Droplets className={`w-8 h-8 ${ICON_COLOR}`} /> },
  { id: "equipement", title: "Équipements & Pompage", description: "Installation de systèmes de pompage haute performance.", icon: <Wrench className={`w-8 h-8 ${ICON_COLOR}`} /> },
  { id: "geophysique", title: "Recherche & Géophysique", description: "Dépistage scientifique des points d'eau.", icon: <Map className={`w-8 h-8 ${ICON_COLOR}`} /> },
  { id: "reparation", title: "Réparation Hydraulique", description: "Maintenance curative et préventive de vos installations.", icon: <Waves className={`w-8 h-8 ${ICON_COLOR}`} /> }
];

const PROJECTS = [
  { id: 1, title: "Complexe Agricole d'Atakpamé", description: "Forage industriel à 120m de profondeur.", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Zone Industrielle de Lomé", description: "Système de pompage solaire et château d'eau.", image: "https://images.unsplash.com/photo-1518107616385-ad3089197f0c?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Hydraulique Villageoise Kara", description: "Réhabilitation de 10 forages existants.", image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&q=80&w=800" }
];

const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1533221950280-990a423793e2?auto=format&fit=crop&q=80&w=800", caption: "Forage profond en milieu rural" },
  { url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=800", caption: "Installation de station de pompage" },
  { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800", caption: "Analyses géophysiques avancées" }
];

const FAQ_DATA = [
  { question: "Quelle est la profondeur maximale ?", answer: "Nous pouvons atteindre jusqu'à 250 mètres selon la géologie." },
  { question: "Combien de temps dure un forage ?", answer: "Généralement entre 3 et 5 jours ouvrés." },
  { question: "Quelles garanties offrez-vous ?", answer: "Nos installations sont garanties 2 ans avec contrat de maintenance." }
];

// --- COMPOSANTS INTERNES ---

const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${isVisible ? 'active' : ''} ${className}`}>
      {children}
    </div>
  );
};

const AnimatedCounter = ({ value, className }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const step = (now) => {
          if (!start) start = now;
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * numericValue));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(entry.target);
      }
    });
    if (ref.current) observer.observe(ref.current);
  }, [numericValue]);
  return <div ref={ref} className={className}>{count}{suffix}</div>;
};

const Navbar = ({ toggleTheme, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('accueil')}>
          <div className="bg-cyan-600 p-2 rounded-lg"><Droplets className="text-white w-6 h-6" /></div>
          <span className={`font-bold text-lg hidden sm:block ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>{COMPANY_NAME}</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {['Accueil', 'Services', 'About', 'Projets'].map(item => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`font-medium hover:text-cyan-600 transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>
              {item === 'About' ? 'À Propos' : item}
            </button>
          ))}
          <button onClick={toggleTheme} className={`p-2 rounded-full ${scrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => scrollToSection('contact')} className="bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold">Contact</button>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white" /> : <Menu className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 p-4 space-y-4">
          {['Accueil', 'Services', 'About', 'Projets', 'Contact'].map(item => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left font-bold text-slate-900 dark:text-white py-2">{item}</button>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- APPLICATION PRINCIPALE ---

const App = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const whatsappNumber = "22893445076";

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      {/* Hero Section */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1920" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/50 to-slate-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-black mb-6">La <span className="text-cyan-400">Force</span> de l'Eau</h1>
            <p className="text-xl md:text-2xl font-bold italic text-cyan-200 mb-8">{FULL_NAME}</p>
            <p className="max-w-2xl mx-auto text-slate-300 text-lg mb-10">{SLOGAN}</p>
            <div className="flex justify-center gap-4">
              <a href="#services" className="bg-cyan-600 px-8 py-4 rounded-xl font-bold text-lg">Nos Services</a>
              <a href={`tel:${CONTACT_PHONES[0]}`} className="bg-white/10 px-8 py-4 rounded-xl font-bold text-lg border border-white/20">Contactez-nous</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-cyan-700 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around gap-12 text-white">
          {[{l:"Forages", v:"500+"}, {l:"Régions", v:"15+"}, {l:"Alimentées", v:"10k+"}].map((s, i) => (
            <ScrollReveal key={i} className="text-center">
              <AnimatedCounter value={s.v} className="text-5xl font-black" />
              <div className="uppercase text-xs font-bold opacity-80">{s.l}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-cyan-600 font-bold uppercase mb-4 tracking-widest">Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-black">Solutions de Forage</h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 100} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="mb-6">{s.icon}</div>
                <h4 className="text-xl font-bold mb-4">{s.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{s.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal className="mb-12">
            <h2 className="text-cyan-400 font-bold uppercase mb-4">Galerie</h2>
            <h3 className="text-3xl font-black">Opérations de terrain</h3>
          </ScrollReveal>
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative">
            <img src={GALLERY_IMAGES[0].url} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black w-full text-left font-bold">{GALLERY_IMAGES[0].caption}</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-3xl font-black text-center mb-12">FAQ</h3>
          <div className="space-y-4">
            {FAQ_DATA.map((f, i) => (
              <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
                <h4 className="font-bold mb-2">{f.question}</h4>
                <p className="text-slate-600 dark:text-slate-400">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <ScrollReveal>
            <h3 className="text-4xl font-black mb-8">Discutons de votre projet</h3>
            <div className="space-y-6">
              {CONTACT_PHONES.map(p => (
                <div key={p} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
                  <Phone className="text-cyan-600" /> <span className="font-bold">{p}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl">
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Merci !'); }}>
              <input className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl" placeholder="Votre Nom" required />
              <textarea className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl" rows="4" placeholder="Votre projet..." required></textarea>
              <button className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg">Envoyer la demande</button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 text-center border-t border-slate-800">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Droplets className="text-cyan-600" /> <span className="font-black text-xl">{COMPANY_NAME}</span>
        </div>
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} {FULL_NAME}. Tous droits réservés.</p>
      </footer>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="fixed bottom-6 right-6 bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14.08 9.01 9.01 0 0 1 5.3 1.5l3.2-1.1z"/></svg>
      </a>
    </div>
  );
};

// --- RENDU ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);