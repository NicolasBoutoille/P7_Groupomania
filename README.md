# GROUPOMANIA (Projet final Openclassrooms)
Créer un réseau social d'entreprise

## Compétences évaluées :

* Authentifier un utilisateur et maintenir sa session
* Personnaliser le contenu envoyé à un client web
* Gérer un stockage de données à l'aide de SQL
* Implémenter un stockage de données sécurisé en utilisant SQL

## Technologies utilisées :

* NodeJS
* MYSQL
* VueJS

## Installation :

Prérequis :
* Git: https://git-scm.com/downloads
* Node.js: https://nodejs.org/fr/download/
* MySQL: https://www.mysql.com/fr/downloads/

1. Cloner le repository :
```
git clone https://github.com/NicolasBoutoille/P7_Groupomania.git
```

2. Importer la base de données située à la racine du projet:
```
mysql -u root -p groupomania < dump.sql
```

### Backend :

3. Dans le dossier backend/config, créer un fichier .env contenant :
```
PORT= numéro de port pour le serveur backend
DB_HOST=localhost
DB_USER= username de votre base de données
DB_PASSWORD= mot de passe de votre base de données
DB_NAME=groupomania
TOKEN= clé secrète token
```

4. Créer un dossier images dans le dossier backend

5. Ouvrir un terminal dans le dossier backend puis :
```
npm install
npm start
```

### Frontend :

6. Ouvrir un terminal dans le dossier frontend :
```
npm install
npm run serve
```



