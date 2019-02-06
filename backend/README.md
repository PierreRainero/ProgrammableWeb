# Backend

## Informations sur l'équipe

* Membres :
  * [Fabien DURANDO](fabien.durando@etu.unice.fr)
  * [Théo FRASQUET](fabien.frasquet@etu.unice.fr)
  * [Gregory MERLET](gregory.merlet@outlook.fr)
  * [Pierre RAINERO](pierre.rainero@hotmail.fr)
  * [Gaulthier TOUSSAINT](gaulthiertoussaint@gmail.com)

## Déploiement

Pour déployer cette application il est nécessaire de disposer des technologies suivantes :

* [NodeJS](https://nodejs.org)

Il faut ensuite utiliser la commande `npm i` pour récupérer les dépendances nécessaires au bon fonctionnement de l'application. Pour lancer le serveur il suffit alors d'utiliser la commande `npm start`.

## API

Une fois le serveur du "backend" lancé l'api suivante est exposée (port 3000) :

```text
  /
  ├── /api
       └── /products
             └── /{productCode}
```

## Fonctionnalités

`/api/products?page=1&itemsPerPage=3` : **GET**  
Permet de retrouver tous les produits par groupe. Les produits sont classés en fonction de leur "id", on peut définir le nombre de produits par groupe et quel groupe on souhaite chercher :

```json
[
    {
        "code": "00",
        "name": "lignaform"
    },
    {
        "code": "00000"
    },
    {
        "code": "0000000000031",
        "name": "Cacao"
    }
]
```

`/api/products/{productCode}` : **GET**  
Permet de retrouver un produit à partir de son code (code barre). L'objet retourné dans le cas d'une recherche réussit (code 200) est le suivant :

```json
{
    "code":"0000000003087",
    "name":"Farine de blé noir"
}
```