import React from 'react';
import { 
  Droplets, 
  Construction, 
  Settings, 
  Waves, 
  Map, 
  Pipette, 
  Wrench, 
  GraduationCap, 
  Factory 
} from 'lucide-react';

export const COMPANY_NAME = "SOCIÉTÉ DE FORAGES";
export const FULL_NAME = "ETS: DOCTEUR DES PROFONDEURS HYDRAULIQUE DE TOUS BORDS";
export const SLOGAN = "L'eau c'est la vie !!!";

export const CONTACT_PHONES = [
  "+228 93 44 50 76",
  "+228 97 77 03 50",
  "+228 99 64 49 10"
];

const ICON_COLOR = "text-cyan-600 dark:text-cyan-400";

export const SERVICES = [
  {
    id: "meca",
    title: "Forages Mécaniques",
    description: "Forages de précision utilisant des technologies mécaniques avancées pour atteindre les nappes phréatiques les plus profondes.",
    icon: <Construction className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "indus",
    title: "Forages Industriels",
    description: "Solutions de forage à grande échelle pour les usines, les complexes agricoles et les besoins industriels massifs.",
    icon: <Factory className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "puits",
    title: "Forages de Puits",
    description: "Installation de puits domestiques et communautaires garantissant un accès durable à l'eau potable.",
    icon: <Droplets className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "conseil",
    title: "Conseil et Assistance",
    description: "Expertise technique et accompagnement de projet pour optimiser vos installations hydrauliques.",
    icon: <Settings className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "equipement",
    title: "Équipements & Pompage",
    description: "Tubage, soufflage et installation de systèmes de pompage haute performance pour tous types de forages.",
    icon: <Wrench className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "geophysique",
    title: "Recherche & Géophysique",
    description: "Dépistage scientifique des points d'eau par études géophysiques pour garantir le succès de chaque forage.",
    icon: <Map className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "canalisation",
    title: "Canalisation & Drainage",
    description: "Installation de réseaux de distribution d'eau et systèmes de drainage professionnels.",
    icon: <Pipette className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "reparation",
    title: "Réparation Hydraulique",
    description: "Maintenance curative et préventive de tous vos équipements hydrauliques et forages existants.",
    icon: <Waves className={`w-8 h-8 ${ICON_COLOR}`} />
  },
  {
    id: "formation",
    title: "Formation Technique",
    description: "Programmes de formation spécialisée pour les techniciens et agents du secteur hydraulique.",
    icon: <GraduationCap className={`w-8 h-8 ${ICON_COLOR}`} />
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Koffi Amégan",
    role: "Propriétaire de ferme",
    content: "L'équipe du Docteur des Profondeurs a sauvé ma récolte avec un forage industriel ultra-rapide. Un professionnalisme exemplaire.",
    avatar: "https://i.pravatar.cc/150?u=koffi"
  },
  {
    id: 2,
    name: "Sarah Mensah",
    role: "Directrice d'ONG",
    content: "Nous avons collaboré sur 5 projets de puits communautaires. Leur expertise géophysique nous assure de trouver de l'eau à chaque fois.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 3,
    name: "Jean-Pierre Togo",
    role: "Promoteur Immobilier",
    content: "Fiabilité et rapidité. Les installations de pompage sont robustes et le SAV est toujours disponible.",
    avatar: "https://i.pravatar.cc/150?u=jean"
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "Complexe Agricole d'Atakpamé",
    description: "Forage industriel à 120m de profondeur pour irrigation massive.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Zone Industrielle de Lomé",
    description: "Installation d'un système de pompage solaire et château d'eau.",
    image: "https://images.unsplash.com/photo-1518107616385-ad3089197f0c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Hydraulique Villageoise Kara",
    description: "Réhabilitation de 10 forages existants et installation de pompes manuelles.",
    image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Projet Côte d'Ivoire",
    description: "Études géophysiques et forages profonds pour stations balnéaires.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Maintenance Portuaire",
    description: "Entretien des systèmes hydrauliques sur les infrastructures du port autonome.",
    image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800"
  }
];

export const PARTNERS = [
  { name: "Grundfos", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Grundfos_Logo.svg" },
  { name: "Franklin Electric", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Franklin_Electric_Logo.svg" },
  { name: "Lorentz", logo: "https://www.lorentz.de/wp-content/themes/lorentz/images/logo.svg" },
  { name: "Togo Hydraulique", logo: "https://picsum.photos/id/201/200/100" },
  { name: "BOAD", logo: "https://picsum.photos/id/202/200/100" }
];

export const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1533221950280-990a423793e2?auto=format&fit=crop&q=80&w=800", caption: "Forage profond en milieu rural" },
  { url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=800", caption: "Installation de station de pompage" },
  { url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800", caption: "Analyses géophysiques avancées" },
  { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800", caption: "Notre équipe sur le terrain" },
  { url: "https://images.unsplash.com/photo-1454165833767-027eeea15c3e?auto=format&fit=crop&q=80&w=800", caption: "Planification et ingénierie hydraulique" }
];

export const CAREER_OPENINGS = [
  { id: 1, title: "Technicien Foreur Sénior", type: "CDI", location: "Lomé & Déplacements", description: "Expérience en forages mécaniques profonds requise." },
  { id: 2, title: "Ingénieur Hydrogéologue", type: "CDI", location: "Siège", description: "Expertise en études géophysiques et cartographie des nappes." },
  { id: 3, title: "Agent de Maintenance", type: "CDD", location: "Région des Plateaux", description: "Spécialiste pompes et réseaux de distribution." }
];

export const FAQ_DATA = [
  { question: "Quelle est la profondeur maximale de vos forages ?", answer: "Nous pouvons atteindre jusqu'à 250 mètres de profondeur selon la structure géologique du terrain pour garantir un débit pérenne." },
  { question: "Combien de temps dure un forage domestique ?", answer: "En général, entre 3 et 5 jours ouvrés, de l'installation de la foreuse jusqu'à la mise en service du système de pompage." },
  { question: "Quelles garanties offrez-vous ?", answer: "Toutes nos installations sont garanties 2 ans. Nous offrons également un contrat de maintenance pour assurer la longévité de vos équipements." },
  { question: "Intervenez-vous en dehors de Lomé ?", answer: "Oui, nous couvrons l'intégralité du territoire togolais ainsi que les pays limitrophes pour des projets industriels et agricoles." }
];