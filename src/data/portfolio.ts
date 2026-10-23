import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Code2,
  Github,
  Lightbulb,
  Mail,
  MessageCircle,
  Server,
  UsersRound,
} from "lucide-react";

export const profile = {
  displayName: "Marie-Merveille",
  fullName: "GBAGUIDI Marie-Merveille Sessougnimi",
  role: "Développeuse web front-end & back-end, étudiante en Intelligence Artificielle",
  school: "IFRI — Université d'Abomey-Calavi, Bénin",
  email: "merveillegms@gmail.com",
  github: "https://github.com/merveillegms",
  whatsapp: "+2290151948687",
  introduction:
    "Je conçois des interfaces web et participe aussi au développement back-end. À l'IFRI, je poursuis un parcours en intelligence artificielle.",
  about:
    "À l'IFRI, j'étudie l'informatique avec un parcours en intelligence artificielle. Je travaille sur des interfaces web et découvre aussi la conception back-end, notamment avec Node.js. J'apprécie les projets d'équipe où l'on apprend en construisant des fonctionnalités utiles.",
};

export type Project = {
  name: string;
  category: "Académique" | "En cours" | "Personnel";
  year?: string;
  description: string;
  role: string;
  contributions?: string[];
  technologies?: string[];
  url?: string;
  preview: "nexus" | "mentorlink" | "aliyo" | "basilic" | "momofood";
};

export const projects: Project[] = [
  {
    name: "NEXUS HUB",
    category: "En cours",
    description:
      "API back-end de NEXUS HUB, une plateforme dont le noyau couvre les projets, les tâches et leur suivi.",
    role: "Stagiaire développeuse back-end · Snow Solution Now",
    contributions: ["Participation au développement de l'API"],
    technologies: ["Node.js", "Express", "TypeScript", "Prisma", "PostgreSQL"],
    url: "https://github.com/snow-agency/nexus-hub",
    preview: "nexus",
  },
  {
    name: "IFRI MentorLink",
    category: "Académique",
    year: "2026",
    description: "Une plateforme pensée pour faciliter le mentorat et l'entraide entre étudiants.",
    role: "Développeuse front-end au sein d'une équipe académique",
    contributions: [
      "Intégration de l'interface utilisateur",
      "Contributions ponctuelles en Python et JavaScript",
    ],
    technologies: ["HTML", "CSS", "Bootstrap", "Python", "JavaScript"],
    preview: "mentorlink",
  },
  {
    name: "Aliyo",
    category: "En cours",
    year: "2026",
    description: "Une plateforme d'orientation destinée aux jeunes bacheliers béninois.",
    role: "Assistante du chef de projet",
    contributions: [
      "Appui à la coordination des partenaires",
      "Suivi des partenariats et du travail des chargés de données",
    ],
    preview: "aliyo",
  },
  {
    name: "Le Basilic",
    category: "Personnel",
    description: "Site vitrine de restaurant avec présentation, carte et formulaire de réservation.",
    role: "Projet personnel",
    technologies: ["HTML", "CSS", "JavaScript"],
    url: "https://merveillegms.github.io/le-basilic",
    preview: "basilic",
  },
  {
    name: "MomoFood",
    category: "Personnel",
    description: "Application de commande et de livraison locale avec suivi, messagerie et paiement.",
    role: "Projet personnel",
    url: "https://orderly-momo-food.lovable.app",
    preview: "momofood",
  },
];

export type SkillGroup = {
  title: string;
  items: { name: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Développement web",
    items: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "Bootstrap" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "Développement back-end",
    items: [
      { name: "Node.js" },
      { name: "Python" },
    ],
  },
  {
    title: "Programmation",
    items: [
      { name: "C" },
      { name: "Algorithmique" },
    ],
  },
  {
    title: "Outils & environnement",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
    ],
  },
];

export const strengths: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Développement web",
    description: "Des interfaces accessibles, soignées et pensées pour leurs utilisateurs.",
    icon: Code2,
  },
  {
    title: "Développement back-end",
    description: "Des API et des services côté serveur, notamment avec Node.js.",
    icon: Server,
  },
  {
    title: "Créativité & innovation",
    description: "Passer d'une idée à une solution claire, en échangeant et en avançant avec méthode.",
    icon: Lightbulb,
  },
];

export const journey = [
  {
    date: "2025 — 2026",
    title: "Informatique, parcours Intelligence Artificielle",
    place: "IFRI — Université d'Abomey-Calavi",
    icon: BrainCircuit,
  },
  {
    date: "En cours",
    title: "Stage en développement back-end — NEXUS HUB",
    place: "Snow Solution Now",
    icon: Server,
  },
  {
    date: "2026",
    title: "IFRI MentorLink",
    place: "Expérience académique en développement front-end",
    icon: Code2,
  },
  {
    date: "2026",
    title: "Aliyo",
    place: "Assistance à la coordination de projet",
    icon: UsersRound,
  },
];

export const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
];

export const contactLinks = [
  { label: "E-mail", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  {
    label: "WhatsApp",
    value: "+229 01 51 94 86 87",
    href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`,
    phoneHref: `tel:${profile.whatsapp}`,
    icon: MessageCircle,
  },
  { label: "GitHub", value: "merveillegms", href: profile.github, icon: Github },
];
