
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { 
  Droplets, Construction, Settings, Waves, Map, Pipette, Wrench, GraduationCap, Factory,
  Menu, X, Moon, Sun, Search, Phone, ArrowRight, CheckCircle2, MapPin, Clock, Send, CheckCircle,
  ChevronLeft, ChevronRight, Play, ExternalLink, ShieldCheck, Target, Droplet
} from 'lucide-react';

// --- CONFIGURATION & DONNÉES ---
const COMPANY_NAME = "DOCTEUR DES PROFONDEURS";
const FULL_NAME = "ETS: DOCTEUR DES PROFONDEURS HYDRAULIQUE DE TOUS BORDS";
const SLOGAN = "L'eau c'est la vie !!!";
const WHATSAPP_LINK = "https://wa.me/22893445076";
const CONTACT_PHONES = ["93 44 50 76", "97 77 03 50", "99 64 49 10"];

const SERVICES = [
  { id: 1, title: "Forages Mécaniques", description: "Utilisation de foreuses rotatives lourdes pour percer les couches rocheuses les plus dures.", icon: <Construction /> },
  { id: 2, title: "Forages Industriels", description: "Infrastructures à haut débit pour usines, complexes hôteliers et périmètres agricoles.", icon: <Factory /> },
  { id: 3, title: "Forages de Puits", description: "Accès immédiat à l'eau potable pour les ménages et les communautés villageoises.", icon: <Droplets /> },
  { id: 4, title: "Conseil & Assistance", description: "Audit technique de vos installations existantes et conseil en implantation.", icon: <Settings /> },
  { id: 5, title: "Équipements & Pompage", description: "Installation de tubage, soufflage et pompes immergées de marques mondiales.", icon: <Wrench /> },
  { id: 6, title: "Recherche Géophysique", description: "Études scientifiques par résistivité électrique pour localiser précisément les nappes.", icon: <Map /> },
  { id: 7, title: "Canalisation & Drainage", description: "Déploiement de réseaux de distribution d'eau et assainissement professionnel.", icon: <Pipette /> },
  { id: 8, title: "Réparation Hydraulique", description: "Maintenance urgente et révision complète de vos équipements de pompage.", icon: <Waves /> },
  { id: 9, title: "Formation Technique", description: "Programmes de formation pour opérateurs et techniciens en hydraulique.", icon: <GraduationCap /> }
];

const COMPLETED_PROJECTS = [
  { 
    id: 1, 
    title: "Station de Pompage Solaire", 
    location: "Région des Savanes", 
    depth: "145m",
    flow: "15 m3/h",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 2, 
    title: "Forage Industriel Portuaire", 
    location: "Port de Lomé", 
    depth: "210m",
    flow: "45 m3/h",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 3, 
    title: "Puits Communautaire", 
    location: "Kpalimé", 
    depth: "85m",
    flow: "5 m3/h",
    image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&q=80&w=1200" 
  }
];

// --- COMPOSANTS UI ---

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

const CompletedProjects = () => {
  const [curr, setCurr] = useState(0);
  const next = () => setCurr((curr + 1) % COMPLETED_PROJECTS.length);
  const prev = () => setCurr((curr - 1 + COMPLETED_PROJECTS.length) % COMPLETED_PROJECTS.length);

  return (
    <section id="projets" className="py-24 bg-slate-950 text-white scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-red-600 font-black uppercase tracking-widest text-sm mb-4 italic">Nos Succès Réalisés</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Réalisations de <span className="text-cyan-400">Référence</span></h3>
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="p-4 rounded-full border border-white/10 hover:bg-red-600 transition-all"><ChevronLeft /></button>
            <button onClick={next} className="p-4 rounded-full border border-white/10 hover:bg-red-600 transition-all"><ChevronRight /></button>
          </div>
        </ScrollReveal>

        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
          {COMPLETED_PROJECTS.map((p, i) => (
            <div key={p.id} className={`absolute inset-0 transition-all duration-1000 ease-out ${i === curr ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
              <img src={p.image} className="w-full h-full object-cover" alt={p.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-8 md:p-16">
                <div className="grid md:grid-cols-2 w-full items-end gap-8">
                  <div>
                    <span className="inline-block bg-red-600 px-4 py-1 rounded-full text-xs font-black uppercase mb-4 tracking-widest">{p.location}</span>
                    <h4 className="text-3xl md:text-5xl font-black mb-2 italic">{p.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-4 md:justify-end">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[140px]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Profondeur</span>
                      <span className="text-2xl font-black text-cyan-400">{p.depth}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[140px]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Débit Mesuré</span>
                      <span className="text-2xl font-black text-cyan-400">{p.flow}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LiveOperations = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full mb-4 font-black text-[10px] uppercase tracking-widest">
            <Play size={12} fill="currentColor" /> Live du terrain
          </div>
          <h2 className="text-4xl md:text-6xl font-black dark:text-white italic uppercase tracking-tighter leading-none">Nos Machines en <span className="text-red-600">Action</span></h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, label: "Forage mécanique profond", color: "bg-blue-600" },
            { id: 2, label: "Arrivée d'eau (Jaillissement)", color: "bg-cyan-500" },
            { id: 3, label: "Installation de pompe", color: "bg-slate-800" }
          ].map((vid) => (
            <ScrollReveal key={vid.id} className="relative group aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer">
              <div className={`absolute inset-0 ${vid.color} opacity-20`}></div>
              <img src={`https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600&sig=${vid.id}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Operation" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-125 transition-transform group-hover:bg-red-600">
                  <Play className="text-white fill-current" />
                </div>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-black uppercase text-sm italic tracking-widest bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">{vid.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- APPLICATION PRINCIPALE ---

const App = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [formData, setFormData] = useState({ name: '', contact: '', subject: 'Demande de devis forage', message: '' });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.theme = newTheme ? 'dark' : 'light';
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTA = (subject, message, focusId) => {
    scrollTo('contact');
    setFormData(prev => ({
      ...prev,
      subject: subject || prev.subject,
      message: message || prev.message
    }));
    
    if (focusId) {
      setTimeout(() => {
        const input = document.getElementById(focusId);
        if (input) input.focus();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Navigation Pro */}
      <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-4 border-b-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('accueil')}>
             <div className="bg-cyan-600 p-2 rounded-xl shadow-lg"><Droplets className="text-white" /></div>
             <div className="flex flex-col leading-none">
                <span className="font-black text-xl tracking-tighter dark:text-white">{COMPANY_NAME}</span>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest italic">Expert Hydraulique</span>
             </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
             {['Services', 'Projets', 'Contact'].map(item => (
               <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="font-black text-[11px] uppercase tracking-widest hover:text-red-600 transition-colors dark:text-slate-300">{item}</button>
             ))}
             <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <a href={WHATSAPP_LINK} target="_blank" className="bg-red-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-red-600/20">Devis Rapide</a>
          </div>
        </div>
      </nav>

      {/* Hero Section Cinématique */}
      <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover opacity-30 blur-[2px] dark:opacity-20" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <ScrollReveal className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[2px] w-20 bg-red-600"></div>
               <span className="font-black uppercase tracking-[0.4em] text-xs text-slate-500 dark:text-slate-400">Leader au Togo</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-slate-950 dark:text-white mb-8 leading-[0.8] tracking-tighter uppercase italic">
              La <span className="text-red-600">Force</span> <br/>
              de l'Eau.
            </h1>
            <p className="text-xl md:text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-6 tracking-tight uppercase">{FULL_NAME}</p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl leading-relaxed font-medium">
              Spécialiste panafricain du forage profond et de l'hydraulique industrielle. Nous transformons les profondeurs arides en sources de vie pérennes.
            </p>
            <div className="flex flex-wrap gap-6">
              <button onClick={() => scrollTo('services')} className="group bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-red-600 hover:dark:bg-red-600 hover:text-white shadow-2xl flex items-center gap-4">
                Nos Services <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-8 py-6 rounded-2xl border-2 dark:border-slate-800 shadow-sm">
                 <Phone className="text-red-600" />
                 <span className="font-black text-xl dark:text-white tracking-tighter">93 44 50 76</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Floating Water Effect Overlay */}
        <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* Trust Stats */}
      <div className="bg-slate-950 py-20 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[{v:"500+", l:"Forages"}, {v:"15+", l:"Régions"}, {v:"100%", l:"Réussite"}, {v:"24/7", l:"Assistance"}].map((s, i) => (
              <div key={i}>
                 <span className="block text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-2">{s.v}</span>
                 <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">{s.l}</span>
              </div>
            ))}
         </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal className="text-center mb-24">
             <div className="bg-red-600 text-white px-6 py-2 rounded-full inline-block font-black text-[10px] uppercase tracking-[0.3em] mb-6 italic">Catalogue Technique</div>
             <h2 className="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter italic leading-none">Expertise <span className="text-cyan-600">360°</span></h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 50} className="group bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-transparent hover:border-cyan-600 transition-all duration-500 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-2">
                <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm inline-block group-hover:bg-cyan-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                   {React.cloneElement(s.icon, { size: 40 })}
                </div>
                <h4 className="text-2xl font-black mb-4 dark:text-white uppercase tracking-tight italic group-hover:text-cyan-600 transition-colors leading-tight">{s.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{s.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live Action Section */}
      <LiveOperations />

      {/* Projects Carousel */}
      <CompletedProjects />

      {/* Call to Action Improved */}
      <section className="py-24 bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-900 dark:to-blue-900">
         <ScrollReveal className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 italic uppercase tracking-tighter leading-none">
              Prêt à <span className="text-red-500">Forer</span> ?
            </h2>
            <p className="text-xl text-cyan-50 mb-12 max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
              Ne laissez pas la sécheresse freiner vos ambitions. Obtenez une étude de terrain et un devis personnalisé dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button 
                 onClick={() => handleCTA('Demande de devis forage', "Je souhaite obtenir un devis pour un forage mécanique à : ", 'form-message')}
                 className="bg-white text-slate-900 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white transition-all shadow-2xl transform hover:-translate-y-1"
               >
                 Demander un devis
               </button>
               <button 
                 onClick={() => handleCTA('Expertise Géophysique', "Besoin d'une recherche scientifique de nappe phréatique.", 'form-name')}
                 className="bg-transparent text-white border-2 border-white/30 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
               >
                 Étude Géophysique
               </button>
            </div>
         </ScrollReveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 italic leading-none">Info <br/><span className="text-red-600">Line :</span></h2>
              <div className="space-y-6 mb-16">
                {CONTACT_PHONES.map(p => (
                   <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-4xl md:text-7xl font-black hover:text-red-600 transition-all tracking-tighter dark:text-white">
                      {p}
                   </a>
                ))}
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center animate-bounce">
                    <ArrowRight className="rotate-90" />
                 </div>
                 <p className="text-2xl font-black uppercase tracking-widest dark:text-slate-400">{SLOGAN}</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal className="bg-slate-950 text-white p-12 rounded-[4rem] shadow-2xl border border-white/10">
              <h3 className="text-4xl font-black mb-10 uppercase tracking-tighter italic">Démarrer <br/><span className="text-cyan-400">l'expertise</span></h3>
              <form className="space-y-8" onSubmit={e => { e.preventDefault(); alert('Nos techniciens ont reçu votre demande !'); }}>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Votre Nom</label>
                   <input 
                    id="form-name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-6 bg-white/5 border-b-2 border-white/20 outline-none font-bold text-xl focus:border-cyan-400 transition-all rounded-t-2xl" placeholder="NOM COMPLET" required />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-60">WhatsApp / Tel</label>
                   <input 
                    id="form-contact"
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    className="w-full p-6 bg-white/5 border-b-2 border-white/20 outline-none font-bold text-xl focus:border-cyan-400 transition-all rounded-t-2xl" placeholder="NUMÉRO DE CONTACT" required />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-60">Votre besoin</label>
                   <textarea 
                    id="form-message"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full p-6 bg-white/5 border-b-2 border-white/20 outline-none font-bold text-xl focus:border-cyan-400 transition-all rounded-t-2xl h-32" placeholder="TYPE DE PROJET ET LIEU" required></textarea>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-black py-6 rounded-[2rem] uppercase tracking-widest text-lg hover:bg-white hover:text-red-600 transition-all shadow-xl flex items-center justify-center gap-4">
                  Envoyer <Send size={24} />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-12">
            <div className="bg-cyan-600 p-3 rounded-2xl"><Droplets className="text-white w-8 h-8" /></div>
            <span className="font-black text-3xl tracking-tighter uppercase italic">{COMPANY_NAME}</span>
          </div>
          <p className="opacity-40 text-[10px] font-bold uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} {COMPANY_NAME} • L'eau c'est la vie.
          </p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a href={WHATSAPP_LINK} target="_blank" className="fixed bottom-10 right-10 z-[100] group">
         <div className="bg-[#25D366] text-white p-6 rounded-full shadow-[0_20px_60px_rgba(37,211,102,0.4)] group-hover:scale-110 transition-transform flex items-center justify-center relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14.08 9.01 9.01 0 0 1 5.3 1.5l3.2-1.1z"/></svg>
         </div>
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
