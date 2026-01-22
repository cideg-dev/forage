// components/CostCalculator.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Droplets, Calculator, RotateCcw } from 'lucide-react';

const CostCalculator = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    projectType: 'well-drilling',
    depth: 100,
    diameter: 6,
    pumpType: 'submersible',
    equipmentPackage: 'standard',
    locationFactor: 'urban',
    urgency: 'normal'
  });
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Prix de base par type de projet
  const basePrices = {
    'well-drilling': 150, // par mètre
    'industrial-drilling': 250, // par mètre
    'geophysical-study': 5000, // forfaitaire
    'pump-installation': 1200, // forfaitaire
    'maintenance': 800 // forfaitaire
  };

  // Facteurs multiplicateurs
  const factors = {
    diameter: {
      4: 0.8,
      6: 1,
      8: 1.3,
      10: 1.6,
      12: 2.0
    },
    pumpType: {
      'surface': 1,
      'submersible': 1.4,
      'solar': 1.8,
      'variable-speed': 1.6
    },
    equipmentPackage: {
      'basic': 1,
      'standard': 1.3,
      'premium': 1.8,
      'enterprise': 2.5
    },
    locationFactor: {
      'urban': 1,
      'rural': 1.2,
      'remote': 1.6,
      'mountain': 1.8
    },
    urgency: {
      'normal': 1,
      'urgent': 1.4,
      'emergency': 2.0
    }
  };

  const calculateCost = () => {
    let cost = 0;

    if (formData.projectType === 'geophysical-study' || 
        formData.projectType === 'pump-installation' || 
        formData.projectType === 'maintenance') {
      // Pour ces types de projet, le coût est forfaitaire
      cost = basePrices[formData.projectType];
    } else {
      // Pour les forages, le coût dépend de la profondeur
      cost = basePrices[formData.projectType] * formData.depth;
    }

    // Appliquer les facteurs multiplicateurs
    if (formData.projectType !== 'geophysical-study' && 
        formData.projectType !== 'pump-installation' && 
        formData.projectType !== 'maintenance') {
      cost *= factors.diameter[formData.diameter] || 1;
    }
    
    cost *= factors.pumpType[formData.pumpType] || 1;
    cost *= factors.equipmentPackage[formData.equipmentPackage] || 1;
    cost *= factors.locationFactor[formData.locationFactor] || 1;
    cost *= factors.urgency[formData.urgency] || 1;

    // Ajouter des frais fixes
    cost += 25000; // Frais de déplacement et d'installation

    setResult({
      baseCost: basePrices[formData.projectType],
      calculatedCost: parseFloat(cost.toFixed(2)),
      breakdown: {
        base: basePrices[formData.projectType],
        depth: formData.projectType !== 'geophysical-study' && 
                formData.projectType !== 'pump-installation' && 
                formData.projectType !== 'maintenance' ? 
                basePrices[formData.projectType] * formData.depth : basePrices[formData.projectType],
        diameter: factors.diameter[formData.diameter] || 1,
        pumpType: factors.pumpType[formData.pumpType] || 1,
        equipmentPackage: factors.equipmentPackage[formData.equipmentPackage] || 1,
        locationFactor: factors.locationFactor[formData.locationFactor] || 1,
        urgency: factors.urgency[formData.urgency] || 1,
        fixedFees: 25000
      }
    });
    
    setShowResult(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetCalculator = () => {
    setFormData({
      projectType: 'well-drilling',
      depth: 100,
      diameter: 6,
      pumpType: 'submersible',
      equipmentPackage: 'standard',
      locationFactor: 'urban',
      urgency: 'normal'
    });
    setResult(null);
    setShowResult(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-TG', { 
      style: 'currency', 
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-slate-900 dark:to-slate-800" id="cost-calculator">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="mx-auto bg-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Calculator className="text-white w-8 h-8" />
          </div>
          <h2 className="text-cyan-600 font-bold uppercase mb-4">{t('costCalculator') || 'Calculateur de Coût'}</h2>
          <h3 className="text-3xl font-black dark:text-white">{t('calculateProjectCost') || 'Calculez le coût de votre projet'}</h3>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('costCalculatorDescription') || 'Estimez le coût approximatif de votre projet de forage ou d\'installation hydraulique en quelques étapes simples.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">
            <h4 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">{t('projectDetails') || 'Détails du projet'}</h4>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('projectType') || 'Type de projet'}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                >
                  <option value="well-drilling">{t('wellDrilling') || 'Forage de puits'}</option>
                  <option value="industrial-drilling">{t('industrialDrilling') || 'Forage industriel'}</option>
                  <option value="geophysical-study">{t('geophysicalStudy') || 'Étude géophysique'}</option>
                  <option value="pump-installation">{t('pumpInstallation') || 'Installation de pompe'}</option>
                  <option value="maintenance">{t('maintenance') || 'Maintenance'}</option>
                </select>
              </div>
              
              {(formData.projectType === 'well-drilling' || formData.projectType === 'industrial-drilling') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t('depth') || 'Profondeur (mètres)'}
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="10"
                        max="500"
                        value={formData.depth}
                        onChange={(e) => handleInputChange('depth', parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-4 w-16 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 rounded-md">
                        {formData.depth}m
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t('diameter') || 'Diamètre (pouces)'}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[4, 6, 8, 10, 12].map(dia => (
                        <button
                          key={dia}
                          type="button"
                          onClick={() => handleInputChange('diameter', dia)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium ${
                            formData.diameter === dia
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          {dia}"
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('pumpType') || 'Type de pompe'}
                </label>
                <select
                  value={formData.pumpType}
                  onChange={(e) => handleInputChange('pumpType', e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                >
                  <option value="surface">{t('surfacePump') || 'Pompe de surface'}</option>
                  <option value="submersible">{t('submersiblePump') || 'Pompe immergée'}</option>
                  <option value="solar">{t('solarPump') || 'Pompe solaire'}</option>
                  <option value="variable-speed">{t('variableSpeedPump') || 'Pompe à vitesse variable'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('equipmentPackage') || 'Pack d\'équipement'}
                </label>
                <select
                  value={formData.equipmentPackage}
                  onChange={(e) => handleInputChange('equipmentPackage', e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                >
                  <option value="basic">{t('basic') || 'Basique'}</option>
                  <option value="standard">{t('standard') || 'Standard'}</option>
                  <option value="premium">{t('premium') || 'Premium'}</option>
                  <option value="enterprise">{t('enterprise') || 'Entreprise'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('location') || 'Localisation'}
                </label>
                <select
                  value={formData.locationFactor}
                  onChange={(e) => handleInputChange('locationFactor', e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                >
                  <option value="urban">{t('urban') || 'Urbain'}</option>
                  <option value="rural">{t('rural') || 'Rural'}</option>
                  <option value="remote">{t('remote') || 'Éloigné'}</option>
                  <option value="mountain">{t('mountain') || 'Montagneux'}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('urgency') || 'Urgence'}
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-800 dark:text-white"
                >
                  <option value="normal">{t('normal') || 'Normal'}</option>
                  <option value="urgent">{t('urgent') || 'Urgent'}</option>
                  <option value="emergency">{t('emergency') || 'Urgence'}</option>
                </select>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  onClick={calculateCost}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  {t('calculate') || 'Calculer'}
                </button>
                
                <button
                  onClick={resetCalculator}
                  className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  {t('reset') || 'Réinitialiser'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white">
            <h4 className="text-xl font-bold mb-6">{t('costEstimation') || 'Estimation de coût'}</h4>
            
            {!showResult ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <Droplets className="w-16 h-16 opacity-80 mb-6" />
                <h5 className="text-2xl font-bold mb-2">{t('enterProjectDetails') || 'Entrez les détails de votre projet'}</h5>
                <p className="opacity-80">
                  {t('calculatorInstructions') || 'Remplissez les détails de votre projet pour obtenir une estimation précise du coût.'}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <div className="text-5xl font-black mb-2">{formatCurrency(result.calculatedCost)}</div>
                  <p className="opacity-90">{t('estimatedTotalCost') || 'Coût total estimé'}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-cyan-500/30">
                    <span>{t('baseCost') || 'Coût de base'}</span>
                    <span className="font-bold">{formatCurrency(result.breakdown.base * (formData.projectType !== 'geophysical-study' && formData.projectType !== 'pump-installation' && formData.projectType !== 'maintenance' ? formData.depth : 1))}</span>
                  </div>
                  
                  {formData.projectType !== 'geophysical-study' && 
                   formData.projectType !== 'pump-installation' && 
                   formData.projectType !== 'maintenance' && (
                    <div className="flex justify-between items-center pb-2 border-b border-cyan-500/30">
                      <span>{t('diameterMultiplier') || 'Multiplicateur de diamètre'}</span>
                      <span className="font-bold">×{result.breakdown.diameter}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pb-2 border-b border-cyan-500/30">
                    <span>{t('pumpTypeMultiplier') || 'Multiplicateur de pompe'}</span>
                    <span className="font-bold">×{result.breakdown.pumpType}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-cyan-500/30">
                    <span>{t('equipmentPackageMultiplier') || 'Multiplicateur d\'équipement'}</span>
                    <span className="font-bold">×{result.breakdown.equipmentPackage}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-cyan-500/30">
                    <span>{t('locationMultiplier') || 'Multiplicateur de localisation'}</span>
                    <span className="font-bold">×{result.breakdown.locationFactor}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-cyan-500/30">
                    <span>{t('urgencyMultiplier') || 'Multiplicateur d\'urgence'}</span>
                    <span className="font-bold">×{result.breakdown.urgency}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-cyan-500/30">
                    <span>{t('fixedFees') || 'Frais fixes'}</span>
                    <span className="font-bold">{formatCurrency(result.breakdown.fixedFees)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-cyan-500/50">
                    <span className="text-lg font-bold">{t('total') || 'Total'}</span>
                    <span className="text-2xl font-black">{formatCurrency(result.calculatedCost)}</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-black/20 rounded-lg">
                  <p className="text-sm opacity-80">
                    <strong>{t('note') || 'Note'}:</strong> {t('costEstimationDisclaimer') || 'Cette estimation est fournie à titre indicatif. Le coût final peut varier en fonction des conditions réelles sur site et d\'autres facteurs spécifiques à votre projet.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;