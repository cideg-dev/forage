// Types pour les services
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

// Types pour les projets complétés
export interface CompletedProject {
  id: number;
  title: string;
  location: string;
  depth: string;
  flow: string;
  image: string;
}

// Types pour les données de contact
export interface ContactFormData {
  name: string;
  contact: string;
  subject: string;
  message: string;
}

// Types pour les données de l'entreprise
export interface CompanyData {
  companyName: string;
  fullName: string;
  slogan: string;
  whatsappLink: string;
  contactPhones: string[];
}

// Types pour les paramètres de thème
export interface ThemeParams {
  isDark: boolean;
}

// Types pour les paramètres de navigation
export interface NavItem {
  id: string;
  label: string;
}