# Projet 6 - PIQUANTE

## *Construisez une API sécurisée pour une application d'avis gastronomiques*

## Mission

Réaliser le backend d'une application d’évaluation des sauces piquantes appelée “*Piquante*”.

* Implémenter un modèle logique de données conformément à la réglementation.
* Mettre en œuvre des opérations CRUD de manière sécurisée.
* Stocker des données de manière sécurisée.

### 1. Installation

:file_folder: **frontend** :

* frameworks : <kbd>**angular version 13.2.4**</kbd>


:file_folder: **backend** :

* frameworks :  <kbd>**Express**</kbd>
* packages :  <kbd>**bcrypt**</kbd> / <kbd>**crypto-js**</kbd> / <kbd>**dotenv**</kbd> / <kbd>**express-validator**</kbd> / <kbd>**jsonwebtoken**</kbd> / <kbd>**multer**</kbd> / <kbd>**Morgan**</kbd> / <kbd>**mongoose**</kbd> / <kbd>**mongoose-unique-validator**</kbd> / <kbd>**nodemon**</kbd>

dans les deux dossiers pour une installation rapide :
```
npm install
```
### 2. Paramétrer dotenv 

Créer un fichier `.env` dans le dossier <kbd> :file_folder: backend </kbd>

```
PORT = 3000 

DB_USERNAME = "XXXXXXXXXX"
DB_PASSWORD = "XXXXXXXXX"
DB_CLUSTER = "XXXXXXXXX"

CRYPTOJS_EMAIL = "XXXXXXXX"
TOKEN = "XXXXXXXX"
```

### 3. Lancer le projet

Dans le dossier <kbd> :file_folder: frontend </kbd>

- Pour avoir accès au serveur de développement : run `npm start` ou `ng serve` (Rendez-vous sur http://localhost:4200/)


Dans le dossier <kbd> :file_folder: backend </kbd>
- Lancer le serveur : `node server` ou `npm run start` ou `nodemon server`