
import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { COMPANY_NAME, SERVICES, PROJECTS, FAQ_DATA, CAREER_OPENINGS } from '../constants';

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
  category: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const query = searchQuery.toLowerCase();
      const results: SearchResult[] = [
        ...SERVICES.filter(s => s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query))
          .map(s => ({ title: s.title, snippet: s.description, link: '#services', category: 'Service' })),
        ...PROJECTS.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
          .map(p => ({ title: p.title, snippet: p.description, link: '#projets', category: 'Projet' })),
        ...FAQ_DATA.filter(f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query))
          .map(f => ({ title: f.question, snippet: f.answer, link: '#faq', category: 'FAQ' })),
        ...CAREER_OPENINGS.filter(c => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query))
          .map(c => ({ title: c.title, snippet: c.description, link: '#careers', category: 'Carrière' }))
      ];
      setSearchResults(results.slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`} aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-600 p-2 rounded-lg" aria-hidden="true">
              <Droplets className="text-white w-6 h-6" />
            </div>
            <span className={`font-bold text-lg hidden sm:block ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              {COMPANY_NAME}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#accueil" onClick={(e) => scrollToSection(e, 'accueil')} className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>Accueil</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>Services</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>À Propos</a>
            <a href="#projets" onClick={(e) => scrollToSection(e, 'projets')} className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>Projets</a>
            
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Rechercher sur le site"
                className={`p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none ${scrolled ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
              >
                <Search className="w-5 h-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in-95 border border-slate-100 dark:border-slate-700 overflow-hidden">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Rechercher services, FAQ, postes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white mb-2"
                  />
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {searchResults.length > 0 ? (
                      <div className="space-y-2 mt-2">
                        {searchResults.map((result, i) => (
                          <a 
                            key={i}
                            href={result.link}
                            onClick={(e) => {
                              scrollToSection(e, result.link);
                              setIsSearchOpen(false);
                            }}
                            className="block p-3 rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors group"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">{result.title}</span>
                              <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-md">{result.category}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{result.snippet}</p>
                          </a>
                        ))}
                      </div>
                    ) : searchQuery.length > 2 ? (
                      <p className="text-center py-4 text-sm text-slate-500">Aucun résultat trouvé pour "{searchQuery}"</p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={toggleTheme}
              aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
              className={`p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none ring-offset-2 ring-offset-white dark:ring-offset-slate-900">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-white/10 text-white'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={`p-2 rounded-xl focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none transition-colors ${scrolled ? 'bg-slate-50 dark:bg-slate-800' : 'bg-white/10'}`}
            >
              {isOpen ? <X className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'} />}
            </button>
          </div>
        </div>
      </div>

      {/* Improved Mobile Menu with smooth transition */}
      <div 
        id="mobile-menu" 
        className={`md:hidden fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white dark:bg-slate-900 z-40 transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <div className="flex flex-col p-6 gap-2">
          {['Accueil', 'Services', 'About', 'Projets', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => scrollToSection(e, item.toLowerCase())} 
              className="text-2xl font-black text-slate-900 dark:text-white py-4 border-b border-slate-100 dark:border-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {item === 'About' ? 'À Propos' : item}
            </a>
          ))}
          <div className="mt-8 p-8 bg-cyan-600 rounded-3xl text-white shadow-xl shadow-cyan-900/20">
            <h4 className="text-xl font-bold mb-2">Besoin d'aide ?</h4>
            <p className="opacity-90 mb-6">Nos experts sont à votre disposition pour toute étude de terrain.</p>
            <a href="tel:93445076" className="bg-white text-cyan-600 block text-center py-4 rounded-xl font-bold text-lg">Appeler le 93 44 50 76</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
