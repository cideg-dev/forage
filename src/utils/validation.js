// utils/validation.js
export const validateForm = (formData) => {
  const errors = {};

  // Validation du nom
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Le nom est requis';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }

  // Validation du contact (téléphone/WhatsApp)
  if (!formData.contact || formData.contact.trim() === '') {
    errors.contact = 'Le numéro de contact est requis';
  } else {
    // Vérifier si c'est un numéro de téléphone valide (format international)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.contact.replace(/[\s\-\(\)]/g, ''))) {
      errors.contact = 'Numéro de téléphone invalide';
    }
  }

  // Validation du message
  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Le message est requis';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Fonction pour nettoyer les données du formulaire
export const sanitizeFormData = (formData) => {
  return {
    name: formData.name?.trim() || '',
    contact: formData.contact?.replace(/[\s\-\(\)]/g, '') || '',
    subject: formData.subject || 'Demande de devis forage',
    message: formData.message?.trim() || ''
  };
};