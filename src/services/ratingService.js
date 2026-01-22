// services/ratingService.js
// Simuler un service backend pour la gestion des notations
const ratingsStorageKey = 'serviceRatings';

// Obtenir les notations stockées localement
export const getStoredRatings = () => {
  try {
    const stored = localStorage.getItem(ratingsStorageKey);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Erreur lors de la récupération des notations:', error);
    return {};
  }
};

// Sauvegarder les notations localement
export const saveRating = (serviceId, rating, comment = '') => {
  try {
    const ratings = getStoredRatings();
    const serviceRatings = ratings[serviceId] || [];
    
    // Ajouter la nouvelle notation
    serviceRatings.push({
      id: Date.now(), // ID unique basé sur le timestamp
      rating,
      comment,
      date: new Date().toISOString()
    });
    
    ratings[serviceId] = serviceRatings;
    localStorage.setItem(ratingsStorageKey, JSON.stringify(ratings));
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la notation:', error);
    return { success: false, error: error.message };
  }
};

// Obtenir la moyenne des notations pour un service
export const getServiceAverageRating = (serviceId) => {
  const ratings = getStoredRatings();
  const serviceRatings = ratings[serviceId] || [];
  
  if (serviceRatings.length === 0) {
    return { average: 0, count: 0 };
  }
  
  const sum = serviceRatings.reduce((total, rating) => total + rating.rating, 0);
  const average = sum / serviceRatings.length;
  
  return {
    average: Math.round(average * 10) / 10, // Arrondir à une décimale
    count: serviceRatings.length
  };
};

// Obtenir toutes les notations pour un service
export const getServiceRatings = (serviceId) => {
  const ratings = getStoredRatings();
  return ratings[serviceId] || [];
};

// Soumettre une notation vers un backend (simulation)
export const submitRatingToBackend = async (serviceId, rating, comment = '') => {
  // Ceci est une simulation - dans une application réelle, vous enverriez cette requête à votre backend
  try {
    // Sauvegarder localement
    const saveResult = saveRating(serviceId, rating, comment);
    
    if (!saveResult.success) {
      throw new Error(saveResult.error || 'Erreur lors de la sauvegarde de la notation');
    }
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 500)); // Délai de simulation
    
    // Dans une application réelle, vous feriez un appel API ici:
    /*
    const response = await fetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId,
        rating,
        comment,
        userId: 'current-user-id' // à remplacer par l'ID réel de l'utilisateur
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    
    const result = await response.json();
    return { success: true, data: result };
    */
    
    return { success: true, data: { serviceId, rating, comment } };
  } catch (error) {
    console.error('Erreur lors de la soumission de la notation:', error);
    return { success: false, error: error.message };
  }
};