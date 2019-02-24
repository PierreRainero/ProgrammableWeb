# Programmable web : Elfy

## Présentation

Ce projet a été réalisé dans le cadre d'un double module visant à mettre en lumière les problématiques "Client - Server" au travers de technologies modernes. Il nous était demandé de respecter des grandes lignes suivantes :

* Basic functionality
  * search for existing foods in the DB according to given criteria ;
  * assign foods an overall score according to some mix of criteria ;
  * compare and order similar items according to some criteria, eg, nutritional value ;
  * parse a simple recipe and search for suitable ingredients from the DB. Since this is initially aimed at students, recipes are really simple. For example, the classic macaroni & cheese contains macaroni...and cheese. However, the ingredients will be selected according to some criteria, eg, only macaroni and cheese with no EXXX additives.
* Adding new criteria
  * missing from the database is any pricing information. Your app will present a way for users to add price information: price, store, date of entry ;
  * determine the price of a given recipe based on the prices of given ingredients ;
  * searching for items by price can be limited to a given store, or to all stores within a given region. Store locations can be geolocalized and displayed on a map.
* Social aspects
  * users can post their own recipes into a recipe-space, comment on recipes posted by others etc.

## Accessibilité

Le projet est actuellement hébergé en ligne, il est possible d’accéder aux deux parties de l'application via les adresses suivantes :

* [Client side](https://programmable-web.herokuapp.com/)
* [Server side](https://enigmatic-reaches-75165.herokuapp.com/api)

## Documentation

Pour obtenir plus de détails ou déployer notre application en local par exempl, merci de se repporter au "[write-up](./doc/write-up.pdf)" et aux fichiers "README" de chaque partie de l'application.