import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Menu, X, Moon, Sun, Search } from 'lucide-react';
import { COMPANY_NAME, SERVICES, PROJECTS, FAQ_DATA, CAREER_OPENINGS } from '../constants.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const query = searchQuery.toLowerCase();
      const results = [
        ...SERVICES.filter(s => s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query))
          .map(s => ({ title: s.title, snippet: s.description, link: 'services', category: 'Service' })),
        ...PROJECTS.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
          .map(p => ({ title: p.title, snippet: p.description, link: 'projets', category: 'Projet' })),
        ...FAQ_DATA.filter(f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query))
          .map(f => ({ title: f.question, snippet: f.answer, link: 'faq', category: 'FAQ' })),
        ...CAREER_OPENINGS.filter(c => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query))
          .map(c => ({ title: c.title, snippet: c.description, link: 'careers', category: 'Carrière' }))
      ];
      setSearchResults(results.slice(0, 6));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('accueil')}>
            <div className="bg-cyan-600 p-2 rounded-lg">
              <Droplets className="text-white w-6 h-6" />
            </div>
            <span className={`font-bold text-lg hidden sm:block ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
              {COMPANY_NAME}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['Accueil', 'Services', 'About', 'Projets'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium hover:text-cyan-600 transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'}`}
              >
                {item === 'About' ? 'À Propos' : item}
              </button>
            ))}
            
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${scrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={() => scrollToSection('contact')} className="bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold">
              Contact
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
             <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl ${scrolled ? 'bg-slate-50 dark:bg-slate-800' : 'bg-white/10'}`}
            >
              {isOpen ? <X className="text-white" /> : <Menu className={scrolled ? 'text-slate-900 dark:text-white' : 'text-white'} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;