// components/ServiceAreaMap.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from './ScrollReveal';

// Importer le CSS de Leaflet
import "leaflet/dist/leaflet.css";

// Définir une icône personnalisée pour les marqueurs
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Données des régions couvertes (coordonnées fictives pour l'exemple)
const SERVICE_REGIONS = [
  {
    id: 1,
    name: 'Région des Savanes',
    location: [9.5486, 0.8367], // Coordonnées approximatives
    description: 'Station de Pompage Solaire - Profondeur: 145m, Débit: 15 m3/h',
    projects: 15,
    successRate: '100%'
  },
  {
    id: 2,
    name: 'Port de Lomé',
    location: [6.1287, 1.2078], // Coordonnées approximatives
    description: 'Forage Industriel Portuaire - Profondeur: 210m, Débit: 45 m3/h',
    projects: 8,
    successRate: '98%'
  },
  {
    id: 3,
    name: 'Kpalimé',
    location: [7.6617, 1.1217], // Coordonnées approximatives
    description: 'Puits Communautaire - Profondeur: 85m, Débit: 5 m3/h',
    projects: 22,
    successRate: '100%'
  },
  {
    id: 4,
    name: 'Atakpamé',
    location: [7.5585, 1.1459], // Coordonnées approximatives
    description: 'Projet d\'approvisionnement en eau potable',
    projects: 12,
    successRate: '99%'
  },
  {
    id: 5,
    name: 'Bassar',
    location: [9.2852, 0.7937], // Coordonnées approximatives
    description: 'Forage pour irrigation agricole',
    projects: 7,
    successRate: '100%'
  }
];

const ServiceAreaMap = () => {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  // Centre approximatif du Togo
  const mapCenter = [8.6667, 1.1667];
  const zoomLevel = 7;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">{t('serviceAreas') || 'Régions desservies'}</h2>
          <h3 className="text-3xl font-black dark:text-white">{t('coverageMap') || 'Carte de Couverture'}</h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('coverageDescription') || 'Découvrez où nous avons réalisé des projets de forage et d\'hydraulique à travers le pays.'}
          </p>
        </ScrollReveal>

        <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] relative">
          <MapContainer 
            center={mapCenter} 
            zoom={zoomLevel} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <FeatureGroup>
              {SERVICE_REGIONS.map(region => (
                <Marker
                  key={region.id}
                  position={region.location}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedRegion(region);
                    },
                  }}
                >
                  <Popup>
                    <div className="font-bold">{region.name}</div>
                    <div className="text-sm">{region.description}</div>
                  </Popup>
                </Marker>
              ))}
            </FeatureGroup>
          </MapContainer>
          
          {/* Panneau d'information sur la région sélectionnée */}
          {selectedRegion && (
            <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg max-w-xs z-[1000]">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg text-cyan-600">{selectedRegion.name}</h4>
                <button 
                  onClick={() => setSelectedRegion(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{selectedRegion.description}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-cyan-50 dark:bg-slate-700 p-2 rounded">
                  <span className="font-bold">{selectedRegion.projects}</span>
                  <div className="text-cyan-600">{t('projectsCompleted') || 'Projets réalisés'}</div>
                </div>
                <div className="bg-green-50 dark:bg-slate-700 p-2 rounded">
                  <span className="font-bold">{selectedRegion.successRate}</span>
                  <div className="text-green-600">{t('successRate') || 'Taux de réussite'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Légende et informations additionnelles */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
            <h4 className="font-bold text-cyan-600 mb-2">{t('totalRegions') || 'Régions couvertes'}</h4>
            <p className="text-3xl font-black text-slate-800 dark:text-white">15+</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{t('coverageExplanation') || 'Nous desservons plus de 15 régions à travers le pays.'}</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
            <h4 className="font-bold text-cyan-600 mb-2">{t('totalProjects') || 'Projets réalisés'}</h4>
            <p className="text-3xl font-black text-slate-800 dark:text-white">500+</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{t('projectsExplanation') || 'Plus de 500 projets de forage et d\'hydraulique réalisés avec succès.'}</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow">
            <h4 className="font-bold text-cyan-600 mb-2">{t('successRate') || 'Taux de réussite'}</h4>
            <p className="text-3xl font-black text-slate-800 dark:text-white">98%</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{t('successExplanation') || 'Un taux de réussite exceptionnel grâce à notre expertise.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;