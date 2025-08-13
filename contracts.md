# Contracts API - Site Ronaldinho

## Overview
Ce document définit les contrats API pour l'intégration entre le frontend et le backend du site Ronaldinho.

## A) API Contracts

### 1. Données Héro
**Endpoint:** `GET /api/hero`
```json
{
  "title": "Ronaldinho Gaúcho",
  "subtitle": "La Magie du Football Brésilien", 
  "description": "string",
  "image": "url",
  "stats": {
    "trophees": 26,
    "matchs": 207,
    "buts": 94,
    "ballonOr": 1
  }
}
```

### 2. Entraînements
**Endpoint:** `GET /api/trainings`
```json
[
  {
    "id": "string",
    "nom": "string",
    "duree": "string",
    "description": "string",
    "exercices": ["string"],
    "image": "url",
    "ordre": "number"
  }
]
```

### 3. Vidéos d'Entraînement
**Endpoint:** `GET /api/training-videos`
```json
[
  {
    "id": "string",
    "titre": "string",
    "description": "string",
    "url": "string",
    "miniature": "url",
    "duree": "string",
    "category": "string"
  }
]
```

### 4. Données À Propos
**Endpoint:** `GET /api/about`
```json
{
  "quote": "string",
  "biographie": "string",
  "carriere": [
    {
      "periode": "string",
      "club": "string", 
      "description": "string",
      "logo": "url"
    }
  ],
  "qualites": [
    {
      "nom": "string",
      "description": "string"
    }
  ],
  "momentsMarquants": [
    {
      "annee": "string",
      "evenement": "string",
      "description": "string"
    }
  ]
}
```

### 5. Statistiques
**Endpoint:** `GET /api/statistics`
```json
{
  "records": {
    "matchs": 207,
    "buts": 70,
    "passes": 89,
    "trophees": 26
  },
  "clubs": [
    {
      "nom": "string",
      "periode": "string",
      "matchs": "number",
      "buts": "number",
      "logo": "url"
    }
  ],
  "titres": ["string"]
}
```

### 6. Réseaux Sociaux
**Endpoint:** `GET /api/social-links`
```json
[
  {
    "nom": "string",
    "url": "string", 
    "icon": "string"
  }
]
```

### 7. Newsletter (POST)
**Endpoint:** `POST /api/newsletter`
```json
{
  "email": "string"
}
```

### 8. Commentaires/Témoignages
**Endpoint:** `GET /api/testimonials`
**Endpoint:** `POST /api/testimonials`
```json
{
  "nom": "string",
  "message": "string",
  "pays": "string",
  "date": "timestamp",
  "approved": "boolean"
}
```

## B) Données Mockées à Remplacer

**Fichier:** `/app/frontend/src/data/mock.js`

- `ronaldinhoData.hero` → API `/api/hero`
- `ronaldinhoData.entraînements.routines` → API `/api/trainings` 
- `ronaldinhoData.entraînements.videos` → API `/api/training-videos`
- `ronaldinhoData.apropos` → API `/api/about`
- `ronaldinhoData.statistiques` → API `/api/statistics`
- `ronaldinhoData.reseauxSociaux` → API `/api/social-links`

## C) Backend Implementation Plan

### Models à Créer:
1. **Hero** - Données section héro
2. **Training** - Routines d'entraînement
3. **TrainingVideo** - Vidéos explicatives 
4. **About** - Informations biographiques
5. **Career** - Étapes de carrière
6. **Quality** - Qualités du joueur
7. **Moment** - Moments marquants
8. **Statistics** - Statistiques et records
9. **Club** - Clubs de carrière
10. **SocialLink** - Liens réseaux sociaux
11. **Newsletter** - Inscriptions newsletter
12. **Testimonial** - Témoignages de fans

### Endpoints à Développer:
- `GET /api/hero` - Données héro
- `GET /api/trainings` - Liste entraînements
- `GET /api/training-videos` - Vidéos d'entraînement
- `GET /api/about` - Données biographiques
- `GET /api/statistics` - Statistiques complètes
- `GET /api/social-links` - Liens sociaux
- `POST /api/newsletter` - Inscription newsletter
- `GET /api/testimonials` - Témoignages approuvés
- `POST /api/testimonials` - Nouveau témoignage

## D) Frontend Integration Plan

### Composants à Modifier:
1. **HeroSection.jsx** - Utiliser API `/api/hero`
2. **TrainingSection.jsx** - Utiliser APIs `/api/trainings` et `/api/training-videos`
3. **AboutSection.jsx** - Utiliser API `/api/about`  
4. **StatsSection.jsx** - Utiliser API `/api/statistics`
5. **Footer.jsx** - Utiliser API `/api/social-links`

### Services à Créer:
- `src/services/api.js` - Client API centralisé
- `src/hooks/useApi.js` - Hook personnalisé pour les appels API
- Error handling et loading states

### Nouvelles Fonctionnalités:
1. **Newsletter** - Formulaire inscription avec validation
2. **Témoignages** - Section dédiée avec formulaire
3. **Galerie vidéos** - Player vidéo intégré
4. **Admin Panel** - Interface de gestion (optionnel)

## E) Intégration Vidéos

### Providers Supportés:
- YouTube (embed)
- Vimeo (embed) 
- Vidéos directes (MP4)

### Player Features:
- Contrôles personnalisés
- Miniatures automatiques
- Responsive design
- Lazy loading

## F) Data Migration

1. Migrer données mock vers MongoDB
2. Ajouter images optimisées
3. Intégrer vraies URLs vidéos
4. Tester tous les endpoints
5. Remplacer frontend mock par API calls