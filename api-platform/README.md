# API Platform - API REST avec API Platform

## Objectif de l'API

Cette API REST a été construite avec **API Platform** pour gérer un domaine métier de **réservation de voyages et packages touristiques**. Elle permet de gérer des packages populaires et des recommandations de voyages avec leurs caractéristiques (images, prix, notes, descriptions).

## Description du domaine métier

Le domaine métier choisi est celui d'une **agence de voyage en ligne** qui propose :
- **Packages populaires** : Destinations touristiques avec durée de séjour
- **Recommandations de voyage** : Offres détaillées avec notes, prix et descriptions

## Schéma de la base de données

### Entité Package
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `title` (VARCHAR 255) - Titre du package (ex: "Bali, Indonesia")
- `image` (VARCHAR 255) - Chemin vers l'image
- `duration` (VARCHAR 50) - Durée du séjour (ex: "3 days 2 Night")

### Entité Recommendation
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `title` (VARCHAR 255) - Titre de la recommandation
- `image` (VARCHAR 255) - Chemin vers l'image
- `rating` (DECIMAL 3,2) - Note sur 5
- `price` (DECIMAL 10,2) - Prix en dollars
- `description` (TEXT) - Description détaillée

### Entité User
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `email` (VARCHAR 180, UNIQUE) - Email de l'utilisateur
- `password` (VARCHAR) - Mot de passe hashé
- `roles` (JSON) - Rôles de l'utilisateur

## Documentation des endpoints

### Authentification

#### POST /api/login
Obtenir un token JWT.

**Body:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:** 200 OK
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Compte de test (créé automatiquement via fixtures):**
- Email: `admin@example.com`
- Password: `password123`

### Packages

#### GET /api/packages
Récupérer la liste des packages (pagination: 10 par page).

**Query parameters:**
- `page` - Numéro de page
- `title` - Recherche partielle dans le titre
- `order[title]` - Trier par titre (asc/desc)

**Response:** 200 OK
```json
{
  "@context": "/api/contexts/Package",
  "@id": "/api/packages",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/packages/1",
      "@type": "Package",
      "id": 1,
      "title": "Bali, Indonesia",
      "image": "/f1.webp",
      "duration": "3 days 2 Night"
    }
  ],
  "hydra:totalItems": 4
}
```

#### GET /api/packages/{id}
Récupérer un package spécifique.

#### POST /api/packages
Créer un nouveau package (authentification requise).

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
  "title": "New Package",
  "image": "/image.jpg",
  "duration": "2 days 1 night"
}
```

#### PUT /api/packages/{id}
Modifier un package (authentification requise).

#### DELETE /api/packages/{id}
Supprimer un package (authentification requise).

### Recommendations

#### GET /api/recommendations
Récupérer la liste des recommandations (pagination: 10 par page).

**Query parameters:**
- `page` - Numéro de page
- `title` - Recherche partielle dans le titre
- `description` - Recherche partielle dans la description
- `order[rating]` - Trier par note (asc/desc)
- `order[price]` - Trier par prix (asc/desc)
- `rating[gte]` - Note minimum
- `price[gte]` - Prix minimum

**Response:** 200 OK
```json
{
  "@context": "/api/contexts/Recommendation",
  "@id": "/api/recommendations",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@id": "/api/recommendations/1",
      "@type": "Recommendation",
      "id": 1,
      "title": "Wales Beach",
      "image": "/p1.jpg",
      "rating": 4.9,
      "price": 122.23,
      "description": "Tour package 3 days 2 nights..."
    }
  ]
}
```

#### GET /api/recommendations/{id}
Récupérer une recommandation spécifique.

#### POST /api/recommendations
Créer une nouvelle recommandation (authentification requise).

#### PUT /api/recommendations/{id}
Modifier une recommandation (authentification requise).

#### DELETE /api/recommendations/{id}
Supprimer une recommandation (authentification requise).

### Opération personnalisée

#### GET /api/recommendations/top-rated
Récupérer les recommandations les mieux notées.

**Query parameters:**
- `minRating` - Note minimum (défaut: 4.5)
- `limit` - Nombre de résultats (défaut: 5)

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "title": "Wales Beach",
    "image": "/p1.jpg",
    "rating": 4.9,
    "price": 122.23,
    "description": "..."
  }
]
```

## Authentification

L'API utilise **JWT (JSON Web Tokens)** pour l'authentification.

1. Se connecter via `/api/login` pour obtenir un token (utiliser le compte de test : `admin@example.com` / `password123`)
2. Utiliser le token dans le header `Authorization: Bearer {token}` pour les opérations protégées

**Opérations publiques (sans authentification):**
- GET /api/packages
- GET /api/packages/{id}
- GET /api/recommendations
- GET /api/recommendations/{id}
- GET /api/recommendations/top-rated

**Opérations protégées (authentification requise):**
- POST /api/packages
- PUT /api/packages/{id}
- DELETE /api/packages/{id}
- POST /api/recommendations
- PUT /api/recommendations/{id}
- DELETE /api/recommendations/{id}

## Instructions de déploiement

### Prérequis
- PHP ≥ 8.1
- Composer
- SQLite (ou PostgreSQL/MySQL)

### Installation

1. Cloner le projet
```bash
cd api-platform
```

2. Installer les dépendances
```bash
composer install
```

3. Configurer la base de données dans `.env`
```
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
```

4. Créer la base de données et exécuter les migrations
```bash
php bin/console doctrine:migrations:migrate
```

5. Charger les données de test
```bash
php bin/console doctrine:fixtures:load
```

6. Générer les clés JWT (si nécessaire)
```bash
php bin/console lexik:jwt:generate-keypair
```

7. Lancer le serveur de développement
```bash
symfony server:start
# ou
php -S localhost:8000 -t public
```

L'API sera accessible sur `http://localhost:8000`

### Documentation Swagger

La documentation Swagger est disponible sur :
- **Swagger UI:** http://localhost:8000/api/docs
- **ReDoc:** http://localhost:8000/api/docs?ui=re_doc
- **OpenAPI JSON:** http://localhost:8000/api/docs.json

## Configuration CORS

CORS est configuré pour autoriser les requêtes depuis `http://localhost:3000` (front Next.js).

## Tests

Exécuter les tests fonctionnels :
```bash
php bin/phpunit
```

Les tests couvrent :
- Récupération de la collection de packages
- Création de package avec authentification
- Récupération de la collection de recommandations
- Opération personnalisée top-rated

## Intégration avec Next.js

Le front Next.js est configuré pour utiliser cette API via la variable d'environnement `NEXT_PUBLIC_API_BASE`.

Dans le front, créer un fichier `.env.local` :
```
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

Les composants `PopularPackage` et `TravelRecommendations` récupèrent automatiquement les données depuis l'API.

