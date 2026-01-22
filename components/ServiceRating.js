// components/ServiceRating.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Rating from './Rating';
import { submitRatingToBackend } from '../src/services/ratingService';

const ServiceRating = ({ serviceId, serviceName }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setSubmitError(t('ratingIsRequired') || 'Veuillez sélectionner une note');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const result = await submitRatingToBackend(serviceId, rating, comment);
      
      if (result.success) {
        setSubmitSuccess(true);
        setRating(0);
        setComment('');
        
        // Réinitialiser le succès après quelques secondes
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setSubmitError(result.error || 'Une erreur est survenue lors de la soumission de la notation');
      }
    } catch (error) {
      setSubmitError(error.message || 'Une erreur est survenue lors de la soumission de la notation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-white/10 dark:bg-slate-800/30 rounded-xl">
      <h4 className="font-bold mb-2">{t('rateThisService') || 'Notez ce service'}</h4>
      
      {submitSuccess && (
        <div className="mb-4 p-2 bg-green-600 text-white rounded text-sm">
          {t('ratingSubmittedSuccessfully') || 'Merci pour votre évaluation !'}
        </div>
      )}
      
      {submitError && (
        <div className="mb-4 p-2 bg-red-600 text-white rounded text-sm">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Rating 
            rating={rating} 
            onRatingChange={setRating} 
            label={t('yourRating') || 'Votre note:'} 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor={`comment-${serviceId}`} className="text-sm">
            {t('comments') || 'Commentaires (facultatif)'}
          </label>
          <textarea
            id={`comment-${serviceId}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 bg-white/5 border border-white/20 rounded text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            rows="2"
            placeholder={t('shareYourExperience') || 'Partagez votre expérience...'}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded text-sm font-medium ${
            isSubmitting 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-cyan-600 hover:bg-cyan-700'
          } text-white transition-colors`}
        >
          {isSubmitting 
            ? (t('submitting') || 'Envoi...') 
            : (t('submitRating') || 'Soumettre la note')}
        </button>
      </form>
    </div>
  );
};

export default ServiceRating;