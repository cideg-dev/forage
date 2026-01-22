// components/EnhancedGallery.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Données simulées pour la galerie
const galleryData = [
  {
    id: 1,
    type: 'beforeAfter',
    title: 'Projet de forage - Site Agoè',
    description: 'Comparaison avant/après du site de forage à Agoè-Nyivé',
    beforeImage: 'https://images.unsplash.com/photo-1625505826533-5c4a5cc36b6a?auto=format&fit=crop&w=800',
    afterImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800',
    location: 'Agoè-Nyivé, Lomé',
    date: '2024-02-15'
  },
  {
    id: 2,
    type: 'video',
    title: 'Installation de pompe immergée',
    description: 'Procédure d\'installation d\'une pompe immergée à 180m de profondeur',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800',
    location: 'Région des Savanes',
    date: '2024-01-22'
  },
  {
    id: 3,
    type: 'beforeAfter',
    title: 'Système d\'irrigation agricole',
    description: 'Avant/après du système d\'irrigation pour la ferme modèle',
    beforeImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800',
    afterImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800',
    location: 'Kara, Togo',
    date: '2024-02-05'
  },
  {
    id: 4,
    type: 'image',
    title: 'Équipe sur le terrain',
    description: 'Notre équipe en train d\'effectuer des tests de débit sur un nouveau forage',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800',
    location: 'Bassar, Kara',
    date: '2024-01-30'
  },
  {
    id: 5,
    type: 'video',
    title: 'Opération de maintenance',
    description: 'Procédure de maintenance préventive sur une station de pompage',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800',
    location: 'Sokodé, Togo',
    date: '2024-02-10'
  },
  {
    id: 6,
    type: 'beforeAfter',
    title: 'Station de pompage solaire',
    description: 'Installation d\'une station de pompage solaire - avant et après',
    beforeImage: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800',
    afterImage: 'https://images.unsplash.com/photo-1630098518861-72a9b2895a82?auto=format&fit=crop&w=800',
    location: 'Dapaong, Togo',
    date: '2024-01-15'
  }
];

const EnhancedGallery = () => {
  const { t } = useTranslation();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  // Filtrer les médias selon l'onglet actif
  const filteredMedia = activeTab === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.type === activeTab);

  const openModal = (media, index) => {
    setSelectedMedia(media);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    const nextIndex = (currentImageIndex + 1) % filteredMedia.length;
    setCurrentImageIndex(nextIndex);
    setSelectedMedia(filteredMedia[nextIndex]);
  };

  const prevMedia = () => {
    const prevIndex = (currentImageIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setCurrentImageIndex(prevIndex);
    setSelectedMedia(filteredMedia[prevIndex]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900" id="gallery">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">{t('gallery') || 'Galerie'}</h2>
          <h3 className="text-3xl font-black dark:text-white">{t('projectGallery') || 'Galerie de Projets'}</h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('galleryDescription') || 'Découvrez nos réalisations à travers des photos avant/après, des vidéos de nos opérations et des témoignages de nos clients.'}
          </p>
        </div>

        {/* Onglets de filtrage */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
            {[
              { key: 'all', label: t('all') || 'Tous' },
              { key: 'beforeAfter', label: t('beforeAfter') || 'Avant/Après' },
              { key: 'video', label: t('videos') || 'Vidéos' },
              { key: 'image', label: t('images') || 'Images' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2 rounded-md text-sm font-medium capitalize ${
                  activeTab === tab.key
                    ? 'bg-white dark:bg-slate-700 text-cyan-600 shadow'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de médias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedia.map((media, index) => (
            <div 
              key={media.id} 
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
              onClick={() => openModal(media, filteredMedia.findIndex(m => m.id === media.id))}
            >
              {media.type === 'beforeAfter' ? (
                <div className="relative aspect-square">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full overflow-hidden">
                      <LazyLoadImage 
                        src={media.beforeImage} 
                        alt={`${t('before')} - ${media.title}`} 
                        className="w-full h-full object-cover"
                        effect="blur"
                      />
                    </div>
                    <div className="w-1/2 h-full overflow-hidden">
                      <LazyLoadImage 
                        src={media.afterImage} 
                        alt={`${t('after')} - ${media.title}`} 
                        className="w-full h-full object-cover"
                        effect="blur"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <h4 className="font-bold text-white">{media.title}</h4>
                      <p className="text-sm text-slate-300">{media.location}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-cyan-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {t('beforeAfter') || 'Avant/Après'}
                  </div>
                </div>
              ) : media.type === 'video' ? (
                <div className="relative aspect-video">
                  <LazyLoadImage 
                    src={media.thumbnail} 
                    alt={media.title} 
                    className="w-full h-full object-cover"
                    effect="blur"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-white ml-1" size={24} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {t('video') || 'Vidéo'}
                  </div>
                </div>
              ) : (
                <div className="relative aspect-square">
                  <LazyLoadImage 
                    src={media.imageUrl} 
                    alt={media.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    effect="blur"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <h4 className="font-bold text-white">{media.title}</h4>
                      <p className="text-sm text-slate-300">{media.location}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-4">
                <h4 className="font-bold text-slate-800 dark:text-white line-clamp-1">{media.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{media.description}</p>
                <div className="flex justify-between items-center mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>{formatDate(media.date)}</span>
                  <span>{media.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal pour les médias */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl max-h-[90vh]">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
              >
                <X size={24} />
              </button>
              
              <button 
                onClick={prevMedia}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={nextMedia}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="bg-slate-800 rounded-xl overflow-hidden max-h-[80vh]">
                {selectedMedia.type === 'beforeAfter' ? (
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div>
                      <h3 className="text-white font-bold mb-2 text-center">{t('before') || 'Avant'}</h3>
                      <img 
                        src={selectedMedia.beforeImage} 
                        alt={`${t('before')} - ${selectedMedia.title}`} 
                        className="w-full h-96 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 text-center">{t('after') || 'Après'}</h3>
                      <img 
                        src={selectedMedia.afterImage} 
                        alt={`${t('after')} - ${selectedMedia.title}`} 
                        className="w-full h-96 object-contain"
                      />
                    </div>
                  </div>
                ) : selectedMedia.type === 'video' ? (
                  <div className="aspect-video">
                    <iframe
                      src={selectedMedia.videoUrl}
                      title={selectedMedia.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="p-4 flex justify-center">
                    <img 
                      src={selectedMedia.imageUrl} 
                      alt={selectedMedia.title} 
                      className="max-h-[70vh] object-contain"
                    />
                  </div>
                )}
                
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedMedia.title}</h3>
                  <p className="mb-4 opacity-90">{selectedMedia.description}</p>
                  <div className="flex justify-between text-sm opacity-75">
                    <span>{formatDate(selectedMedia.date)}</span>
                    <span>{selectedMedia.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EnhancedGallery;