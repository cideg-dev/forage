
import React from 'react';
import { COMPANY_NAME, FULL_NAME, SLOGAN, CONTACT_PHONES } from '../constants';
import { Droplets, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-cyan-600 p-2 rounded-lg">
                <Droplets className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-xl tracking-tight uppercase">{COMPANY_NAME}</span>
            </div>
            <p className="text-slate-400 leading-relaxed italic">
              "{FULL_NAME}"
            </p>
            <p className="font-bold text-cyan-400 text-lg">{SLOGAN}</p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-600 transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-600 transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-600 transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-600 transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 pb-2 border-b-2 border-cyan-600 inline-block">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">Forages Mécaniques</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">Forages Industriels</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">Études Géophysiques</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">Maintenance Hydraulique</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">Formation Technique</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 pb-2 border-b-2 border-cyan-600 inline-block">Liens Utiles</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#accueil" className="hover:text-cyan-500 transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-cyan-500 transition-colors">À Propos</a></li>
              <li><a href="#contact" className="hover:text-cyan-500 transition-colors">Contact</a></li>
              <li><a href="#projets" className="hover:text-cyan-500 transition-colors">Réalisations</a></li>
              <li><a href="#" className="hover:text-cyan-500 transition-colors">Mentions Légales</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 pb-2 border-b-2 border-cyan-600 inline-block">Info Line</h4>
            <div className="space-y-4">
              {CONTACT_PHONES.map(phone => (
                <div key={phone} className="flex items-center gap-3 text-slate-400">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-500 border border-slate-700">
                    <span className="text-[10px] font-bold">TG</span>
                  </div>
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés. L'eau c'est la vie.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
