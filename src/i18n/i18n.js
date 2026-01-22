import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traductions
const resources = {
  fr: {
    translation: {
      // Navigation
      home: 'Accueil',
      services: 'Services',
      projects: 'Projets',
      contact: 'Contact',
      quickQuote: 'Devis Rapide',
      
      // Héros
      leaderInTogo: 'Leader au Togo',
      forceOfWater: 'La Force de l\'Eau.',
      companyFullName: 'ETS: DOCTEUR DES PROFONDEURS HYDRAULIQUE DE TOUS BORDS',
      heroDescription: 'Spécialiste panafricain du forage profond et de l\'hydraulique industrielle. Nous transformons les profondeurs arides en sources de vie pérennes.',
      ourServices: 'Nos Services',
      callUs: 'Appelez-nous',
      
      // Statistiques
      successfulDrills: 'Forages Réussis',
      regionsCovered: 'Régions Couvertes',
      peopleSupplied: 'Alimentées',
      satisfaction: 'Satisfaction',
      
      // Services
      catalogTitle: 'Catalogue Technique',
      expertise360: 'Expertise 360°',
      mechanicalDrilling: 'Forages Mécaniques',
      mechanicalDrillingDesc: 'Utilisation de foreuses rotatives lourdes pour percer les couches rocheuses les plus dures.',
      industrialDrilling: 'Forages Industriels',
      industrialDrillingDesc: 'Infrastructures à haut débit pour usines, complexes hôteliers et périmètres agricoles.',
      wellDrilling: 'Forages de Puits',
      wellDrillingDesc: 'Accès immédiat à l\'eau potable pour les ménages et les communautés villageoises.',
      consulting: 'Conseil & Assistance',
      consultingDesc: 'Audit technique de vos installations existantes et conseil en implantation.',
      equipmentAndPumping: 'Équipements & Pompage',
      equipmentAndPumpingDesc: 'Installation de tubage, soufflage et pompes immergées de marques mondiales.',
      geophysicalResearch: 'Recherche Géophysique',
      geophysicalResearchDesc: 'Études scientifiques par résistivité électrique pour localiser précisément les nappes.',
      plumbingAndDrainage: 'Canalisation & Drainage',
      plumbingAndDrainageDesc: 'Déploiement de réseaux de distribution d\'eau et assainissement professionnel.',
      hydraulicRepair: 'Réparation Hydraulique',
      hydraulicRepairDesc: 'Maintenance urgente et révision complète de vos équipements de pompage.',
      technicalTraining: 'Formation Technique',
      technicalTrainingDesc: 'Programmes de formation pour opérateurs et techniciens en hydraulique.',
      
      // Projets
      successStories: 'Nos Succès Réalisés',
      referenceProjects: 'Réalisations de Référence',
      previous: 'Précédent',
      next: 'Suivant',
      location: 'Localisation',
      depth: 'Profondeur',
      flowRate: 'Débit Mesuré',
      
      // Opérations en direct
      liveFromField: 'Live du terrain',
      machinesInAction: 'Nos Machines en Action',
      
      // CTA
      readyToDrill: 'Prêt à Forer ?',
      ctaDescription: 'Ne laissez pas la sécheresse freiner vos ambitions. Obtenez une étude de terrain et un devis personnalisé dès aujourd\'hui.',
      requestQuote: 'Demander un devis',
      geophysicalStudy: 'Étude Géophysique',
      
      // Contact
      contactOnline: 'Info Line :',
      slogan: 'L\'eau c\'est la vie !!!',
      startExpertise: 'Démarrer l\'expertise',
      yourName: 'Votre Nom',
      completeName: 'NOM COMPLET',
      phoneOrWhatsApp: 'WhatsApp / Tel',
      contactNumber: 'NUMÉRO DE CONTACT',
      yourNeed: 'Votre besoin',
      projectTypeAndLocation: 'TYPE DE PROJET ET LIEU',
      send: 'Envoyer',
      
      // Pied de page
      copyright: `© {{year}} {{company}} • L'eau c'est la vie.`,
      
      // Formulaire de contact
      formSubmissionSuccess: 'Votre demande a été envoyée avec succès ! Notre équipe vous contactera bientôt.',
      sending: 'Envoi en cours...',

      // Système de notation
      rateThisService: 'Notez ce service',
      yourRating: 'Votre note:',
      comments: 'Commentaires (facultatif)',
      shareYourExperience: 'Partagez votre expérience...',
      ratingSubmittedSuccessfully: 'Merci pour votre évaluation !',
      submitRating: 'Soumettre la note',
      submitting: 'Envoi...',
      ratingIsRequired: 'Veuillez sélectionner une note',

      // Carte des régions
      serviceAreas: 'Régions desservies',
      coverageMap: 'Carte de Couverture',
      coverageDescription: 'Découvrez où nous avons réalisé des projets de forage et d\'hydraulique à travers le pays.',
      projectsCompleted: 'Projets réalisés',
      successRate: 'Taux de réussite',
      totalRegions: 'Régions couvertes',
      totalProjects: 'Projets réalisés',
      coverageExplanation: 'Nous desservons plus de 15 régions à travers le pays.',
      projectsExplanation: 'Plus de 500 projets de forage et d\'hydraulique réalisés avec succès.',
      successExplanation: 'Un taux de réussite exceptionnel grâce à notre expertise.',
      reviews: 'évaluations',
      review: 'évaluation',

      // Blog/Actualités
      blog: 'Blog',
      latestNews: 'Dernières Actualités',
      blogDescription: 'Restez informé des dernières innovations, projets et tendances dans le domaine du forage et de l\'hydrologie.',
      all: 'Tous',
      searchArticles: 'Rechercher des articles...',
      noArticlesFound: 'Aucun article trouvé',
      loadMore: 'Charger plus',

      // CAPTCHA
      captchaVerification: 'Vérification CAPTCHA',
      captchaInstruction: 'Veuillez vérifier que vous êtes un humain.',
      captchaRequired: 'Veuillez vérifier que vous êtes un humain.',
      captchaError: 'Erreur lors de la vérification CAPTCHA',
      captchaExpired: 'Le CAPTCHA a expiré, veuillez réessayer',

      // Cookies
      cookieNotice: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site. En poursuivant votre navigation, vous acceptez notre utilisation des cookies.',
      learnMore: 'En savoir plus',
      decline: 'Refuser',
      accept: 'Accepter',

      // Suivi de projet
      projectTracking: 'Suivi de Projet',
      trackYourProjects: 'Suivez vos projets en temps réel',
      projectTrackerDescription: 'Consultez l\'état d\'avancement de vos projets de forage et d\'hydraulique en temps réel.',
      noProjectsFound: 'Aucun projet trouvé',
      client: 'Client',
      projectCode: 'Code du projet',
      location: 'Emplacement',
      depth: 'Profondeur',
      startDate: 'Date de début',
      estimatedCompletion: 'Fin estimée',
      progress: 'Progression',
      completed: 'Complété',
      inProgress: 'En cours',
      nearCompletion: 'Bientôt terminé',
      onHold: 'En attente',
      unknown: 'Inconnu',
      currentPhase: 'Phase actuelle',
      recentUpdates: 'Mises à jour récentes',
      documents: 'Documents',
      status: 'Statut',
      all: 'Tous',
      searchClient: 'Rechercher un client...',
      endDate: 'Date de fin',
      resetFilters: 'Réinitialiser',

      // Calculateur de coûts
      costCalculator: 'Calculateur de Coût',
      calculateProjectCost: 'Calculez le coût de votre projet',
      costCalculatorDescription: 'Estimez le coût approximatif de votre projet de forage ou d\'installation hydraulique en quelques étapes simples.',
      projectDetails: 'Détails du projet',
      wellDrilling: 'Forage de puits',
      industrialDrilling: 'Forage industriel',
      geophysicalStudy: 'Étude géophysique',
      pumpInstallation: 'Installation de pompe',
      maintenance: 'Maintenance',
      diameter: 'Diamètre (pouces)',
      pumpType: 'Type de pompe',
      surfacePump: 'Pompe de surface',
      submersiblePump: 'Pompe immergée',
      solarPump: 'Pompe solaire',
      variableSpeedPump: 'Pompe à vitesse variable',
      equipmentPackage: 'Pack d\'équipement',
      basic: 'Basique',
      standard: 'Standard',
      premium: 'Premium',
      enterprise: 'Entreprise',
      urban: 'Urbain',
      rural: 'Rural',
      remote: 'Éloigné',
      mountain: 'Montagneux',
      urgency: 'Urgence',
      normal: 'Normal',
      urgent: 'Urgent',
      emergency: 'Urgence',
      calculate: 'Calculer',
      reset: 'Réinitialiser',
      costEstimation: 'Estimation de coût',
      enterProjectDetails: 'Entrez les détails de votre projet',
      calculatorInstructions: 'Remplissez les détails de votre projet pour obtenir une estimation précise du coût.',
      estimatedTotalCost: 'Coût total estimé',
      baseCost: 'Coût de base',
      diameterMultiplier: 'Multiplicateur de diamètre',
      pumpTypeMultiplier: 'Multiplicateur de pompe',
      equipmentPackageMultiplier: 'Multiplicateur d\'équipement',
      locationMultiplier: 'Multiplicateur de localisation',
      urgencyMultiplier: 'Multiplicateur d\'urgence',
      fixedFees: 'Frais fixes',
      total: 'Total',
      note: 'Note',
      costEstimationDisclaimer: 'Cette estimation est fournie à titre indicatif. Le coût final peut varier en fonction des conditions réelles sur site et d\'autres facteurs spécifiques à votre projet.',

      // Galerie
      projectGallery: 'Galerie de Projets',
      galleryDescription: 'Découvrez nos réalisations à travers des photos avant/après, des vidéos de nos opérations et des témoignages de nos clients.',
      beforeAfter: 'Avant/Après',
      videos: 'Vidéos',
      images: 'Images',
      before: 'Avant',
      after: 'Après',
      video: 'Vidéo',
      all: 'Tous',

      // Autres
      waterLife: 'L\'eau c\'est la vie.'
    }
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      quickQuote: 'Quick Quote',

      // Héros
      leaderInTogo: 'Leader in Togo',
      forceOfWater: 'The Force of Water.',
      companyFullName: 'ETS: DOCTEUR DES PROFONDEURS HYDRAULIQUE DE TOUS BORDS',
      heroDescription: 'Pan-African specialist in deep drilling and industrial hydraulics. We transform arid depths into sustainable sources of life.',
      ourServices: 'Our Services',
      callUs: 'Call Us',

      // Statistiques
      successfulDrills: 'Successful Drills',
      regionsCovered: 'Regions Covered',
      peopleSupplied: 'People Supplied',
      satisfaction: 'Satisfaction',

      // Services
      catalogTitle: 'Technical Catalog',
      expertise360: '360° Expertise',
      mechanicalDrilling: 'Mechanical Drilling',
      mechanicalDrillingDesc: 'Using heavy rotary drills to penetrate the hardest rock layers.',
      industrialDrilling: 'Industrial Drilling',
      industrialDrillingDesc: 'High-flow infrastructure for factories, hotel complexes, and agricultural areas.',
      wellDrilling: 'Well Drilling',
      wellDrillingDesc: 'Immediate access to drinking water for households and village communities.',
      consulting: 'Consulting & Assistance',
      consultingDesc: 'Technical audit of your existing installations and placement advice.',
      equipmentAndPumping: 'Equipment & Pumping',
      equipmentAndPumpingDesc: 'Installation of casing, grouting, and world-famous submersible pumps.',
      geophysicalResearch: 'Geophysical Research',
      geophysicalResearchDesc: 'Scientific studies by electrical resistivity to accurately locate aquifers.',
      plumbingAndDrainage: 'Plumbing & Drainage',
      plumbingAndDrainageDesc: 'Deployment of water distribution networks and professional sanitation.',
      hydraulicRepair: 'Hydraulic Repair',
      hydraulicRepairDesc: 'Urgent maintenance and complete revision of your pumping equipment.',
      technicalTraining: 'Technical Training',
      technicalTrainingDesc: 'Training programs for operators and technicians in hydraulics.',

      // Projets
      successStories: 'Our Success Stories',
      referenceProjects: 'Reference Projects',
      previous: 'Previous',
      next: 'Next',
      location: 'Location',
      depth: 'Depth',
      flowRate: 'Flow Rate',

      // Opérations en direct
      liveFromField: 'Live from the field',
      machinesInAction: 'Our Machines in Action',

      // CTA
      readyToDrill: 'Ready to Drill?',
      ctaDescription: 'Don\'t let drought slow down your ambitions. Get a site study and a custom quote today.',
      requestQuote: 'Request a quote',
      geophysicalStudy: 'Geophysical Study',

      // Contact
      contactOnline: 'Contact Online:',
      slogan: 'Water is life!!!',
      startExpertise: 'Start Expertise',
      yourName: 'Your Name',
      completeName: 'FULL NAME',
      phoneOrWhatsApp: 'Phone / WhatsApp',
      contactNumber: 'CONTACT NUMBER',
      yourNeed: 'Your Need',
      projectTypeAndLocation: 'PROJECT TYPE AND LOCATION',
      send: 'Send',

      // Formulaire de contact
      formSubmissionSuccess: 'Your request has been sent successfully! Our team will contact you soon.',
      sending: 'Sending...',

      // Système de notation
      rateThisService: 'Rate this service',
      yourRating: 'Your rating:',
      comments: 'Comments (optional)',
      shareYourExperience: 'Share your experience...',
      ratingSubmittedSuccessfully: 'Thank you for your evaluation!',
      submitRating: 'Submit rating',
      submitting: 'Submitting...',
      ratingIsRequired: 'Please select a rating',

      // Carte des régions
      serviceAreas: 'Service Areas',
      coverageMap: 'Coverage Map',
      coverageDescription: 'Discover where we have carried out drilling and hydraulics projects throughout the country.',
      projectsCompleted: 'Projects completed',
      successRate: 'Success rate',
      totalRegions: 'Regions covered',
      totalProjects: 'Projects completed',
      coverageExplanation: 'We serve more than 15 regions across the country.',
      projectsExplanation: 'More than 500 drilling and hydraulics projects successfully completed.',
      successExplanation: 'An exceptional success rate thanks to our expertise.',
      reviews: 'reviews',
      review: 'review',

      // Blog/Actualités
      blog: 'Blog',
      latestNews: 'Latest News',
      blogDescription: 'Stay informed about the latest innovations, projects, and trends in drilling and hydrology.',
      all: 'All',
      searchArticles: 'Search articles...',
      noArticlesFound: 'No articles found',
      loadMore: 'Load more',

      // CAPTCHA
      captchaVerification: 'CAPTCHA Verification',
      captchaInstruction: 'Please verify that you are a human.',
      captchaRequired: 'Please verify that you are a human.',
      captchaError: 'Error during CAPTCHA verification',
      captchaExpired: 'CAPTCHA has expired, please try again',

      // Cookies
      cookieNotice: 'We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies.',
      learnMore: 'Learn more',
      decline: 'Decline',
      accept: 'Accept',

      // Suivi de projet
      projectTracking: 'Project Tracking',
      trackYourProjects: 'Track your projects in real-time',
      projectTrackerDescription: 'Check the progress status of your drilling and hydraulics projects in real-time.',
      noProjectsFound: 'No projects found',
      client: 'Client',
      projectCode: 'Project Code',
      location: 'Location',
      depth: 'Depth',
      startDate: 'Start Date',
      estimatedCompletion: 'Estimated Completion',
      progress: 'Progress',
      completed: 'Completed',
      inProgress: 'In Progress',
      nearCompletion: 'Near Completion',
      onHold: 'On Hold',
      unknown: 'Unknown',
      currentPhase: 'Current Phase',
      recentUpdates: 'Recent Updates',
      documents: 'Documents',
      status: 'Status',
      all: 'All',
      searchClient: 'Search client...',
      endDate: 'End Date',
      resetFilters: 'Reset Filters',

      // Calculateur de coûts
      costCalculator: 'Cost Calculator',
      calculateProjectCost: 'Calculate your project cost',
      costCalculatorDescription: 'Estimate the approximate cost of your drilling or hydraulics installation project in a few simple steps.',
      projectDetails: 'Project Details',
      wellDrilling: 'Well Drilling',
      industrialDrilling: 'Industrial Drilling',
      geophysicalStudy: 'Geophysical Study',
      pumpInstallation: 'Pump Installation',
      maintenance: 'Maintenance',
      diameter: 'Diameter (inches)',
      pumpType: 'Pump Type',
      surfacePump: 'Surface Pump',
      submersiblePump: 'Submersible Pump',
      solarPump: 'Solar Pump',
      variableSpeedPump: 'Variable Speed Pump',
      equipmentPackage: 'Equipment Package',
      basic: 'Basic',
      standard: 'Standard',
      premium: 'Premium',
      enterprise: 'Enterprise',
      urban: 'Urban',
      rural: 'Rural',
      remote: 'Remote',
      mountain: 'Mountain',
      urgency: 'Urgency',
      normal: 'Normal',
      urgent: 'Urgent',
      emergency: 'Emergency',
      calculate: 'Calculate',
      reset: 'Reset',
      costEstimation: 'Cost Estimation',
      enterProjectDetails: 'Enter your project details',
      calculatorInstructions: 'Fill in your project details to get an accurate cost estimate.',
      estimatedTotalCost: 'Estimated Total Cost',
      baseCost: 'Base Cost',
      diameterMultiplier: 'Diameter Multiplier',
      pumpTypeMultiplier: 'Pump Type Multiplier',
      equipmentPackageMultiplier: 'Equipment Package Multiplier',
      locationMultiplier: 'Location Multiplier',
      urgencyMultiplier: 'Urgency Multiplier',
      fixedFees: 'Fixed Fees',
      total: 'Total',
      note: 'Note',
      costEstimationDisclaimer: 'This estimate is provided for informational purposes only. The final cost may vary depending on actual site conditions and other project-specific factors.',

      // Galerie
      projectGallery: 'Project Gallery',
      galleryDescription: 'Discover our achievements through before/after photos, videos of our operations, and testimonials from our clients.',
      beforeAfter: 'Before/After',
      videos: 'Videos',
      images: 'Images',
      before: 'Before',
      after: 'After',
      video: 'Video',
      all: 'All',

      // Pied de page
      copyright: `© {{year}} {{company}} • Water is life.`,

      // Autres
      waterLife: 'Water is life.'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;