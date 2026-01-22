import React from 'react';
import { Droplets } from 'lucide-react';
import useStore from '../src/store/useStore';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { COMPANY_NAME } = useStore();
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 text-white py-20 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-12">
          <div className="bg-cyan-600 p-3 rounded-2xl" aria-hidden="true">
            <Droplets className="text-white w-8 h-8" />
          </div>
          <span className="font-black text-3xl tracking-tighter uppercase italic">{COMPANY_NAME}</span>
        </div>
        <p className="opacity-40 text-[10px] font-bold uppercase tracking-[0.5em]">
          {t("copyright", { year: new Date().getFullYear(), company: COMPANY_NAME })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;