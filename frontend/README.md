# Frontend

## Informations sur l'équipe

* Membres :
  * [Fabien DURANDO](fabien.durando@outlook.com)
  * [Théo FRASQUET](theo.frasquet@gmail.com)
  * [Gregory MERLET](gregory.merlet@outlook.fr)
  * [Pierre RAINERO](pierre.rainero@hotmail.fr)
  * [Gaulthier TOUSSAINT](gaulthiertoussaint@gmail.com)

## Techonologies

* [npm](https://www.npmjs.com/) 6.4.1
* [React](https://reactjs.org/) 16.7.0
* [Sass](https://sass-lang.com/guide) 4.11.0
* [React-Bootstrap](https://react-bootstrap.github.io/) 1.0.0-beta.5
* [Bootstrap](https://getbootstrap.com/) 4.2.1
* [FontAwesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) 0.1.4

## Deploiement

`npm i` : Permet toutes les dépendances nécessaires au bon fonctionnement de l'application.

### Environnement de test

`npm start` : Permet de lancer l'application dans un environnement de test (port 3000). Le déploiement n'est pas optimisé mais le projet recompile dynamiquement.

### Production

`npm run build` : Crée un dossier **"build"** dans lequel est créé une version _static_ de l'application. Celle-ci est optimisée et doit être utilisée pour la production.  
⚠ Il est nécessaire de disposer d'un serveur pour utiliser l'application ainsi déployée. Il est possible d'en simuler avec des outils comme [LiveServer](https://github.com/ritwickdey/vscode-live-server) pour "Visual Studio Code".