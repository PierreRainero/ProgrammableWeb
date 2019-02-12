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

`/api/products?name=tortellini&page=2&itemsPerPage=2` : **GET**  
Permet de retrouver tous les produits contenant le chaine recherché (non sensible à la casse) par groupe. Les produits sont classés en fonction de leur "id", on peut définir le nombre de produits par groupe et quel groupe on souhaite chercher :  
**Par défaut :** _page=1, itemsPerPage=20_

```json
[
  {
    "code": 854918002140,
    "name": "Olives vertes citron et romarin",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [],
    "allergens": [],
    "additives": []
  },
  {
    "code": 2152220,
    "name": "farce aux olives",
    "score": 65,
    "nutrigrade": "",
    "novaGroup": -1,
    "ingredients": [
      {
        "id": "Soja-33.5-%-carottes-oignons",
        "name": "soja 33.5% carottes oignons"
      },
      {
        "id": "Courgette",
        "name": "courgettes"
      },
      {
        "id": "Coulis-de-tomates",
        "name": "coulis de tomate"
      },
      {
        "id": "Blanc-d-oeuf",
        "name": "blanc d oeufs"
      },
      {
        "id": "Potato-starch",
        "name": "fécule de pomme de terre"
      },
      {
        "id": "Water",
        "name": "eau"
      },
      {
        "id": "Olives-noires-2-%-gomme-arabique",
        "name": "olives noires 2% gomme arabique"
      },
      {
        "id": "Sunflower-oil",
        "name": "huile de tournesol"
      },
      {
        "id": "Garlic",
        "name": "ail"
      },
      {
        "id": "Sea-salt",
        "name": "sel marin"
      },
      {
        "id": "Peut-contenir-des-traces-de-fruits--à--coque-et-de-graines-de-sésame",
        "name": "peut contenir des traces de fruits  à  coque et de graines de sésame"
      }
    ],
    "allergens": [
      "Soja",
      "Blanc-d-oeufs"
    ],
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

### Prix

`/api/prices` : **POST**
Permet d'ajouter une information de prix pour un produit dans un point de vente. La requête doit avoir un corps avec les champs et leurs contraintes suivantes :

* `productCode` doit être une chaîne de caractères correspondant à un code de produit existant
* `storeId` doit être une chaîne de caractères correspondant à la valeur ObjectID de point de vente existant
* `price` doit être un nombre strictement positif

`/api/prices?productCode={product_code}&storeId={store_id}` : **GET**

Permet de trouver les informations de prix correspondant aux produit et/ou au point de vente spécifié. Ces deux paramètres sont optionnels, si ils sont tous les deux absents, tous les prix seront retournés.

### Recettes

`/api/recipes?page=1&itemsPerPage=2` : **GET**  
Permet de retrouver tous les recettes contenues dans la base de données, par groupe. Les produits sont classés en fonction de leur "id", on peut choisir le nombre de recettes par groupe et quel groupe l'on souhaite chercher :  
**Par défaut :** _page=1, itemsPerPage=20_

```json
[
  {
    "_id": "5c60055c6196b85bfba02cdd",
    "name": "Cheese & Macaroni",
    "comments": [
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
    ],
    "author": "Fabien",
    "ingredients": [
      {
        "code": 20291174,
        "name": "Cheese slices",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      },
      {
        "code": 64200116473,
        "name": "Macaroni",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      }
    ]
  },
  {
    "_id": "5c6005c06196b85bfba02cde",
    "name": "Roquefort & Macaroni",
    "comments": [
      {
        "_id": "5c606bf16f8bbbc82c22e55a",
        "body": "Niceee !",
        "author": "Zizou",
        "created_at": "2019-02-10T18:22:41.892Z"
      },
      {
        "_id": "5c606bf76f8bbbc82c22e55b",
        "body": "Niceee !",
        "author": "Zizou",
        "created_at": "2019-02-10T18:22:47.403Z"
      }
    ],
    "author": "Fabien",
    "ingredients": [
      {
        "code": 1732344,
        "name": "Roquefort",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      },
      {
        "code": 64200116473,
        "name": "Macaroni",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      }
    ]
  }
]
```

`/api/recipes?name=macaroni&page=1&itemsPerPage=2` : **GET**  
Permet de retrouver tous les recettes contenant le chaine recherché (non sensible à la casse), par groupe. Les produits sont classés en fonction de leur "id", on peut choisir le nombre de recettes par groupe et quel groupe l'on souhaite chercher :    
**Par défaut :** _page=1, itemsPerPage=20_
```json
[
  {
    "_id": "5c60055c6196b85bfba02cdd",
    "name": "Cheese & Macaroni",
    "comments": [
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
    ],
    "author": "Fabien",
    "ingredients": [
      {
        "code": 20291174,
        "name": "Cheese slices",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      },
      {
        "code": 64200116473,
        "name": "Macaroni",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      }
    ]
  },
  {
    "_id": "5c6005c06196b85bfba02cde",
    "name": "Roquefort & Macaroni",
    "comments": [
      {
        "_id": "5c606bf16f8bbbc82c22e55a",
        "body": "Niceee !",
        "author": "Zizou",
        "created_at": "2019-02-10T18:22:41.892Z"
      },
      {
        "_id": "5c606bf76f8bbbc82c22e55b",
        "body": "Niceee !",
        "author": "Zizou",
        "created_at": "2019-02-10T18:22:47.403Z"
      }
    ],
    "author": "Fabien",
    "ingredients": [
      {
        "code": 1732344,
        "name": "Roquefort",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      },
      {
        "code": 64200116473,
        "name": "Macaroni",
        "score": 65,
        "nutrigrade": "",
        "novaGroup": -1,
        "ingredients": [],
        "allergens": [],
        "additives": []
      }
    ]
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


`/api/products/{recipeId}` : **GET**  
Permet de retrouver une recette à partir de son id. L'objet retourné dans le cas d'une recherche réussit (code 200) et où le _recipeId_ vaut "5c61a630cf721c1447e2c38e" est le suivant :


```json
{
  "_id": "5c61a630cf721c1447e2c38e",
  "name": "Le merlet bleu sauce citron",
  "comments": [
    {
      "_id": "5c61a6ebcf721c1447e2c38f",
      "body": "Un délice, choisissez un merlet bleu bien tendre !!",
      "author": "Gaulthier Toussaint",
      "created_at": "2019-02-11T16:46:35.397Z"
    }
  ],
  "ingredients": [
    {
      "code": "3760068130121",
      "name": "Le merle",
      "score": 65,
      "nutrigrade": "",
      "novaGroup": -1,
      "ingredients": [],
      "allergens": [],
      "additives": []
    },
    {
      "code": "4762188803731",
      "name": "citron bio",
      "score": 67,
      "nutrigrade": "",
      "novaGroup": 4,
      "ingredients": [
        {
          "id": "Ingredient",
          "name": "ingrédients"
        },
        {
          "id": "Water",
          "name": "eau"
        },
        {
          "id": "Jus-de-citron-biologique",
          "name": "jus de citron biologique"
        },
        {
          "id": "Acid",
          "name": "acidifiant"
        },
        {
          "id": "Citric-acid",
          "name": "acide citrique"
        },
        {
          "id": "Huile-essentielle-de-citron-biologique",
          "name": "huile essentielle de citron biologique"
        },
        {
          "id": "Valeurs-nutritionnelles-moyennes-pour-100-ml--energie-112k",
          "name": "Valeurs nutritionnelles moyennes pour 100 ml \nEnergie 112k"
        },
        {
          "id": "26--matieres-grasses-og-dont-acides-gras-saturés-og-glucides-0‚4-g-dont-sucres-0‚4-g-proteins-01g-sel-og",
          "name": "26 \nMatieres grasses Og dont acides gras saturés Og\nGlucides 0‚4 g dont sucres 0‚4 g\nProteins 01g\nSel Og"
        }
      ],
      "allergens": [],
      "additives": [
        "E330"
      ]
    }
  ],
  "createdAt": "2019-02-11T16:43:28.659Z",
  "updatedAt": "2019-02-11T16:46:35.398Z"
}
```

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