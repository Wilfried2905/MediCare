# 📦 Guide d'Installation TensioCare

## 🎯 Contenu de l'Archive

Cette archive contient le code source complet de **TensioCare MVP**, application de télésurveillance médicale.

### 📁 Structure incluse:
```
TensioCare/
├── client/              # Frontend React + TypeScript
├── server/              # Backend Express + TypeScript  
├── shared/              # Types et schémas partagés
├── attached_assets/     # Images et assets
├── components.json      # Configuration shadcn/ui
├── package.json         # Dépendances npm
├── tsconfig.json        # Configuration TypeScript
├── tailwind.config.ts   # Configuration Tailwind CSS
├── vite.config.ts       # Configuration Vite
├── README.md           # Documentation complète
├── DEPLOYMENT.md       # Guide de déploiement
└── replit.md           # Historique et architecture
```

## 🚀 Installation Rapide

### 1. Extraire l'archive
```bash
# Extraire le fichier
tar -xzf TensioCare-MVP-Complete.tar.gz
cd TensioCare/

# Ou si vous avez le fichier ZIP
unzip TensioCare-MVP-Complete.zip
cd TensioCare/
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Démarrer l'application
```bash
npm run dev
```

L'application sera accessible sur: `http://localhost:5000`

## 👥 Comptes de Test

**Patient**: `patient` / `patient`
**Médecin**: `medecin` / `medecin`  
**Admin**: `admin` / `admin`

## 🔧 Configuration

### Variables d'environnement (optionnel)
```bash
# Créer un fichier .env (optionnel pour le MVP)
PORT=5000
NODE_ENV=development
```

### Base de données
Le MVP utilise **MemStorage** (en mémoire) - aucune configuration requise.

## 🌐 Upload sur GitHub

### Option 1: Interface GitHub
1. Aller sur github.com
2. Créer un nouveau repository "TensioCare"
3. Glisser-déposer tous les fichiers extraits

### Option 2: Git CLI
```bash
git init
git add .
git commit -m "Initial commit: TensioCare MVP"
git remote add origin https://github.com/Wilfried2905/TensioCare.git
git push -u origin main
```

## 🚀 Déploiement Replit

1. **Importer sur Replit**:
   - Aller sur replit.com
   - "Import from GitHub" 
   - URL: `https://github.com/Wilfried2905/TensioCare`

2. **Démarrage automatique**:
   - Replit détecte automatiquement le projet Node.js
   - Dépendances installées automatiquement
   - Cliquer "Run" pour démarrer

## ✅ Vérification Installation

### Tests de base:
- [ ] Application démarre sans erreur
- [ ] Page de connexion s'affiche
- [ ] Connexion Patient fonctionne
- [ ] Connexion Médecin fonctionne  
- [ ] Connexion Admin fonctionne
- [ ] Navigation entre pages fluide
- [ ] Responsive sur mobile

### Fonctionnalités clés:
- [ ] Ajout mesure tension (Patient)
- [ ] Dashboard médecin accessible
- [ ] Interface admin complète
- [ ] Export CSV fonctionne
- [ ] Paiements Mobile Money simulés

## 🆘 Dépannage

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port déjà utilisé
Modifier dans `server/index.ts`:
```javascript
const port = process.env.PORT || 3001;
```

### Problèmes de dépendances
```bash
npm audit fix
npm update
```

## 📞 Support

- **Documentation**: Consulter `README.md` complet
- **Déploiement**: Voir `DEPLOYMENT.md`
- **Architecture**: Détails dans `replit.md`

## 🎉 Prêt à Déployer!

L'application est maintenant installée et prête pour:
- ✅ Développement local
- ✅ Tests fonctionnels
- ✅ Déploiement production
- ✅ Upload GitHub

**TensioCare MVP** - Application complète de télésurveillance médicale! 🏥