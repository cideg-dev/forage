import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { 
  Droplets, Construction, Settings, Waves, Map, Pipette, Wrench, GraduationCap, Factory,
  Menu, X, Moon, Sun, Search, Phone, ArrowRight, CheckCircle2, MapPin, Clock, Send, CheckCircle,
  ChevronLeft, ChevronRight, Play, ExternalLink, ShieldCheck, Target, Droplet, MessageSquare, Bot, Sparkles, Calculator
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
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=1200" 
  },
  { 
    id: 3, 
    title: "Puits Communautaire", 
    location: "Kpalimé", 
    depth: "85m",
    flow: "5 m3/h",
    image: "https://images.unsplash.com/photo-1502675135487-e971002a6adb?auto=format&fit=crop&q=80&w=1200" 
  }
];

// --- COMPOSANTS UI ---

const Bubbles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(20)].map((_, i) => {
                const size = Math.random() * 30 + 10;
                const left = Math.random() * 100;
                const delay = Math.random() * 15;
                const duration = Math.random() * 10 + 10;
                return (
                    <div 
                        key={i} 
                        className="bubble" 
                        style={{ 
                            width: `${size}px`, 
                            height: `${size}px`, 
                            left: `${left}%`, 
                            animationDelay: `${delay}s`,
                            animationDuration: `${duration}s`
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
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

const SectionDivider = ({ color = "#001220", flip = false }) => (
    <div className={`wave-container ${flip ? 'rotate-180' : ''}`} style={{ backgroundColor: 'transparent' }}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill={color}></path>
        </svg>
    </div>
);

// --- COMPOSANT AQUA-BOT IA ---

const AquaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: "Bonjour ! Je suis AquaBot, l'expert IA du Docteur des Profondeurs. Comment puis-je vous aider dans votre projet hydraulique aujourd'hui ?"}
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Vous êtes AquaBot, l'assistant expert de la société de forage "Docteur des Profondeurs" au Togo. 
        Répondez de manière professionnelle, courtoise et technique sur le forage, l'hydraulique et les puits. 
        Informations société : Slogan "${SLOGAN}", Téléphone "${CONTACT_PHONES[0]}". 
        Question client : ${userMsg}`,
        config: { temperature: 0.7, maxOutputTokens: 500 }
      });
      
      setMessages(prev => [...prev, {role: 'bot', text: response.text || "Désolé, j'ai rencontré une petite bulle d'erreur. Pouvez-vous répéter ?"}]);
    } catch (error) {
      setMessages(prev => [...prev, {role: 'bot', text: "Oups, ma connexion sous-marine est instable. Essayez WhatsApp !"}]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-10 z-[100]">
      {isOpen ? (
        <div className="glass-card w-80 md:w-96 h-[500px] flex flex-col rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-5 duration-300 overflow-hidden border-2 border-cyan-500/30">
          <div className="bg-cyan-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <span className="font-black text-sm uppercase tracking-widest">AquaBot IA</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20}/></button>
          </div>
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar bg-slate-900/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${m.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'glass-card text-blue-100 rounded-tl-none border-cyan-500/20'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-cyan-400 text-xs animate-pulse italic">AquaBot analyse les profondeurs...</div>}
          </div>
          <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question technique..."
              className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-cyan-500 transition-all"
            />
            <button onClick={handleSend} className="bg-cyan-600 p-2 rounded-xl text-white hover:bg-blue-600 transition-all"><Send size={20}/></button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-6 rounded-full shadow-[0_20px_60px_rgba(37,99,235,0.4)] hover:scale-110 transition-transform flex items-center justify-center relative active:scale-95 border-2 border-white/20"
        >
          <Bot size={32} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
          </span>
        </button>
      )}
    </div>
  );
};

// --- CALCULATEUR DE PROJET ---

const ProjectCalculator = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ type: '', terrain: '', depth: 50 });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Générez une estimation préliminaire professionnelle pour un forage au Togo :
      Type : ${data.type}
      Terrain : ${data.terrain}
      Profondeur souhaitée : ${data.depth}m.
      Donnez une fourchette de prix estimative (FCFA), les défis techniques potentiels et le temps d'exécution. 
      Soyez encourageant mais précisez que c'est une estimation non-contractuelle.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setResult(response.text || "Impossible de générer l'estimation.");
      setStep(4);
    } catch (e) {
      setResult("Désolé, nos serveurs de calcul sont sous l'eau. Contactez-nous pour un devis précis.");
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#002147] to-[#001220] relative">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <div className="bg-cyan-600/20 text-cyan-400 p-3 rounded-2xl inline-block mb-4"><Calculator size={32}/></div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Calculateur de <span className="text-cyan-400">Projet Intelligent</span></h2>
          <p className="text-blue-100/60 mt-4">Estimez la faisabilité de votre forage en 3 clics grâce à notre IA.</p>
        </ScrollReveal>

        <div className="glass-card rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-cyan-400 font-bold animate-pulse">Sondage du sous-sol par l'IA...</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <h4 className="text-2xl font-bold text-white text-center">1. Quel type de forage ?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Domestique (Puits)', 'Industriel / Agricole'].map(t => (
                  <button 
                    key={t}
                    onClick={() => { setData({...data, type: t}); setStep(2); }}
                    className="glass-card p-6 rounded-2xl border-white/10 hover:border-cyan-500 hover:bg-cyan-600/20 transition-all text-white font-bold uppercase tracking-widest text-sm"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h4 className="text-2xl font-bold text-white text-center">2. Nature du terrain estimée</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Sableux / Argileux', 'Rocheux / Dur', 'Inconnu'].map(t => (
                  <button 
                    key={t}
                    onClick={() => { setData({...data, terrain: t}); setStep(3); }}
                    className="glass-card p-6 rounded-2xl border-white/10 hover:border-cyan-500 hover:bg-cyan-600/20 transition-all text-white font-bold uppercase tracking-widest text-xs"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="text-cyan-400 underline w-full text-center">Retour</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h4 className="text-2xl font-bold text-white text-center">3. Profondeur visée : <span className="text-cyan-400">{data.depth}m</span></h4>
              <input 
                type="range" min="30" max="250" step="10" 
                value={data.depth}
                onChange={(e) => setData({...data, depth: parseInt(e.target.value)})}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
              />
              <div className="flex justify-between text-xs text-blue-200 uppercase font-bold">
                <span>30m</span>
                <span>Profondeur Abyssale (250m)</span>
              </div>
              <button 
                onClick={calculateEstimate}
                className="w-full bg-cyan-600 text-white font-black py-6 rounded-2xl uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
              >
                Générer l'estimation IA <Sparkles size={20}/>
              </button>
              <button onClick={() => setStep(2)} className="text-cyan-400 underline w-full text-center">Retour</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in zoom-in duration-500">
              <div className="flex items-center gap-3 text-cyan-400 mb-4 border-b border-white/10 pb-4">
                <Sparkles size={24}/>
                <h4 className="text-xl font-black uppercase italic">Votre Estimation Personnalisée</h4>
              </div>
              <div className="text-blue-100 text-sm leading-relaxed whitespace-pre-wrap glass-card p-6 rounded-2xl border-cyan-500/20">
                {result}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => setStep(1)} 
                  className="flex-1 border-2 border-white/20 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all"
                >
                  Nouveau Calcul
                </button>
                <button 
                  onClick={() => { 
                    const contactSection = document.getElementById('contact');
                    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg"
                >
                  Valider avec un Expert
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// --- AUTRES COMPOSANTS ---

const CompletedProjects = () => {
  const [curr, setCurr] = useState(0);
  const next = () => setCurr((curr + 1) % COMPLETED_PROJECTS.length);
  const prev = () => setCurr((curr - 1 + COMPLETED_PROJECTS.length) % COMPLETED_PROJECTS.length);

  return (
    <section id="projets" className="py-24 bg-[#001220] text-white scroll-mt-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-cyan-400 font-black uppercase tracking-widest text-sm mb-4 italic">Nos Réussites Abyssales</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Réalisations de <span className="text-blue-500">Référence</span></h3>
          </div>
          <div className="flex gap-4">
            <button onClick={prev} className="p-4 rounded-full border border-white/10 hover:bg-blue-600 transition-all shadow-lg active:scale-95"><ChevronLeft /></button>
            <button onClick={next} className="p-4 rounded-full border border-white/10 hover:bg-blue-600 transition-all shadow-lg active:scale-95"><ChevronRight /></button>
          </div>
        </ScrollReveal>

        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group">
          {COMPLETED_PROJECTS.map((p, i) => (
            <div key={p.id} className={`absolute inset-0 transition-all duration-1000 ease-out ${i === curr ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
              <img src={p.image} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]" alt={p.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001220] via-transparent to-transparent flex items-end p-8 md:p-16">
                <div className="grid md:grid-cols-2 w-full items-end gap-8">
                  <div>
                    <span className="inline-block bg-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase mb-4 tracking-widest">{p.location}</span>
                    <h4 className="text-3xl md:text-5xl font-black mb-2 italic">{p.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-4 md:justify-end">
                    <div className="glass-card p-6 rounded-3xl min-w-[140px]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Profondeur</span>
                      <span className="text-2xl font-black text-cyan-400">{p.depth}</span>
                    </div>
                    <div className="glass-card p-6 rounded-3xl min-w-[140px]">
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

// --- APP COMPONENT ---

const App = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', subject: 'Demande de devis forage', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleCTA = (subject: string, message: string, focusId: string) => {
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
    <div className="min-h-screen transition-colors duration-300 relative">
      <Bubbles />
      <AquaBot />
      
      {/* Navigation Aquatique */}
      <nav className="fixed w-full z-50 bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl py-4 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollTo('accueil')}>
             <div className="bg-blue-600 p-2 rounded-xl shadow-lg animate-float group-hover:scale-110 transition-transform"><Droplets className="text-white" /></div>
             <div className="flex flex-col leading-none">
                <span className="font-black text-xl tracking-tighter text-white">{COMPANY_NAME}</span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest italic">Expert des Profondeurs</span>
             </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
             {['Services', 'Projets', 'Contact'].map(item => (
               <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="font-black text-[11px] uppercase tracking-widest text-white hover:text-cyan-400 transition-colors active:scale-95">{item}</button>
             ))}
             <a href={WHATSAPP_LINK} target="_blank" className="bg-cyan-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-cyan-600/20 active:scale-95">Expert en Ligne</a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full glass-card p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
             {['Services', 'Projets', 'Contact'].map(item => (
               <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left font-black text-2xl uppercase tracking-tighter text-white hover:text-cyan-400">{item}</button>
             ))}
             <a href={WHATSAPP_LINK} className="bg-cyan-600 text-white px-6 py-4 rounded-full text-center font-black text-xs uppercase tracking-widest">WhatsApp Direct</a>
          </div>
        )}
      </nav>

      {/* Hero Section Océanique */}
      <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover" alt="Fond marin" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001220]/60 via-[#002147]/80 to-[#001220]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <ScrollReveal className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[2px] w-20 bg-cyan-500"></div>
               <span className="font-black uppercase tracking-[0.4em] text-xs text-cyan-200">Au cœur de l'abysse</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-white mb-8 leading-[0.8] tracking-tighter uppercase italic">
              Le <span className="text-cyan-500">Souffle</span> <br/>
              du forage.
            </h1>
            <p className="text-xl md:text-3xl font-black text-blue-400 mb-6 tracking-tight uppercase">{FULL_NAME}</p>
            <p className="text-lg text-blue-100 mb-12 max-w-2xl leading-relaxed font-medium">
              Nous plongeons là où les autres s'arrêtent. Une maîtrise technique sans faille pour extraire l'eau, source de toute vie, même dans les conditions les plus extrêmes.
            </p>
            <div className="flex flex-wrap gap-6">
              <button onClick={() => scrollTo('services')} className="group bg-cyan-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-blue-600 shadow-2xl flex items-center gap-4 active:scale-95">
                Nos Missions <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 glass-card px-8 py-6 rounded-2xl border-2 border-white/10 shadow-sm">
                 <Phone className="text-cyan-400" />
                 <span className="font-black text-xl text-white tracking-tighter">93 44 50 76</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Wave Transition */}
      <SectionDivider color="#001220" />

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#001220] scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-24">
             <div className="bg-blue-600 text-white px-6 py-2 rounded-full inline-block font-black text-[10px] uppercase tracking-[0.3em] mb-6 italic shadow-lg shadow-blue-600/20">Spécialiste Hydraulique</div>
             <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">Nos <span className="text-cyan-400">Expertises</span></h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 50} className="group glass-card p-10 rounded-[3rem] border-2 border-transparent hover:border-cyan-500 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-8 bg-white/5 p-6 rounded-[2rem] shadow-sm inline-block group-hover:bg-cyan-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                   {React.cloneElement(s.icon as React.ReactElement, { size: 40 })}
                </div>
                <h4 className="text-2xl font-black mb-4 text-white uppercase tracking-tight italic group-hover:text-cyan-400 transition-colors leading-tight">{s.title}</h4>
                <p className="text-blue-100/60 leading-relaxed font-medium">{s.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calculateur de Projet Interactif */}
      <ProjectCalculator />

      <SectionDivider color="#001220" flip={true} />

      {/* Projects Carousel */}
      <CompletedProjects />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#000d1a] scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 italic leading-none text-white">Aqua <br/><span className="text-cyan-500">Center :</span></h2>
              <div className="space-y-6 mb-16">
                {CONTACT_PHONES.map(p => (
                   <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-4xl md:text-7xl font-black text-white hover:text-cyan-400 transition-all tracking-tighter">
                      {p}
                   </a>
                ))}
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border-2 border-cyan-500 text-cyan-500 flex items-center justify-center animate-bounce">
                    <ArrowRight className="rotate-90" />
                 </div>
                 <p className="text-2xl font-black uppercase tracking-widest text-blue-400">{SLOGAN}</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal className="glass-card p-12 rounded-[4rem] shadow-2xl">
              <h3 className="text-4xl font-black mb-10 uppercase tracking-tighter italic text-white">Lancer <br/><span className="text-cyan-400">le forage</span></h3>
              <form className="space-y-8" onSubmit={e => { e.preventDefault(); alert('Nos plongeurs techniques ont reçu votre demande !'); }}>
                <div className="space-y-2">
                   <label htmlFor="form-name" className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white">Commanditaire</label>
                   <input 
                    id="form-name"
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-6 bg-white/5 border-b-2 border-white/20 outline-none font-bold text-xl text-white focus:border-cyan-400 transition-all rounded-t-2xl" placeholder="NOM COMPLET" required />
                </div>
                <div className="space-y-2">
                   <label htmlFor="form-contact" className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white">Liaison Mobile</label>
                   <input 
                    id="form-contact"
                    type="text"
                    value={formData.contact}
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    className="w-full p-6 bg-white/5 border-b-2 border-white/20 outline-none font-bold text-xl text-white focus:border-cyan-400 transition-all rounded-t-2xl" placeholder="VOTRE NUMÉRO" required />
                </div>
                <div className="space-y-2">
                   <label htmlFor="form-message" className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white">Objectif de la mission</label>
                   <textarea 
                    id="form-message"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full p-6 bg-white/5 border-b-2 border-white/20 outline-none font-bold text-xl text-white focus:border-cyan-400 transition-all rounded-t-2xl h-32 resize-none" placeholder="DÉTAILS DU PROJET..." required></textarea>
                </div>
                <button type="submit" className="w-full bg-cyan-600 text-white font-black py-6 rounded-[2rem] uppercase tracking-widest text-lg hover:bg-white hover:text-cyan-600 transition-all shadow-xl flex items-center justify-center gap-4">
                  Envoyer l'Alerte <Send size={24} />
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000810] text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-12">
            <div className="bg-blue-600 p-3 rounded-2xl"><Droplets className="text-white w-8 h-8" /></div>
            <span className="font-black text-3xl tracking-tighter uppercase italic">{COMPANY_NAME}</span>
          </div>
          <p className="opacity-40 text-[10px] font-bold uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} {COMPANY_NAME} • L'eau c'est la vie.
          </p>
        </div>
      </footer>
    </div>
  );
};

// --- RENDU ---
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
