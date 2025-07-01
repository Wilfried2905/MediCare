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

## User Preferences

Preferred communication style: Simple, everyday language.