// services/contactService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);
    return { success: false, error: error.message };
  }
};

// Service pour envoyer un email via une API tierce (ex: EmailJS)
export const sendEmailViaService = async (formData) => {
  // Cette fonction simule l'utilisation d'un service comme EmailJS
  // Vous devrez configurer les identifiants appropriés
  
  const emailData = {
    service_id: process.env.REACT_APP_EMAIL_SERVICE_ID || 'service_default',
    template_id: process.env.REACT_APP_EMAIL_TEMPLATE_ID || 'template_contact',
    user_id: process.env.REACT_APP_EMAIL_USER_ID || 'user_default',
    template_params: {
      from_name: formData.name,
      from_email: formData.contact, // Peut être un email ou un numéro de téléphone
      subject: formData.subject,
      message: formData.message,
    }
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, error: error.message };
  }
};