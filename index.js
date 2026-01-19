import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { 
  Droplets, Construction, Settings, Waves, Map, Pipette, Wrench, GraduationCap, Factory,
  Menu, X, Moon, Sun, Search, Phone, ArrowRight, CheckCircle2, MapPin, Clock, Send, CheckCircle,
  ChevronLeft, ChevronRight, Play, ExternalLink
} from 'lucide-react';

// --- CONSTANTES MISES À JOUR (Source: Affiche) ---
const COMPANY_NAME = "SOCIÉTÉ DE FORAGES";
const FULL_NAME = "ETS: DOCTEUR DES PROFONDEURS HYDRAULIQUE DE TOUS BORDS";
const SLOGAN = "L'eau c'est la vie !!!";
const CONTACT_PHONES = ["93 44 50 76", "97 77 03 50", "99 64 49 10"];
const ICON_COLOR = "text-cyan-600 dark:text-cyan-400";

const SERVICES = [
  { id: 1, title: "Forages Mécaniques", description: "Utilisation de machines rotatives pour des forages précis et profonds.", icon: <Construction className={ICON_COLOR} /> },
  { id: 2, title: "Forages Industriels", description: "Infrastructures lourdes pour gros débits (usines, agriculture).", icon: <Factory className={ICON_COLOR} /> },
  { id: 3, title: "Forages de Puits", description: "Aménagements de puits traditionnels et modernes pour les ménages.", icon: <Droplets className={ICON_COLOR} /> },
  { id: 4, title: "Conseil & Assistance", description: "Expertise technique pour optimiser vos installations hydrauliques.", icon: <Settings className={ICON_COLOR} /> },
  { id: 5, title: "Équipements & Pompage", description: "Tubage, soufflage et installation de pompes haute pression.", icon: <Wrench className={ICON_COLOR} /> },
  { id: 6, title: "Recherche Géophysique", description: "Dépistage scientifique des points d'eau avant forage.", icon: <Map className={ICON_COLOR} /> },
  { id: 7, title: "Canalisation & Drainage", description: "Installation complète de réseaux de distribution d'eau.", icon: <Pipette className={ICON_COLOR} /> },
  { id: 8, title: "Réparation Équipements", description: "Maintenance corrective rapide pour tous vos systèmes hydrauliques.", icon: <Waves className={ICON_COLOR} /> },
  { id: 9, title: "Formation Spécialisée", description: "Programmes techniques pour futurs techniciens foreurs.", icon: <GraduationCap className={ICON_COLOR} /> }
];

const COMPLETED_PROJECTS = [
  { id: 1, title: "Zone Industrielle de Lomé", description: "Installation d'un château d'eau et forage industriel 150m.", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, title: "Village de Kougnohou", description: "Projet d'hydraulique villageoise avec pompage solaire.", image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&q=80&w=1200" },
  { id: 3, title: "Ferme Moderne d'Anié", description: "Forage mécanique pour l'irrigation intensive de 20 hectares.", image: "https://images.unsplash.com/photo-1518107616385-ad3089197f0c?auto=format&fit=crop&q=80&w=1200" },
  { id: 4, title: "Résidence de Prestige Baguida", description: "Puits filtrant et système de purification d'eau domestique.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200" }
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

const CompletedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % COMPLETED_PROJECTS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + COMPLETED_PROJECTS.length) % COMPLETED_PROJECTS.length);

  return (
    <section id="projets" className="py-24 bg-slate-900 text-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-400 font-bold uppercase mb-4 tracking-widest">Réalisations</h2>
          <h3 className="text-3xl md:text-5xl font-black mb-8">Nos Projets Terminés</h3>
        </ScrollReveal>

        <div className="relative group max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-cyan-600 p-4 rounded-full backdrop-blur-md transition-all">
            <ChevronLeft size={30} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-cyan-600 p-4 rounded-full backdrop-blur-md transition-all">
            <ChevronRight size={30} />
          </button>

          {/* Carousel Slide */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {COMPLETED_PROJECTS.map((project, idx) => (
              <div key={project.id} className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 md:p-12">
                  <div className="max-w-2xl">
                    <h4 className="text-2xl md:text-4xl font-bold mb-4">{project.title}</h4>
                    <p className="text-slate-300 text-lg mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex gap-4">
                      <span className="bg-cyan-600/20 text-cyan-400 px-4 py-1 rounded-full text-sm font-bold border border-cyan-400/30">Succès Garanti</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {COMPLETED_PROJECTS.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} className={`h-2 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-12 bg-cyan-500' : 'w-3 bg-slate-700'}`}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const OperationsLive = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <ScrollReveal className="lg:w-1/2">
            <h2 className="text-cyan-600 font-bold uppercase mb-4 tracking-widest">En Action</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 dark:text-white">Opérations sur le Terrain</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
              Découvrez la précision et la force de nos équipes lors des phases critiques de forage. Nous ne nous arrêtons que lorsque l'eau jaillit.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
                <span className="text-cyan-600 font-black text-2xl block mb-1">99%</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Taux de Réussite</span>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
                <span className="text-cyan-600 font-black text-2xl block mb-1">24h/24</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Assistance</span>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Vidéos simulées avec placeholder ou liens réels si disponibles */}
             <div className="relative group rounded-3xl overflow-hidden aspect-[9/16] shadow-2xl bg-slate-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="text-white opacity-40 group-hover:scale-125 transition-transform" size={60} />
                </div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Phase de Creusage</div>
             </div>
             <div className="relative group rounded-3xl overflow-hidden aspect-[9/16] shadow-2xl bg-slate-900 md:mt-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="text-white opacity-40 group-hover:scale-125 transition-transform" size={60} />
                </div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Jaillissement d'Eau</div>
             </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
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
    localStorage.theme = newTheme ? 'dark' : 'light';
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md py-4 border-b dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-600 p-2 rounded-lg"><Droplets className="text-white w-6 h-6" /></div>
            <span className="font-black text-xl tracking-tighter dark:text-white">{COMPANY_NAME}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
             {['Services', 'Projets', 'Contact'].map(item => (
               <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-colors">{item}</button>
             ))}
             <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={() => scrollToSection('contact')} className="bg-cyan-600 text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">Demander un devis</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover opacity-20 dark:opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-slate-950 dark:via-slate-950/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl">
            <ScrollReveal>
              <span className="inline-block bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 font-black px-4 py-1 rounded-full text-sm mb-6 uppercase tracking-widest border border-cyan-600/20">Expertise Hydraulique Togo</span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1]">
                La <span className="text-cyan-600">Force</span> de l'Eau au service de vos projets.
              </h1>
              <p className="text-xl md:text-2xl font-bold italic text-slate-500 dark:text-slate-300 mb-4">{FULL_NAME}</p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl">
                Spécialiste du forage profond, mécanique et industriel. Nous transformons vos terrains en sources de vie pérennes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('services')} className="bg-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-600/20">Consulter nos services</button>
                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-4 rounded-2xl border dark:border-slate-800 shadow-sm">
                   <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full"><Phone className="text-green-600" size={20} /></div>
                   <span className="font-bold dark:text-white">{CONTACT_PHONES[0]}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Quick Banner */}
      <div className="bg-cyan-600 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {[{l:"Forages réussis", v:"500+"}, {l:"Ans d'expérience", v:"15+"}, {l:"Satisfaction Client", v:"100%"}].map((s, i) => (
            <div key={i} className="text-center border-r last:border-0 border-white/20">
              <AnimatedCounter value={s.v} className="text-4xl font-black mb-1" />
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid (Mise à jour selon affiche) */}
      <section id="services" className="py-24 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-cyan-600 font-bold uppercase mb-4 tracking-widest">Nos Services</h2>
            <h3 className="text-3xl md:text-5xl font-black dark:text-white">Expertise de Bout en Bout</h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 100} className="group bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl transition-all duration-300">
                <div className="mb-6 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm inline-block group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  {React.cloneElement(s.icon, { size: 32, className: "transition-colors group-hover:text-white" })}
                </div>
                <h4 className="text-xl font-bold mb-4 dark:text-white group-hover:text-cyan-600 transition-colors">{s.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <OperationsLive />

      {/* Projects Carousel */}
      <CompletedProjects />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <h2 className="text-cyan-600 font-bold uppercase mb-4 tracking-widest">Contact</h2>
              <h3 className="text-3xl md:text-5xl font-black mb-8 dark:text-white">Votre projet mérite la meilleure expertise.</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                Remplissez le formulaire ou appelez-nous directement. Nos techniciens sont prêts à intervenir sur tout le territoire.
              </p>
              
              <div className="space-y-6">
                {CONTACT_PHONES.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border dark:border-slate-700 group hover:border-cyan-500 transition-all">
                    <div className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-xl"><Phone className="text-cyan-600" /></div>
                    <div>
                      <div className="text-xs uppercase font-bold text-slate-400 mb-1">Ligne Info</div>
                      <a href={`tel:${p}`} className="font-bold text-xl dark:text-white hover:text-cyan-600 transition-colors">{p}</a>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl border dark:border-slate-700">
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('Merci ! Notre équipe technique vous recontactera sous peu.'); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Votre Nom</label>
                    <input className="w-full p-4 bg-slate-50 dark:bg-slate-950 border dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white" placeholder="Nom Complet" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Téléphone / WhatsApp</label>
                    <input className="w-full p-4 bg-slate-50 dark:bg-slate-950 border dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white" placeholder="Ex: 93 44 50 76" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Type de Projet</label>
                  <select className="w-full p-4 bg-slate-50 dark:bg-slate-950 border dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white appearance-none">
                    <option>Forage Domestique</option>
                    <option>Forage Industriel / Agricole</option>
                    <option>Maintenance / Réparation</option>
                    <option>Étude Géophysique</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Localisation du terrain</label>
                  <input className="w-full p-4 bg-slate-50 dark:bg-slate-950 border dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white" placeholder="Ville ou quartier" required />
                </div>
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-5 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                  Envoyer ma demande <Send size={20} />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final Footer */}
      <footer className="bg-slate-950 text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="bg-cyan-600 p-2 rounded-lg"><Droplets className="text-white w-8 h-8" /></div>
            <span className="font-black text-2xl tracking-tighter uppercase">{COMPANY_NAME}</span>
          </div>
          <p className="text-slate-400 italic mb-4 max-w-2xl mx-auto">"{FULL_NAME}"</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
            <p className="font-bold text-cyan-400 tracking-widest uppercase">{SLOGAN}</p>
            <div className="h-4 w-[1px] bg-slate-800 hidden md:block"></div>
            <p className="text-slate-400">Siège Social : Lomé, Togo</p>
          </div>
          <div className="pt-10 border-t border-white/5 text-slate-600 text-sm flex flex-col md:flex-row justify-between gap-4">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}. Site officiel de forage hydraulique.</p>
            <div className="flex gap-6 justify-center">
               <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
               <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp (Affiche Style) */}
      <a 
        href={`https://wa.me/228${CONTACT_PHONES[0].replace(/\s/g, '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] p-5 rounded-full shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform z-50 group flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14.08 9.01 9.01 0 0 1 5.3 1.5l3.2-1.1z"/></svg>
        <div className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-2xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl whitespace-nowrap">Besoin d'eau ? Parlons-en !</div>
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