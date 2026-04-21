# App_pour_compte

Une application de gestion de finances personnelles construite avec **React**, **Vite** et **Tailwind CSS**. Elle permet de suivre ses transactions, gérer ses dettes et anticiper ses mensualités avec des graphiques en temps réel.

## Structure du projet

```text
src/
├── 📁 assets/          # Ressources statiques (Images, Icônes)
├── 📁 components/      # Composants UI réutilisables (Boutons, Cartes, Inputs)
├── 📁 context/         # État global (Le "cerveau" de l'app - FinanceContext)
├── 📁 layouts/         # Structures de page (Navbar, MainLayout)
├── 📁 pages/           # Vues principales (Home, Dashboard, Settings)
├── 📁 utils/           # Fonctions utilitaires (Formatage devises, calculs)
├── 📄 App.jsx          # Configuration des routes
└── 📄 main.jsx         # Point d'entrée React & Tailwind
```

## Installation et Lancement

Suivre ces étapes pour faire tourner le projet localement :

### 1. Prérequis
S'assurer d'avoir [Node.js](https://nodejs.org/) (version 16 ou supérieure) installé sur la machine.

### 2. Cloner le projet
```bash
git clone https://github.com/votre-utilisateur/App_pour_compte.git
cd App_pour_compte
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Lancer l'application en mode développement
```bash
npm run dev
```

## Stack Technique

- **Framework** : React (Vite)
- **Style** : Tailwind CSS
- **Graphiques** : Recharts
- **Persistance** : LocalStorage
- **Icônes** : Lucide React / Emojis

## Fonctionnalités

- **Suivi mensuel** : Visualisation des revenus et dépenses du mois en cours.
- **Gestion des dettes** : Suivi des sommes à payer ou à recevoir.
- **Mensualités** : Automatisation des charges fixes (loyer, abonnements) dans les stats.
- **Sauvegarde** : Export et Import complet des données via fichiers JSON.