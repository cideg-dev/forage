// components/ProjectFilter.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProjectFilter = ({ filters, onFilterChange, projects }) => {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(filters);

  // Extraire les clients uniques pour le filtre
  const uniqueClients = [...new Set(projects.map(project => project.clientName))];

  const handleChange = (filterType, value) => {
    const updatedFilters = {
      ...localFilters,
      [filterType]: value
    };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: 'all',
      client: '',
      dateRange: { start: '', end: '' }
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('status') || 'Statut'}
          </label>
          <select
            value={localFilters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
          >
            <option value="all">{t('all') || 'Tous'}</option>
            <option value="in-progress">{t('inProgress') || 'En cours'}</option>
            <option value="near-completion">{t('nearCompletion') || 'Bientôt terminé'}</option>
            <option value="completed">{t('completed') || 'Terminé'}</option>
            <option value="on-hold">{t('onHold') || 'En attente'}</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('client') || 'Client'}
          </label>
          <input
            type="text"
            value={localFilters.client}
            onChange={(e) => handleChange('client', e.target.value)}
            placeholder={t('searchClient') || 'Rechercher un client...'}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
            list="clients-list"
          />
          <datalist id="clients-list">
            {uniqueClients.map((client, index) => (
              <option key={index} value={client} />
            ))}
          </datalist>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('startDate') || 'Date de début'}
          </label>
          <input
            type="date"
            value={localFilters.dateRange.start}
            onChange={(e) => handleChange('dateRange', { ...localFilters.dateRange, start: e.target.value })}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('endDate') || 'Date de fin'}
          </label>
          <input
            type="date"
            value={localFilters.dateRange.end}
            onChange={(e) => handleChange('dateRange', { ...localFilters.dateRange, end: e.target.value })}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg transition-colors"
        >
          {t('resetFilters') || 'Réinitialiser'}
        </button>
      </div>
    </div>
  );
};

export default ProjectFilter;