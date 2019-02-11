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
       └── /recipes
       └── /stores
            └── /{storeId}
```

## Fonctionnalités

### Produits

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

`/api/products?name=tortellini` : **GET**   
Permet de retrouver les produits contenant le chaine recherché (non sensible à la casse). Les produits sont classés par leur "id" :
```json
[
  {
    "code": 1312324,
    "name": "Tortellini Pesto Basilic & Pignons",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  },
  {
    "code": 1240278544038,
    "name": "Tortellini jambon cru",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  },
  {
    "code": 3256221876055,
    "name": "Tortellini 3 fromages",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  },
  {
    "code": 4005722000105,
    "name": "Tortellini mit Fleisch",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  },
  {
    "code": 4028856000216,
    "name": "Camaletti Tortellini",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  },
  {
    "code": 5060428432277,
    "name": "EF Tortellini Bolognese",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  },
  {
    "code": 9002600632316,
    "name": "Gemüse Tortellini",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  }
]
```

`/api/products?name=tortellini pesto` : **GET**   
En ajoutant un second mot lors de la recherche, l'on aura donc des résultats plus précis.
```json
[
  {
    "code": 1312324,
    "name": "Tortellini Pesto Basilic & Pignons",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  }
]
```

**Par défaut :** _page=1, itemsPerPage=20_

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

`/api/products?ingredient={one_ingredient}&page=1&itemsPerPage=2` : **GET**  
Permet de trouver tous les produits qui ont un certain ingredient. Les produits sont classés en fonction de leur "id", on peut définir le nombre de produits par groupe et quel groupe on souhaite chercher :  
**Par défaut :** _page=1, itemsPerPage=20_

```json
[
    {
        "code": 152116,
        "name": "rillettes du mans",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [
        {
            "id": "Rillettes-du-mans-ingrédients-viande-de-porc",
            "name": "RILLETTES DU MANS INGRÉDIENTS Viande de porc"
        },
        {
            "id": "Origine-union-européenne-113-g-de-viande-de-porc-pour100-g",
            "name": "origine Union Européenne 113 g de viande de porc pour100 g"
        },
        {
            "id": "Gras-de-porc",
            "name": "gras de porc"
        },
        {
            "id": "Salt",
            "name": "sel"
        },
        {
            "id": "Pepper",
            "name": "poivre"
        },
        {
            "id": "Ingrédients-issus-de-l'agriculture-biologique-avec-opercule-de-protection",
            "name": "ingrédients issus de l'Agriculture Biologique Avec opercule de protection"
        }
        ],
        "allergens": [
        
        ],
        "additives": [
        
        ]
    }
]
```

### Recettes
`/api/recipes` : **GET**  
Permet de retrouver tous les recettes contenues dans la base de données. Les produits sont classés en fonction de leur "id":  
```json
[
  {
    "ingredients": [
      "20291174",
      "0064200116473"
    ],
    "comments": [],
    "_id": "5c60055c6196b85bfba02cdd",
    "name": "Cheese & Macaroni",
    "author": "Fabien",
    "createdAt": "2019-02-10T11:05:00.151Z",
    "updatedAt": "2019-02-10T11:05:00.151Z",
    "__v": 0
  },
  {
    "ingredients": [
      "01732344",
      "0064200116473"
    ],
    "comments": [],
    "_id": "5c6005c06196b85bfba02cde",
    "name": "Roquefort & Macaroni",
    "author": "Fabien",
    "createdAt": "2019-02-10T11:06:40.917Z",
    "updatedAt": "2019-02-10T11:06:40.917Z",
    "__v": 0
  }
]
```

`/api/recipes` : **POST**  
Permet de créer une nouvelle recette.   
**Exemple d'utilisation :** création de la recette "Cheese & Macaroni" :  
```json
{
    "name": "Cheese & Macaroni",
    "ingredients": [ "20291174", "0064200116473" ],
    "author": "Fabien"
}
```
* **name** : requis
* **ingredients** : requis (contenant au moins deux ingrédients)
* **author** : optionnel

`/api/recipes/{recipeId}/comments` : **GET**  
Permet de retrouver tous les commentaires associés à une recette. Les commentaires sont classés dans leur ordre de soumission (les plus anciens en premiers):  
```json
[
  {
    "_id": "5c6067a3516101c1efe7f130",
    "body": "Très bonne recette, je vais surement la proposer dans mon restaurant !",
    "author": "Philippe Etchebest",
    "created_at": "2019-02-10T18:04:19.178Z"
  },
  {
    "_id": "5c60685ddf8d1fc3a093e30b",
    "body": "Wonderful",
    "author": "Tim Cook",
    "created_at": "2019-02-10T18:07:25.411Z"
  }
]
```

`/api/recipes/{recipeId}/comments` : **POST**  
Permet de créer un nouveau commentaire par rapport à une recette.   
**Exemple d'utilisation :** ajout d'un commentaire pour la recette 5c60055c6196b85bfba02cdd (`/api/recipes/5c60055c6196b85bfba02cdd/comments`) :  
```json
{
	"body": "Très bonne recette, je vais surement la proposer dans mon restaurant !",
	"author": "Philippe Etchebest"
}
```
* **body** : comment
* **author** : optionnel

### Magasins

`/api/stores` : **POST**  
Permet de créer un nouveau magasin.   
**Exemple d'utilisation :** création du magasin "Carrefour - Antibes" :  
```json
{
    "name": "Carrefour - Antibes",
    "location": {
        "lat": 43.615575,
        "long":7.071389,
    },
}
```
* **name** : requis
* **location** : requis

`/api/stores` : **GET**  
Permet de retrouver tous les magasins contenues dans la base de données. Les magasins sont classés en fonction de leur "id":  
```json
[
  {
    "location": {
      "lat": 43.604087,
      "long": 7.089491
    },
    "_id": "5c617c61193cd709f1603d48",
    "name": "Carrefour - Antibes",
    "__v": 0
  },
  {
    "location": {
      "lat": 43.645932,
      "long": 7.049446
    },
    "_id": "5c617d39193cd709f1603d4a",
    "name": "Carrefour Market - Valbonne",
    "__v": 0
  }
]
```

`/api/stores?lat={latitude}&long={longitude}&range={range}` : **GET**  
Permet de retrouver tous les magasins contenues dans la base de données autour d'une position en définissant un rayon de recherche. Les magasins sont classés en fonction de leur "id":  
```json
[
  {
    "_id": "5c617c61193cd709f1603d48",
    "distance": 1.9379962893709548,
    "location": {
      "lat": 43.604087,
      "long": 7.089491
    }
  },
  {
    "_id": "5c617d7d193cd709f1603d4b",
    "distance": 0.409252166415119,
    "location": {
      "lat": 43.618015,
      "long": 7.075195
    }
  }
]
]
```

`/api/stores/{storeId}` : **GET**  
Permet de retrouver un promagasin à partir de son id. L'objet retourné dans le cas d'une recherche réussit (code 200) :

```json
  [
    {
    "location": {
      "lat": 43.604087,
      "long": 7.089491
    },
    "_id": "5c617c61193cd709f1603d48",
    "name": "Carrefour - Antibes",
    "__v": 0
  }
]
```