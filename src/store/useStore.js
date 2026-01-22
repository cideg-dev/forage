import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Store principal pour l'application
const useStore = create(devtools((set, get) => ({
  // État du thème (clair/sombre)
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark }), false, 'toggleTheme'),

  // Données du formulaire de contact
  formData: {
    name: '',
    contact: '',
    subject: 'Demande de devis forage',
    message: ''
  },
  updateFormData: (field, value) => set((state) => ({
    formData: { ...state.formData, [field]: value }
  }), false, 'updateFormData'),
  resetFormData: () => set({ formData: {
    name: '',
    contact: '',
    subject: 'Demande de devis forage',
    message: ''
  }}, false, 'resetFormData'),

  // État de la navigation mobile
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }), false, 'toggleMobileMenu'),
  closeMobileMenu: () => set({ mobileMenuOpen: false }, false, 'closeMobileMenu'),

  // État du carrousel de projets
  currentProjectIndex: 0,
  setCurrentProjectIndex: (index) => set({ currentProjectIndex: index }, false, 'setCurrentProjectIndex'),
  nextProject: () => {
    const { COMPLETED_PROJECTS } = get();
    set((state) => ({
      currentProjectIndex: (state.currentProjectIndex + 1) % COMPLETED_PROJECTS.length
    }), false, 'nextProject');
  },
  prevProject: () => {
    const { COMPLETED_PROJECTS } = get();
    set((state) => ({
      currentProjectIndex: (state.currentProjectIndex - 1 + COMPLETED_PROJECTS.length) % COMPLETED_PROJECTS.length
    }), false, 'prevProject');
  },

  // Fonction pour le défilement
  scrollTo: (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  },

  // Fonction pour les appels à l'action
  handleCTA: (subject, message, focusId) => {
    const { scrollTo } = get();
    scrollTo('contact');
    // Mettre à jour les données du formulaire si nécessaire
    if (focusId) {
      setTimeout(() => {
        const input = document.getElementById(focusId);
        if (input) input.focus();
      }, 800);
    }
  },

  // Données statiques (ne changeant pas fréquemment)
  COMPLETED_PROJECTS: [
    {
      id: 1,
      title: "Station de Pompage Solaire",
      location: "Région des Savanes",
      depth: "145m",
      flow: "15 m3/h",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 2,
      title: "Forage Industriel Portuaire",
      location: "Port de Lomé",
      depth: "210m",
      flow: "45 m3/h",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 3,
      title: "Puits Communautaire",
      location: "Kpalimé",
      depth: "85m",
      flow: "5 m3/h",
      image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&q=80&w=1200"
    }
  ],
  SERVICES: [
    { id: 1, title: "Forages Mécaniques", description: "Utilisation de foreuses rotatives lourdes pour percer les couches rocheuses les plus dures.", icon: "🏗️" },
    { id: 2, title: "Forages Industriels", description: "Infrastructures à haut débit pour usines, complexes hôteliers et périmètres agricoles.", icon: "🏭" },
    { id: 3, title: "Forages de Puits", description: "Accès immédiat à l'eau potable pour les ménages et les communautés villageoises.", icon: "💧" },
    { id: 4, title: "Conseil & Assistance", description: "Audit technique de vos installations existantes et conseil en implantation.", icon: "⚙️" },
    { id: 5, title: "Équipements & Pompage", description: "Installation de tubage, soufflage et pompes immergées de marques mondiales.", icon: "🔧" },
    { id: 6, title: "Recherche Géophysique", description: "Études scientifiques par résistivité électrique pour localiser précisément les nappes.", icon: "🗺️" },
    { id: 7, title: "Canalisation & Drainage", description: "Déploiement de réseaux de distribution d'eau et assainissement professionnel.", icon: "🧪" },
    { id: 8, title: "Réparation Hydraulique", description: "Maintenance urgente et révision complète de vos équipements de pompage.", icon: "🌊" },
    { id: 9, title: "Formation Technique", description: "Programmes de formation pour opérateurs et techniciens en hydraulique.", icon: "🎓" }
  ],
  CONTACT_PHONES: ["93 44 50 76", "97 77 03 50", "99 64 49 10"],
  SLOGAN: "L'eau c'est la vie !!!",
  COMPANY_NAME: "DOCTEUR DES PROFONDEURS",
  WHATSAPP_LINK: "https://wa.me/22893445076"
})));


export default useStore;