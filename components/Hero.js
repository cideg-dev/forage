import React from 'react';
import { Droplets, ArrowRight, Phone } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Hero = ({ scrollTo }) => {
  const { t } = useTranslation();

  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden" role="banner" aria-label={t('home')}>
      <div className="absolute inset-0 z-0 scale-105">
        <LazyLoadImage
          src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1920"
          className="w-full h-full object-cover opacity-30 blur-[2px] dark:opacity-20"
          alt=""
          effect="blur"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full" id="main-content">
        <ScrollReveal className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-20 bg-red-600" aria-hidden="true"></div>
            <span className="font-black uppercase tracking-[0.4em] text-xs text-slate-500 dark:text-slate-400">{t('leaderInTogo')}</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-950 dark:text-white mb-8 leading-[0.8] tracking-tighter uppercase italic" tabIndex="0">
            {t('forceOfWater')}
          </h1>
          <p className="text-xl md:text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-6 tracking-tight uppercase">{t('companyFullName')}</p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl leading-relaxed font-medium">
            {t('heroDescription')}
          </p>
          <div className="flex flex-wrap gap-6">
            <button
              onClick={() => scrollTo('services')}
              className="group bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-red-600 hover:dark:bg-red-600 hover:text-white shadow-2xl flex items-center gap-4"
              aria-label={t('ourServices')}
            >
              {t('ourServices')} <ArrowRight className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
            </button>
            <a
              href="tel:93445076"
              className="flex items-center gap-4 bg-white dark:bg-slate-900 px-8 py-6 rounded-2xl border-2 dark:border-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={`${t('callUs')} 93 44 50 76`}
            >
              <Phone className="text-red-600" aria-hidden="true" />
              <span className="font-black text-xl dark:text-white tracking-tighter">{t('callUs')}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Floating Water Effect Overlay */}
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>
    </section>
  );
};

export default Hero;