// components/ProjectStatusCard.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProjectStatusCard = ({ project, onClick }) => {
  const { t } = useTranslation();
  
  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'near-completion':
        return 'bg-blue-500';
      case 'on-hold':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed':
        return t('completed') || 'Terminé';
      case 'in-progress':
        return t('inProgress') || 'En cours';
      case 'near-completion':
        return t('nearCompletion') || 'Bientôt terminé';
      case 'on-hold':
        return t('onHold') || 'En attente';
      default:
        return t('unknown') || 'Inconnu';
    }
  };

  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white truncate">
              {project.projectName}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
              {project.clientName}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(project.status)}`}>
            {getStatusLabel(project.status)}
          </span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 dark:text-slate-400">{t('progress') || 'Progression'}</span>
            <span className="font-bold text-slate-800 dark:text-white">{project.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-cyan-600" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-slate-500 dark:text-slate-400">{t('location') || 'Lieu'}:</span>
            <p className="truncate text-slate-800 dark:text-slate-200">{project.location}</p>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">{t('depth') || 'Profondeur'}:</span>
            <p className="text-slate-800 dark:text-slate-200">{project.depth}</p>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">{t('startDate') || 'Début'}:</span>
            <p className="text-slate-800 dark:text-slate-200">
              {new Date(project.startDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div>
            <span className="text-slate-500 dark:text-slate-400">{t('estimatedCompletion') || 'Fin estimée'}:</span>
            <p className="text-slate-800 dark:text-slate-200">
              {new Date(project.estimatedCompletion).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-600 mr-2"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('currentPhase') || 'Phase actuelle'}: 
              <span className="capitalize ml-1 font-bold">
                {t(project.currentPhase) || project.currentPhase}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusCard;