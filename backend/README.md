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

`/api/products?page=13984&itemsPerPage=2` : **GET**  
Permet de retrouver tous les produits par groupe. Les produits sont classés en fonction de leur "id", on peut définir le nombre de produits par groupe et quel groupe on souhaite chercher :  
**Par défaut :** _page=1, itemsPerPage=20_

```json
[
    {
        "code": 3760198720162,
        "name": "Poudre d'amande blanche",
        "score": 85,
        "nutrigrade": "",
        "novaGroup": 1,
        "ingredients": [
            {
                "id": "Amandes-blanchies-crues",
                "name": "amandes blanchies crues"
            }
        ],
        "allergens": [],
        "additives": []
    },
    {
        "code": 3760198720391,
        "name": "Olive noire à la grecque ",
        "score": 75,
        "nutrigrade": "D",
        "novaGroup": 3,
        "ingredients": [
            {
                "id": "Olive",
                "name": "olives"
            },
            {
                "id": "Canola-oil",
                "name": "huile de colza"
            },
            {
                "id": "Salt",
                "name": "sel"
            }
        ],
        "allergens": [],
        "additives": []
    }
]
```

`/api/products/{productCode}` : **GET**  
Permet de retrouver un produit à partir de son code (code barre). L'objet retourné dans le cas d'une recherche réussit (code 200) et où le _productCode_ vaut "011324361009736515181027101704" est le suivant :

```json
{
    "code": 1.1324361009736515e+28,
    "name": "madeleine coquille",
    "score": 58,
    "nutrigrade": "",
    "novaGroup": 4,
    "ingredients": [
        {
            "id": "Ingredient",
            "name": "Ingrédients"
        },
        {
            "id": "Wheat-flour",
            "name": "Farine de BLE"
        },
        {
            "id": "Sugar",
            "name": "sucre"
        },
        {
            "id": "Oeufs-frais",
            "name": "OEUFS frais"
        },
        {
            "id": "Canola-oil",
            "name": "huile de colza"
        },
        {
            "id": "Stabiliser",
            "name": "stabilisants"
        },
        {
            "id": "Glycerol",
            "name": "glycérol"
        },
        {
            "id": "Sorbitol",
            "name": "sorbitols"
        },
        {
            "id": "Glucose-and-fructose-syrup",
            "name": "sirop de glucose-fructose"
        },
        {
            "id": "Arômes-naturels-poudres-à-lever-diphosphates-carbonates-de-sodium",
            "name": "arômes naturels poudres à lever diphosphates carbonates de sodium"
        },
        {
            "id": "Salt",
            "name": "sel"
        },
        {
            "id": "Amidon-de-bee-correcteur-d-acidité",
            "name": "amidon de BEE correcteur d acidité"
        },
        {
            "id": "Lait-et-soja",
            "name": "Lait et soja"
        },
        {
            "id": "A-conserver-au-frais-et-au-sec",
            "name": "A conserver au frais et au sec"
        },
        {
            "id": "Citric-acid",
            "name": "acide citrique"
        },
        {
            "id": "Peut-contenir-des-traces-de-fruits-à-coque",
            "name": "Peut contenir des traces de fruits à coque"
        }
    ],
    "allergens": [
        "Ble",
        "Oeufs"
    ],
    "additives": [
        "E422",
        "E420",
        "E450",
        "E330"
    ]
}
```