# TensioCare - Télésurveillance de la Tension Artérielle

## Overview

TensioCare is a medical application designed for blood pressure monitoring and telemedicine services. It provides a comprehensive platform for patients to track their blood pressure measurements, manage subscriptions, and receive medical guidance. The application supports multiple user roles (patients, doctors, administrators) and includes payment integration for subscription management.

## System Architecture

The application follows a full-stack architecture with a clear separation between frontend and backend components:

- **Frontend**: React-based Single Page Application (SPA) using TypeScript and Vite
- **Backend**: Express.js server with RESTful API design
- **Database**: PostgreSQL with Drizzle ORM for database management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom medical-themed color variables
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Authentication**: Simple username/password authentication
- **API Design**: RESTful endpoints with proper HTTP status codes
- **Error Handling**: Centralized error handling middleware

### Database Schema
The database includes four main entities:
- **Users**: Stores patient, doctor, and admin information
- **Measurements**: Blood pressure readings with context and timestamps
- **Subscriptions**: Subscription plans and status tracking
- **Payments**: Payment history and transaction records

### UI Components
- Comprehensive component library using shadcn/ui
- Medical-themed color palette with specific colors for different blood pressure ranges
- Responsive design with mobile-first approach
- Accessible components following ARIA guidelines

## Data Flow

1. **Authentication**: Users log in with role-based access (patient/doctor/admin)
2. **Measurement Recording**: Patients input blood pressure readings with context
3. **Data Visualization**: Charts and graphs display historical trends
4. **Subscription Management**: Users can view and manage their subscription status
5. **Real-time Updates**: TanStack Query provides optimistic updates and cache management

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Database connectivity
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **drizzle-orm**: Type-safe ORM
- **date-fns**: Date manipulation
- **react-hook-form**: Form management
- **zod**: Schema validation

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler

## Deployment Strategy

The application is configured for deployment on Replit with:

- **Development**: `npm run dev` runs both frontend and backend in development mode
- **Build**: `npm run build` creates optimized production bundles
- **Production**: `npm run start` serves the built application
- **Database**: PostgreSQL 16 module configured in Replit environment
- **Port Configuration**: Backend serves on port 5000, mapped to external port 80

The build process:
1. Frontend builds to `dist/public` using Vite
2. Backend bundles to `dist/index.js` using ESBuild
3. Static files are served from the Express server in production

## Recent Changes
- June 25, 2025: Initial MVP setup with Patient profile functionality
- June 25, 2025: Login page design implemented with two-column layout and medical hero image
- June 25, 2025: Authentication system with demo accounts (patient/patient, medecin/medecin, admin/admin)
- June 25, 2025: Implemented critical Patient features:
  - Visual status indicators (Normal/Elevated/Critical) with color-coded backgrounds
  - Payment expiration alert banner (3-day warning)
  - Enhanced measurement entry with date/time, context, detailed observations
  - Complete measurement history with contextual information
  - Medication management module with prescriptions, dosages, and reminders
  - Real-time messaging system with doctor for secure medical communication
- June 25, 2025: Implemented Doctor profile features:
  - Role-based navigation with dynamic sidebar menu
  - Patient management dashboard with risk assessment and compliance tracking
  - Consultation scheduling system with teleconsultation support
  - Prescription management with medication tracking and renewal alerts
  - Specialized doctor dashboard with patient overview, critical alerts, and weekly statistics
  - Comprehensive reports and analytics system with treatment effectiveness tracking
- June 25, 2025: Implemented Administrator profile features:
  - Complete admin dashboard with system metrics and user management
  - Real-time monitoring of platform health, revenue, and user activity
  - Comprehensive user management system with role-based filtering and search
  - Advanced payment management with Mobile Money integration tracking
  - System alerts and notification center for critical events
  - Administrative controls for user accounts, subscriptions, and system configuration
  - Dashboard Paiements dédié avec métriques financières temps réel
  - Analytics Paiements avancés avec prédictions et benchmarking
  - Supervision système complète avec monitoring performance et sécurité
- June 25, 2025: MVP Critical Features Implementation:
  - Subscription management with 7-day trial + 7-day grace period
  - Automatic payment alerts (J-3, J-1, expiration, +3, +7)
  - Doctor limits: 5 patients max in free version with upgrade prompts
  - Patient access control based on subscription status with emergency access
  - Mobile Money payment interface (Orange, MTN, Moov) with validation
  - Admin configuration for payment methods and automatic reminder messages
  - Workflow automation for critical processes and escalation
- June 25, 2025: Corrections finales techniques:
  - Données utilisateurs converties en état dynamique avec suppressions réelles
  - Export CSV corrigé pour utiliser données réelles du tableau au lieu de données statiques
  - Ajout de 3 nouveaux graphiques au dashboard admin: revenus mensuels, croissance utilisateurs, méthodes de paiement
  - Tableau paiements avec bordures visibles et largeurs fixes pour éviter chevauchement colonnes
  - Export CSV avec format point-virgule (;) pour colonnes parfaitement délimitées dans Excel français
  - Logo TensioCare configuré pour rediriger vers page de connexion depuis tous profils
  - Correction du routage pour gérer /login même quand utilisateur connecté
  - Redirection automatique vers dashboard après connexion réussie
- June 25, 2025: Intégration Classification OMS 2023:
  - Implémentation complète de la classification officielle OMS 2023 de l'hypertension artérielle
  - Nouveaux utilitaires blood-pressure-utils.ts avec 8 catégories: Optimale, Normale, Normale-Haute, HTA Grade 1/2/3, HTA Systolique/Diastolique Isolée
  - Guide visuel de classification OMS intégré dans la page des mesures avec couleurs standardisées
  - Recommandations médicales automatiques selon le niveau de risque (Faible/Modéré/Élevé/Critique)
  - Composants BloodPressureCard avec affichage détaillé conforme aux standards OMS
  - Mise à jour de tous les composants existants pour utiliser la nouvelle classification précise
- June 27, 2025: Correction complète classification OMS 2023:
  - Suppression définitive de l'ancien système de classification américain (blood-pressure.ts)
  - Correction bug majeur: 128/82 maintenant correctement classée "Normale" selon OMS 2023
  - Mise à jour de tous les composants dashboard pour utiliser blood-pressure-utils.ts
  - Application patient entièrement fonctionnelle avec classification médicale précise
- June 27, 2025: Documentation commerciale médicale:
  - Création dossier commercial complet pour médecins prescripteurs (DOSSIER_COMMERCIAL_MEDECINS.md)
  - Présentation executive détaillée avec preuves cliniques et ROI médecin (PRESENTATION_EXECUTIVE_MEDECINS.md)
  - Focus sur bénéfices cliniques, compliance patients, et optimisation pratique médicale
  - Adaptation au marché africain avec tarification FCFA et spécificités culturelles
- June 27, 2025: Déploiement GitHub complet:
  - Repository TensioCare créé sur https://github.com/Wilfried2905/TensioCare
  - Application complète déployée avec tous les fichiers sources
  - Documentation commerciale et technique uploadée
  - Projet prêt pour production et commercialisation
- June 27, 2025: Page d'accueil MediCare+:
  - Création page d'accueil ecosystème MediCare+ avec design professionnel
  - Logo hexagonal bleu avec molécule et croix médicale conforme à la maquette
  - 3 services : TensioCare (actif), DiabetoCare et Consultations (bientôt disponibles)
  - Navigation : page d'accueil (/) → TensioCare (/login) pour accès à l'application
  - Design responsive avec gradient bleu et cards interactives
- June 30, 2025: DiabetoCare complètement séparé et fonctionnel:
  - APIs glucose `/api/glucose-measurements` créées et fonctionnelles
  - Routage DiabetoCare corrigé avec routes individuelles explicites
  - Dashboard affiche vraies données glucose (95, 149, 105, 180, 88 mg/dL)
  - Classification ADA 2025 appliquée aux mesures diabète
  - Interface rouge DiabetoCare avec sidebar dédiée
  - Séparation définitive des données TensioCare/DiabetoCare
  - Application DiabetoCare entièrement indépendante et opérationnelle
- July 1, 2025: Correction contamination critique DiabetoCare:
  - Suppression imports TensioCare dans pages DiabetoCare (TrendChart, RecentMeasurements, etc.)
  - Correction route `/diabetocare-admin-statistics` pour éviter affichage contenu TensioCare
  - Page Statistiques DiabetoCare avec contenu 100% diabète (indicateurs clés + engagement + export)
  - Applications maintenant complètement séparées sans contamination croisée
  - DiabetoCare affiche uniquement du contenu DiabetoCare avec branding rouge
- July 1, 2025: Déploiement GitHub MediCare complet:
  - Repository MediCare créé sur https://github.com/Wilfried2905/MediCare
  - Upload réussi de 21+ fichiers essentiels incluant toute l'architecture
  - Configuration complète: package.json, tsconfig.json, vite.config.ts, tailwind.config.ts
  - Code source intégral: shared/schema.ts, server/(index.ts, routes.ts, storage.ts)
  - Interface utilisateur: client/src/(main.tsx, App.tsx, index.css, pages/, components/)
  - Documentation commerciale et technique complète uploadée
  - Fichiers Python et configurations projet (pyproject.toml) inclus
  - Projet MediCare maintenant 100% accessible publiquement et prêt pour collaboration
  - Suppression complète de tous popups externes remplacés par modals internes React
  - Système healthcare complet (TensioCare + DiabetoCare + Consultations) déployé
- July 2, 2025: Refonte page d'accueil MediCare:
  - Réorganisation logos TensioCare, DiabetoCare, Consultations en disposition horizontale
  - Redimensionnement uniforme des images (hauteur fixe 32px/8rem) avec espacement égal
  - Ajout bouton "Administration" en haut à droite avec menu déroulant
  - Centralisation accès aux 3 dashboards administrateur depuis un point unique
  - Navigation administrative améliorée avec icônes colorées et descriptions
  - Interface plus professionnelle et ergonomique pour utilisateurs administrateurs
- July 2, 2025: Optimisation responsivité complète:
  - Page d'accueil adaptée mobile/tablette/desktop avec breakpoints Tailwind
  - Bouton Administration responsive avec texte adaptatif (Admin/Administration)
  - Layout logos services: vertical mobile → horizontal desktop
  - Tailles logos progressives: h-20 mobile → h-24 tablette → h-32 desktop
  - Pages connexion TensioCare/DiabetoCare adaptées tous écrans
  - Boutons "Retour à l'accueil" responsive avec texte adaptatif
  - Image hero masquée sur mobile, pleine largeur sur desktop
  - Padding/margin adaptatifs selon taille écran
  - Application complètement utilisable sur tous devices médicaux
- July 2, 2025: Activation complète des 17 boutons DiabetoCare:
  - Dashboard Patient: "Ajouter une mesure", "Voir le calendrier", "Contacter le diabétologue" avec modals React complets
  - Page Mesures: "Nouvelle mesure" avec formulaire détaillé (glycémie, contexte, date/heure, observations)
  - Page Médicaments: "Ajouter un médicament", "Modifier", "Arrêter" avec gestion complète des traitements diabète
  - Page Communication: "Appel", "Vidéo", "Urgence", "Questions rapides", "Partager résultats", "Message urgent" avec workflows médicaux
  - Page Abonnement: "Ajouter un paiement", "Modifier", "Télécharger", "Annuler l'abonnement", "Modifier le plan", "Mettre à jour le paiement"
  - Tous les boutons utilisent exclusivement des modals internes React avec formulaires appropriés
  - Classification ADA 2025 intégrée dans tous les workflows de mesure de glycémie
  - Interface Mobile Money complète (Orange, MTN, Moov) pour paiements FCFA
  - DiabetoCare maintenant 100% fonctionnel avec toutes les interactions activées
- July 2, 2025: Correction complète des boutons inactifs Consultations:
  - Page Consultation: 4 boutons "Actions rapides" ("Demander examens", "Envoyer message", "Consulter historique", "Prolonger consultation") remplacés par modals React complets
  - Page Messages: Bouton "Nouveau message" converti en modal avec formulaires patient destinataire/objet/priorité/contenu
  - Page Prescriptions: 5 boutons activés ("Modifier prescription", "Télécharger PDF", "Renouveler automatiquement", "PDF", "Renouveler") avec modals détaillés
  - Page Statistiques: Bouton "Exporter" remplacé par modal avec options CSV/PDF/JSON et sélection données
  - Page Profil: Boutons "Modifier profil" et "Paramètres" convertis en modals React avec formulaires complets
  - Suppression définitive de tous les prompt()/alert()/confirm() remplacés par interfaces React professionnelles
  - Application Consultations entièrement fonctionnelle avec interactions 100% internes
- July 2, 2025: Séparation pages connexion administrateurs par application:
  - Création pages connexion admin dédiées: /tensiocare-admin-login, /diabetocare-admin-login, /consultations-admin-login
  - Menu Administration page d'accueil redirige vers pages connexion admin spécifiques (non pages utilisateurs générales)
  - Création dashboard administrateur Consultations complet avec métriques, alertes système, consultations récentes
  - Chaque application dispose maintenant de son écosystème administratif indépendant et sécurisé
  - Navigation admin séparée pour isolation sécurité et spécialisation par domaine médical
- July 2, 2025: Finalisation système administration MediCare:
  - Suppression complète profils "Administrateur" des 3 pages connexion applications (TensioCare/DiabetoCare/Consultations)
  - Accès administrateur exclusivement via menu "Administration" page d'accueil
  - Correction authentification admin: utilisation hook useAuth unifié avec localStorage + contexte
  - Redirection post-connexion admin corrigée vers vrais dashboards (non boucle page connexion)
  - Déconnexion admin unified: tous dashboards admin redirigent vers page d'accueil (/)
  - Système administration maintenant 100% fonctionnel et cohérent sur les 3 applications
- July 2, 2025: Optimisation responsivité complète MediCare:
  - MainLayout et DiabetoCareLayout adaptatifs (ml-0 mobile, md:ml-64 desktop)
  - Sidebars TensioCare et DiabetoCare avec menus hamburger mobiles
  - Navigation mobile complète avec overlay et animation slide
  - Grilles dashboard optimisées (grid-cols-1 mobile → sm:grid-cols-2 → lg:grid-cols-3/4 desktop)
  - Padding et spacing progressifs selon taille écran (p-4 sm:p-6, gap-4 sm:gap-6)
  - Boutons Administration et "Retour à l'accueil" avec texte adaptatif
  - Application complètement utilisable sur téléphones, tablettes et ordinateurs
- July 2, 2025: Commit GitHub massif MediCare complet:
  - Upload automatisé de 192+ fichiers source via script Python optimisé
  - Gestion des conflits et retry automatique pour résoudre erreurs 409
  - Force update avec récupération SHA pour mise à jour fichiers existants
  - Écosystème MediCare complet (TensioCare + DiabetoCare + Consultations) synchronisé
  - Repository GitHub https://github.com/Wilfried2905/MediCare entièrement à jour
  - Documentation commerciale, technique et code source 100% accessible publiquement

## User Preferences

Preferred communication style: Simple, everyday language.