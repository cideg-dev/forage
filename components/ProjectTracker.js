// components/ProjectTracker.js
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectStatusCard from './ProjectStatusCard';
import ProjectFilter from './ProjectFilter';

// Données simulées pour les projets clients
const mockProjects = [
  {
    id: 1,
    clientName: "Mairie de Lomé",
    projectName: "Forage Municipal - Quartier Agoè",
    projectCode: "FOR-2024-001",
    startDate: "2024-01-15",
    estimatedCompletion: "2024-03-30",
    currentPhase: "drilling",
    progress: 65,
    location: "Agoè-Nyivé, Lomé",
    depth: "180m",
    status: "in-progress",
    updates: [
      {
        date: "2024-02-20",
        status: "drilling",
        description: "Début du forage à 180m de profondeur. Progression: 65%",
        documents: ["rapport-journalier-20.pdf"]
      },
      {
        date: "2024-02-15",
        status: "planning",
        description: "Validation du plan de forage et préparation du site",
        documents: ["plan-site.pdf", "rapport-preparation.docx"]
      },
      {
        date: "2024-02-10",
        status: "site-preparation",
        description: "Arrivée sur site et préparation des équipements",
        documents: ["photos-preparation.zip"]
      }
    ]
  },
  {
    id: 2,
    clientName: "Société Agro-Industrielle du Togo",
    projectName: "Système d'Irrigation Agricole",
    projectCode: "IRR-2024-002",
    startDate: "2024-02-01",
    estimatedCompletion: "2024-05-15",
    currentPhase: "installation",
    progress: 40,
    location: "Région des Savanes",
    depth: "120m",
    status: "in-progress",
    updates: [
      {
        date: "2024-02-22",
        status: "installation",
        description: "Installation des tuyauteries et pompes. Progression: 40%",
        documents: ["rapport-installation-22.pdf"]
      },
      {
        date: "2024-02-18",
        status: "drilling",
        description: "Forage terminé à 120m. Test de débit positif",
        documents: ["rapport-forage.pdf", "test-debit.xlsx"]
      }
    ]
  },
  {
    id: 3,
    clientName: "Hôtel du Lac",
    projectName: "Installation de Pompe et Traitement d'Eau",
    projectCode: "HOT-2024-003",
    startDate: "2024-01-20",
    estimatedCompletion: "2024-03-10",
    currentPhase: "testing",
    progress: 90,
    location: "Bassar, Kara",
    depth: "95m",
    status: "near-completion",
    updates: [
      {
        date: "2024-02-25",
        status: "testing",
        description: "Tests finaux en cours. Prêt pour la livraison. Progression: 90%",
        documents: ["rapport-tests.pdf"]
      },
      {
        date: "2024-02-20",
        status: "equipment-installation",
        description: "Installation de la pompe et du système de traitement terminée",
        documents: ["installation-pompe.pdf"]
      }
    ]
  }
];

const ProjectTracker = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    client: '',
    dateRange: { start: '', end: '' }
  });

  // Filtrer les projets en fonction des critères
  useEffect(() => {
    let result = [...projects];
    
    if (filters.status !== 'all') {
      result = result.filter(project => project.status === filters.status);
    }
    
    if (filters.client) {
      result = result.filter(project => 
        project.clientName.toLowerCase().includes(filters.client.toLowerCase()) ||
        project.projectName.toLowerCase().includes(filters.client.toLowerCase())
      );
    }
    
    if (filters.dateRange.start) {
      result = result.filter(project => 
        new Date(project.startDate) >= new Date(filters.dateRange.start)
      );
    }
    
    if (filters.dateRange.end) {
      result = result.filter(project => 
        new Date(project.estimatedCompletion) <= new Date(filters.dateRange.end)
      );
    }
    
    setFilteredProjects(result);
  }, [filters, projects]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900" id="project-tracker">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold uppercase mb-4">{t('projectTracking') || 'Suivi de Projet'}</h2>
          <h3 className="text-3xl font-black dark:text-white">{t('trackYourProjects') || 'Suivez vos projets en temps réel'}</h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('projectTrackerDescription') || 'Consultez l\'état d\'avancement de vos projets de forage et d\'hydraulique en temps réel.'}
          </p>
        </div>

        <ProjectFilter 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          projects={projects}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProjects.map(project => (
            <ProjectStatusCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {t('noProjectsFound') || 'Aucun projet trouvé'}
            </p>
          </div>
        )}

        {/* Modal pour les détails du projet */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                  {selectedProject.projectName}
                </h3>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">{t('client') || 'Client'}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{selectedProject.clientName}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">{t('projectCode') || 'Code du projet'}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{selectedProject.projectCode}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">{t('location') || 'Emplacement'}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{selectedProject.location}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">{t('depth') || 'Profondeur'}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{selectedProject.depth}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">{t('startDate') || 'Date de début'}</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {new Date(selectedProject.startDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">{t('estimatedCompletion') || 'Fin estimée'}</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {new Date(selectedProject.estimatedCompletion).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4">{t('progress') || 'Progression'}</h4>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                    <div 
                      className="bg-cyan-600 h-4 rounded-full" 
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {selectedProject.progress}% {t('completed') || 'complété'}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4">{t('recentUpdates') || 'Mises à jour récentes'}</h4>
                  <div className="space-y-4">
                    {selectedProject.updates.map((update, index) => (
                      <div key={index} className="border-l-4 border-cyan-600 pl-4 py-2 bg-slate-50 dark:bg-slate-700/50 rounded">
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {new Date(update.date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 text-xs rounded">
                            {update.status}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">{update.description}</p>
                        {update.documents && update.documents.length > 0 && (
                          <div className="mt-2">
                            <span className="text-sm text-slate-500 dark:text-slate-400">{t('documents') || 'Documents'}:</span>
                            <ul className="list-disc list-inside mt-1">
                              {update.documents.map((doc, docIndex) => (
                                <li key={docIndex} className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline">
                                  <a href="#" onClick={(e) => e.preventDefault()}>
                                    {doc}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
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

export default ProjectTracker;