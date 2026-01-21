import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { 
  Droplets, Construction, Settings, Waves, Map, Pipette, Wrench, GraduationCap, Factory,
  Menu, X, Phone, ArrowRight, Send, ChevronLeft, ChevronRight, Play, Bot, Sparkles, Calculator, ShieldCheck, Globe
} from 'lucide-react';

// --- DATA ---
const COMPANY_NAME = "Docteur des Profondeurs";
const FULL_NAME = "ETS: Docteur des Profondeurs Hydraulique";
const CONTACT_PHONES = ["93 44 50 76", "97 77 03 50", "99 64 49 10"];
const WHATSAPP_LINK = "https://wa.me/22893445076";

const SERVICES = [
  { id: 1, title: "Forages Mécaniques", description: "Solutions de précision pour l'extraction d'eau en couches rocheuses.", icon: <Construction size={22} /> },
  { id: 2, title: "Hydraulique Industrielle", description: "Infrastructures haute performance pour sites complexes.", icon: <Factory size={22} /> },
  { id: 3, title: "Recherche Géophysique", description: "Localisation scientifique des nappes par résistivité.", icon: <Map size={22} /> },
  { id: 4, title: "Maintenance Curative", description: "Intervention rapide et réhabilitation de forages.", icon: <Wrench size={22} /> },
  { id: 5, title: "Distribution d'eau", description: "Réseaux de canalisation et châteaux d'eau complets.", icon: <Waves size={22} /> },
  { id: 6, title: "Conseil Stratégique", description: "Audit et planification de projets hydrauliques.", icon: <Settings size={22} /> }
];

// --- COMPONENTS ---

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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-sky-600 p-1.5 rounded-lg"><Droplets size={20} className="text-white" /></div>
          <span className="font-bold text-lg tracking-tight">{COMPANY_NAME}</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Expertise', 'Réalisations', 'Contact'].map(item => (
            <button key={item} className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors uppercase tracking-widest">{item}</button>
          ))}
          <a href={WHATSAPP_LINK} className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all">Devis Express</a>
        </div>
      </div>
    </nav>
  );
};

const AquaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: "Expertise Docteur des Profondeurs à votre service. Comment puis-je vous orienter ?"}
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const msg = input;
    setInput("");
    setMessages(prev => [...prev, {role: 'user', text: msg}]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Assistant pour Docteur des Profondeurs (forages au Togo). Réponse pro et brève. Client : ${msg}`,
      });
      setMessages(prev => [...prev, {role: 'bot', text: response.text || "Contactez-nous directement via WhatsApp pour plus de détails."}]);
    } catch (e) {
      setMessages(prev => [...prev, {role: 'bot', text: "Service temporairement indisponible."}]);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="glass-card w-80 md:w-96 h-[480px] flex flex-col rounded-3xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-sky-900/20">
            <div className="flex items-center gap-2"><Bot size={20} className="text-sky-400" /><span className="text-xs font-bold uppercase tracking-widest">Assistant Technique</span></div>
            <button onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl ${m.role === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-200'}`}>{m.text}</div>
              </div>
            ))}
            {isTyping && <div className="text-sky-400 text-[10px] animate-pulse uppercase font-bold">Analyse en cours...</div>}
          </div>
          <div className="p-4 bg-slate-900 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Votre question..." className="flex-1 bg-slate-800 rounded-xl px-4 py-2 text-xs outline-none focus:ring-1 ring-sky-500" />
            <button onClick={handleSend} className="bg-sky-600 p-2 rounded-xl"><Send size={18} /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-sky-600 p-4 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-3">
          <Bot size={24} />
          <span className="hidden md:block text-xs font-bold uppercase tracking-widest mr-2">Aide Technique</span>
        </button>
      )}
    </div>
  );
};

const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover opacity-10" alt="Background" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950"></div>
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <ScrollReveal className="max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full mb-8">
          <ShieldCheck size={14} className="text-sky-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">Expertise Hydraulique Certifiée</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight">
          L'eau à sa <span className="text-sky-500">Source</span>. <br/>
          La force du forage.
        </h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl font-light">
          Spécialiste panafricain basé au Togo, nous transformons les données géophysiques en infrastructures pérennes. Une maîtrise technique absolue au service de vos projets.
        </p>
        <div className="flex flex-wrap gap-5">
          <button className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-3 group">
            Nos Solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-4 bg-slate-900/50 border border-white/5 px-8 py-4 rounded-2xl">
            <Phone size={18} className="text-sky-400" />
            <span className="font-bold text-sm tracking-widest">93 44 50 76</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Expertise = () => (
  <section className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {SERVICES.map((s, i) => (
          <ScrollReveal key={s.id} delay={i * 50} className="glass-card p-10 rounded-3xl group">
            <div className="bg-sky-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-sky-400 mb-8 group-hover:bg-sky-600 group-hover:text-white transition-all">
              {s.icon}
            </div>
            <h4 className="text-xl font-bold mb-4 tracking-tight">{s.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ProjectCalculator = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ type: '', terrain: '', depth: 50 });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Estimation forage Togo : Type ${data.type}, Sol ${data.terrain}, Profondeur ${data.depth}m. Fourchette FCFA, défis et temps. Pro mais informatif.`;
      const res = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setResult(res.text || "Estimation indisponible.");
      setStep(4);
    } catch (e) { setResult("Calcul impossible pour le moment."); setStep(4); }
    finally { setLoading(false); }
  };

  return (
    <section className="py-24 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 uppercase">Estimation Préliminaire</h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">Configurez votre projet en 3 étapes pour recevoir une analyse technique par IA.</p>
        </div>
        <div className="glass-card p-10 rounded-[2.5rem] relative overflow-hidden min-h-[420px]">
          {loading && <div className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center"><div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-4"></div><p className="text-xs font-bold text-sky-400 uppercase tracking-widest">Sondage IA en cours...</p></div>}
          
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in">
              <h5 className="text-sm font-bold uppercase text-slate-500 tracking-widest text-center">Catégorie de forage</h5>
              <div className="grid md:grid-cols-2 gap-4">
                {['Domestique / Puits', 'Industriel / Agricole'].map(t => (
                  <button key={t} onClick={() => { setData({...data, type: t}); setStep(2); }} className="p-6 rounded-2xl border border-white/5 hover:border-sky-500 transition-all font-bold text-sm bg-slate-800/50">{t}</button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right">
              <h5 className="text-sm font-bold uppercase text-slate-500 tracking-widest text-center">Structure du sol</h5>
              <div className="grid grid-cols-3 gap-4">
                {['Sédimentaire', 'Cristallin', 'Inconnu'].map(t => (
                  <button key={t} onClick={() => { setData({...data, terrain: t}); setStep(3); }} className="p-5 rounded-xl border border-white/5 hover:border-sky-500 transition-all text-xs font-bold bg-slate-800/50">{t}</button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right">
              <h5 className="text-sm font-bold uppercase text-slate-500 tracking-widest text-center">Profondeur visée : <span className="text-sky-400">{data.depth}m</span></h5>
              <input type="range" min="30" max="220" step="10" value={data.depth} onChange={e => setData({...data, depth: parseInt(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none accent-sky-500" />
              <button onClick={calculate} className="w-full bg-sky-600 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3">Analyser le Projet <Sparkles size={16} /></button>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-8 animate-in zoom-in">
              <div className="text-xs text-sky-400 font-bold uppercase border-b border-white/10 pb-4">Analyse des données</div>
              <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{result}</div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest">Nouveau calcul</button>
                <button onClick={() => window.open(WHATSAPP_LINK)} className="flex-1 bg-sky-600 py-4 rounded-xl text-xs font-bold uppercase tracking-widest">Contacter l'Expert</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-extrabold mb-8 tracking-tight uppercase leading-tight">Ligne <br/><span className="text-sky-500">Directe</span></h2>
          <div className="space-y-8">
            {CONTACT_PHONES.map(p => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-3xl md:text-5xl font-black text-slate-200 hover:text-sky-500 transition-all tracking-tighter">{p}</a>
            ))}
          </div>
          <div className="mt-16 flex items-center gap-6 text-slate-500">
            <Globe size={24} className="text-sky-600" />
            <p className="text-xs font-bold uppercase tracking-[0.4em]">Opérations sur tout le Togo & Afrique de l'Ouest</p>
          </div>
        </div>
        <div className="glass-card p-10 rounded-[3rem]">
          <h3 className="text-lg font-bold mb-10 uppercase tracking-widest border-b border-white/5 pb-4">Formulaire d'audit</h3>
          <form className="space-y-8">
            <input type="text" placeholder="Nom Complet" className="w-full bg-transparent border-b border-white/10 p-4 outline-none focus:border-sky-500 text-sm font-medium transition-all" />
            <input type="text" placeholder="Contact Mobile / WhatsApp" className="w-full bg-transparent border-b border-white/10 p-4 outline-none focus:border-sky-500 text-sm font-medium transition-all" />
            <textarea placeholder="Description succincte de votre projet..." className="w-full bg-transparent border-b border-white/10 p-4 outline-none focus:border-sky-500 text-sm font-medium transition-all h-32 resize-none"></textarea>
            <button className="w-full bg-sky-600 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-sky-950 transition-all">Soumettre l'Audit</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const App = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <Expertise />
    <ProjectCalculator />
    <Contact />
    <AquaBot />
    <footer className="py-12 border-t border-white/5 text-center bg-slate-950">
      <p className="text-[10px] uppercase font-bold tracking-[0.8em] text-slate-600 italic">L'eau c'est la vie • 2025 {COMPANY_NAME}</p>
    </footer>
  </div>
);

// --- RENDER ---
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>);
