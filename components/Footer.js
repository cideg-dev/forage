import React from 'react';
import { COMPANY_NAME, FULL_NAME, SLOGAN, CONTACT_PHONES } from '../constants.js';
import { Droplets } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-8">
          <Droplets className="text-cyan-600" /> <span className="font-black text-xl">{COMPANY_NAME}</span>
        </div>
        <p className="text-slate-400 italic mb-4">"{FULL_NAME}"</p>
        <p className="font-bold text-cyan-400 mb-8">{SLOGAN}</p>
        <div className="border-t border-slate-800 pt-10 text-slate-500 text-sm">
           © {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;