import React from 'react';
import { Droplets, Moon, Sun, Menu, X } from 'lucide-react';
import useStore from '../src/store/useStore';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ isDark, toggleTheme, scrollTo }) => {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, WHATSAPP_LINK } = useStore();
  const { t } = useTranslation();

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-4 border-b-2 border-red-600" role="navigation" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:z-50">
          Aller au contenu principal
        </a>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('accueil')} tabIndex="0" onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollTo('accueil');
          }
        }}>
          <div className="bg-cyan-600 p-2 rounded-xl shadow-lg">
            <Droplets className="text-white" aria-hidden="true" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-xl tracking-tighter dark:text-white">DOCTEUR DES PROFONDEURS</span>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest italic">Expert Hydraulique</span>
          </div>
        </div>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {[t('services'), t('projects'), t('contact')].map(item => (
            <button
              key={item}
              onClick={() => {
                // Mapper les traductions aux IDs originaux
                const idMap = { [t('services')]: 'services', [t('projects')]: 'projets', [t('contact')]: 'contact' };
                scrollTo(idMap[item]);
              }}
              className="font-black text-[11px] uppercase tracking-widest hover:text-red-600 transition-colors dark:text-slate-300"
              aria-label={item}
            >
              {item}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white"
            aria-label={isDark ? t('switchToLightMode') || 'Passer en mode clair' : t('switchToDarkMode') || 'Passer en mode sombre'}
          >
            {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <LanguageSwitcher />
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-red-600/20"
            aria-label={t('quickQuote')}
          >
            {t('quickQuote')}
          </a>
        </div>

        {/* Menu mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? t('closeMenu') || 'Fermer le menu' : t('openMenu') || 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile ouvert */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white dark:bg-slate-900 p-4 mt-2 rounded-lg shadow-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col gap-4">
            {[t('services'), t('projects'), t('contact')].map(item => (
              <button
                key={item}
                onClick={() => {
                  // Mapper les traductions aux IDs originaux
                  const idMap = { [t('services')]: 'services', [t('projects')]: 'projets', [t('contact')]: 'contact' };
                  scrollTo(idMap[item]);
                  closeMobileMenu();
                }}
                className="font-black text-[11px] uppercase tracking-widest hover:text-red-600 transition-colors dark:text-slate-300 py-2 w-full text-left"
                aria-label={item}
              >
                {item}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white w-fit"
              aria-label={isDark ? t('switchToLightMode') || 'Passer en mode clair' : t('switchToDarkMode') || 'Passer en mode sombre'}
            >
              {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
            <LanguageSwitcher />
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              className="bg-red-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-red-600/20 w-fit"
              aria-label={t('quickQuote')}
            >
              {t('quickQuote')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;