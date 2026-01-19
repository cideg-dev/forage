
import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { COMPANY_NAME, SERVICES, PROJECTS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{title: string, link: string}[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = [
        ...SERVICES.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())).map(s => ({ title: s.title, link: '#services' })),
        ...PROJECTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ title: p.title, link: '#projets' }))
      ];
      setSearchResults(results.slice(0, 5));
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white dark:bg-slate-900 shadow-md py-2' : 'bg-transparent py-4'}`} aria-label="Navigation principale">
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
            <a href="#accueil" className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>Accueil</a>
            <a href="#services" className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>Services</a>
            <a href="#about" className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>À Propos</a>
            <a href="#projets" className={`font-medium hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 rounded-sm ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}>Projets</a>
            
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Rechercher sur le site"
                className={`p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white hover:bg-white/10'}`}
              >
                <Search className="w-5 h-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 md:w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in-95 border border-slate-100 dark:border-slate-700">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
                  />
                  {searchResults.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {searchResults.map((result, i) => (
                        <a 
                          key={i}
                          href={result.link}
                          onClick={() => setIsSearchOpen(false)}
                          className="block p-2 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                          {result.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              onClick={toggleTheme}
              aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
              className={`p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-white/10 text-white'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a href="#contact" className="bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-cyan-700 transition-all shadow-lg hover:shadow-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none ring-offset-2 ring-offset-white dark:ring-offset-slate-900">
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
              className={`p-1 rounded-md focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none`}
            >
              {isOpen ? <X className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white dark:bg-slate-900 shadow-xl absolute top-full left-0 w-full p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <a href="#accueil" onClick={() => setIsOpen(false)} className="text-slate-800 dark:text-slate-100 font-medium py-2 border-b border-slate-100 dark:border-slate-800">Accueil</a>
          <a href="#services" onClick={() => setIsOpen(false)} className="text-slate-800 dark:text-slate-100 font-medium py-2 border-b border-slate-100 dark:border-slate-800">Services</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="text-slate-800 dark:text-slate-100 font-medium py-2 border-b border-slate-100 dark:border-slate-800">À Propos</a>
          <a href="#projets" onClick={() => setIsOpen(false)} className="text-slate-800 dark:text-slate-100 font-medium py-2 border-b border-slate-100 dark:border-slate-800">Projets</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-cyan-600 text-white text-center px-5 py-3 rounded-lg font-semibold mt-2">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
