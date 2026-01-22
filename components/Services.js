import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { useTranslation } from 'react-i18next';
import ServiceRating from './ServiceRating';
import { getServiceAverageRating } from '../src/services/ratingService';

const Services = () => {
  const { t } = useTranslation();

  // Données des services avec traductions
  const SERVICES = [
    { id: 1, title: t("mechanicalDrilling"), description: t("mechanicalDrillingDesc"), icon: "🏗️" },
    { id: 2, title: t("industrialDrilling"), description: t("industrialDrillingDesc"), icon: "🏭" },
    { id: 3, title: t("wellDrilling"), description: t("wellDrillingDesc"), icon: "💧" },
    { id: 4, title: t("consulting"), description: t("consultingDesc"), icon: "⚙️" },
    { id: 5, title: t("equipmentAndPumping"), description: t("equipmentAndPumpingDesc"), icon: "🔧" },
    { id: 6, title: t("geophysicalResearch"), description: t("geophysicalResearchDesc"), icon: "🗺️" },
    { id: 7, title: t("plumbingAndDrainage"), description: t("plumbingAndDrainageDesc"), icon: "🧪" },
    { id: 8, title: t("hydraulicRepair"), description: t("hydraulicRepairDesc"), icon: "🌊" },
    { id: 9, title: t("technicalTraining"), description: t("technicalTrainingDesc"), icon: "🎓" }
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-950 scroll-mt-20" role="region" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-24">
          <div className="bg-red-600 text-white px-6 py-2 rounded-full inline-block font-black text-[10px] uppercase tracking-[0.3em] mb-6 italic">{t("catalogTitle")}</div>
          <h2 id="services-heading" className="text-5xl md:text-7xl font-black dark:text-white uppercase tracking-tighter italic leading-none">{t("expertise360")}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {SERVICES.map((s, i) => {
            const avgRating = getServiceAverageRating(s.id.toString());
            return (
              <ScrollReveal
                key={s.id}
                delay={i * 50}
                className="group bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border-2 border-transparent hover:border-cyan-600 transition-all duration-500 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-2"
                role="listitem"
              >
                <div className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm inline-block group-hover:bg-cyan-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                  <span className="text-4xl" aria-hidden="true">{s.icon}</span>
                </div>
                <h4 className="text-2xl font-black mb-4 dark:text-white uppercase tracking-tight italic group-hover:text-cyan-600 transition-colors leading-tight">{s.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{s.description}</p>

                {/* Affichage de la note moyenne */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {avgRating.average > 0 ? avgRating.average.toFixed(1) : 'N/A'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                      ({avgRating.count} {avgRating.count > 1 ? t('reviews') || 'évaluations' : t('review') || 'évaluation'})
                    </span>
                  </div>
                </div>

                {/* Composant de notation */}
                <ServiceRating serviceId={s.id.toString()} serviceName={s.title} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;