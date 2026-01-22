// components/FormValidator.js
import React from 'react';
import { validateForm, validateRatingForm, validateGenericContactForm } from '../src/utils/validation';

const FormValidator = ({ formData, formType = 'contact', children }) => {
  const validate = () => {
    switch(formType) {
      case 'rating':
        return validateRatingForm(formData);
      case 'genericContact':
        return validateGenericContactForm(formData);
      case 'contact':
      default:
        return validateForm(formData);
    }
  };

  const { isValid, errors } = validate();

  return children({ isValid, errors });
};

export default FormValidator;