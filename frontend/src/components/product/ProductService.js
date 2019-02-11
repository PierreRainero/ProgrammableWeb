import Product from './Product';

/**
 * Exposes all needed function to find one or multiple products
 */
class ProductService {

    static getBaseUrl() {
        return process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL}:${process.env.REACT_APP_DEV_PORT}` : process.env.REACT_APP_PROD_URL;
    }

    /**
     * Find one product using his barcode
     * @param {string} code barcode to search
     */
    static searchProductByCode(code) {
        const url = `${this.getBaseUrl()}/api/products/${code}`;
        return new Promise(function (resolve, reject) {
            fetch(url, { method: 'GET' })
                .then(response => {
                    response.json().then((parsedResponse) => {
                        resolve(new Product(parsedResponse.code, parsedResponse.name, parsedResponse.score, parsedResponse.nutrigrade, parsedResponse.novaGroup, parsedResponse.ingredients, parsedResponse.allergens, parsedResponse.additives));
                    }).catch(error => reject(error));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Search products from their names
     * @param {string} name name to search
     * @param {function} callback function to execute once the products are been found
     */
    static searchProductsByName(name, callback) {
        const url = `${this.getBaseUrl()}/api/products?name=${name}`;
        fetch(url, { method: 'GET' })
            .then(response => {
                response.json().then((parsedResponse) => {
                    const data = [];
                    for (const prod of parsedResponse) {
                        data.push(new Product(prod.code, prod.name, prod.score, prod.nutrigrade, prod.novaGroup, prod.ingredients, prod.allergens, prod.additives));
                    }
                    callback(data);
                }).catch(error => console.log(error.message));
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    /**
     * Get image for a specific product using OpenFoodFacts API
     * @param {number} code barcode to find the product
     * @param {function} callback function to execute once the image product has been found
     */
    static getProductImage(code, callback) {
        fetch(`https://fr.openfoodfacts.org/api/v0/produit/${code}.json`, { method: 'GET' })
            .then(response => {
                response.json().then((parsedResponse) => {
                    if (parsedResponse.status === 1 && parsedResponse.product.image_url) {
                        callback(parsedResponse.product.image_url);
                    } else {
                        callback('');
                    }
                });
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}

export default ProductService;  