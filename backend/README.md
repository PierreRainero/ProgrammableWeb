# Backend

## Informations sur l'équipe

* Membres :
  * [Fabien DURANDO](fabien.durando@outlook.com)
  * [Théo FRASQUET](theo.frasquet@gmail.com)
  * [Gregory MERLET](gregory.merlet@outlook.fr)
  * [Pierre RAINERO](pierre.rainero@hotmail.fr)
  * [Gaulthier TOUSSAINT](gaulthiertoussaint@gmail.com)

## Déploiement

Pour déployer cette application il est nécessaire de disposer des technologies suivantes :

* [NodeJS](https://nodejs.org)

Il faut ensuite utiliser la commande `npm i` pour récupérer toutes les dépendances nécessaires au bon fonctionnement de l'application. Pour lancer le serveur il suffit d'utiliser la commande `npm start`.

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
**Par défaut :** _page=1, itemsPerPage=20_

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
Permet de retrouver un produit à partir de son code (code barre). L'objet retourné dans le cas d'une recherche réussit (code 200) et où le _productCode_ vaut "0000000003087" est le suivant :

```json
{
    "code":"0000000003087",
    "name":"Farine de blé noir"
}
```