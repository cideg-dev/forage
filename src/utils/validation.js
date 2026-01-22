// utils/validation.js
export const validateForm = (formData) => {
  const errors = {};

  // Validation du nom
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Le nom est requis';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/.test(formData.name.trim())) {
    errors.name = 'Le nom ne doit contenir que des lettres, espaces, traits d\'union et apostrophes';
  }

  // Validation du contact (téléphone/WhatsApp)
  if (!formData.contact || formData.contact.trim() === '') {
    errors.contact = 'Le numéro de contact est requis';
  } else {
    // Vérifier si c'est un numéro de téléphone ou une adresse e-mail
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const cleanedContact = formData.contact.replace(/[\s\-\(\)]/g, '');

    if (!phoneRegex.test(cleanedContact) && !emailRegex.test(formData.contact.trim())) {
      errors.contact = 'Veuillez fournir un numéro de téléphone ou une adresse e-mail valide';
    }
  }

  // Validation du message
  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Le message est requis';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  } else if (formData.message.trim().length > 1000) {
    errors.message = 'Le message est trop long (maximum 1000 caractères)';
  }

  // Validation du sujet
  if (!formData.subject || formData.subject.trim() === '') {
    errors.subject = 'Le sujet est requis';
  } else if (formData.subject.trim().length < 3) {
    errors.subject = 'Le sujet doit contenir au moins 3 caractères';
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
    subject: formData.subject?.trim() || 'Demande de devis forage',
    message: formData.message?.trim() || ''
  };
};

// Fonction de validation pour les formulaires de notation
export const validateRatingForm = (ratingData) => {
  const errors = {};

  if (!ratingData.serviceId) {
    errors.serviceId = 'Identifiant du service requis';
  }

  if (typeof ratingData.rating !== 'number' || ratingData.rating < 1 || ratingData.rating > 5) {
    errors.rating = 'La note doit être comprise entre 1 et 5 étoiles';
  }

  if (ratingData.comment && ratingData.comment.length > 500) {
    errors.comment = 'Le commentaire est trop long (maximum 500 caractères)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Fonction de validation pour les formulaires de contact génériques
export const validateGenericContactForm = (contactData) => {
  const errors = {};

  // Validation du nom
  if (!contactData.name || contactData.name.trim() === '') {
    errors.name = 'Le nom est requis';
  } else if (contactData.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ '-]+$/.test(contactData.name.trim())) {
    errors.name = 'Le nom ne doit contenir que des lettres, espaces, traits d\'union et apostrophes';
  }

  // Validation de l'email
  if (!contactData.email || contactData.email.trim() === '') {
    errors.email = 'L\'adresse e-mail est requise';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email.trim())) {
    errors.email = 'Veuillez fournir une adresse e-mail valide';
  }

  // Validation du message
  if (!contactData.message || contactData.message.trim() === '') {
    errors.message = 'Le message est requis';
  } else if (contactData.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  } else if (contactData.message.trim().length > 1000) {
    errors.message = 'Le message est trop long (maximum 1000 caractères)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};