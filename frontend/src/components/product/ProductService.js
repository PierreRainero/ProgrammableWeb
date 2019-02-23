import HTTPService from '../../HTTPService';
import Product from './Product';
import Store from '../store/Store';

/**
 * Exposes all needed function to find one or multiple products
 */
class ProductService {
    /**
     * Find one product using his barcode
     * @param {string} code barcode to search
     * @return {Promise} promise
     */
    static searchProductByCode(code) {
        const url = `${HTTPService.getBaseUrl()}/api/products/${code}`;
        return new Promise(function (resolve, reject) {
            fetch(url, { method: 'GET', mode: 'cors' })
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
     * Get number of result for specific product name
     * @param {string} name name to search
     * @param {function} callback function to execute once the products are been found
     */
    static getNumberOfProductsForName(name, callback) {
        const url = `${HTTPService.getBaseUrl()}/api/products?name=${name}&count=true`;
        fetch(url, { method: 'GET', mode: 'cors', })
            .then(response => {
                response.json().then((parsedResponse) => {
                    callback(parsedResponse.numberOfProducts);
                }).catch(error => console.log(error.message));
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    /**
     * Search products from their names
     * @param {string} name name to search
     * @param {number} page page to display
     * @param {number} itemsPerPage number of elements per page
     * @param {function} callback function to execute once the products are been found
     */
    static searchProductsByName(name, page, itemsPerPage, callback) {
        const url = `${HTTPService.getBaseUrl()}/api/products?name=${name}&page=${page}&itemsPerPage=${itemsPerPage}`;
        fetch(url, { method: 'GET', mode: 'cors' })
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
     * Find recipes where a product is used
     * @param {string} code barcode to search
     * @return {Promise} promise
     */
    static getProductRecipes(code) {
        const url = `${HTTPService.getBaseUrl()}/api/products/${code}/recipes`;
        return new Promise(function (resolve, reject) {
            fetch(url, { method: 'GET', mode: 'cors' })
                .then(response => {
                    response.json().then((parsedResponse) => {
                        resolve(parsedResponse);
                    }).catch(error => reject(error));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Find prices of a product is all stores
     * @param {string} code barcode to search
     * @return {Promise} promise
     */
    static getProductPrices(code) {
        const url = `${HTTPService.getBaseUrl()}/api/prices?productCode=${code}`;
        return new Promise(function (resolve, reject) {
            fetch(url, { method: 'GET', mode: 'cors' })
                .then(response => {
                    response.json().then((parsedResponse) => {
                        let prices = [];
                        for (let price of parsedResponse) {
                            if(price.store_id && price.price)
                                prices.push({ store: new Store(price.store_id._id, price.store_id.name, null, null), price: price.price });
                        }
                        resolve(prices);
                    }).catch(error => reject(error));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Set the price of a product in a given store
     * @param {string} productCode code of the product
     * @param {string} storeId id of the store
     * @param {number} price price of the product
     * @return {Promise} promise
     */
    static setProductPrice(productCode, storeId, price) {
        const url = `${HTTPService.getBaseUrl()}/api/prices`;
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productCode: productCode,
                    storeId: storeId,
                    price: price
                })
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get image for a specific product using OpenFoodFacts API
     * @param {number} code barcode to find the product
     * @param {AbortController.signal} signal signal controller to interact with the fetch operation
     * @param {function} callback function to execute once the image product has been found
     */
    static getProductImage(code, signal, callback) {
        fetch(`https://fr.openfoodfacts.org/api/v0/produit/${code}.json`,
            {
                method: 'GET',
                mode: 'cors',
                signal: signal
            })
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

            });
    }
}

export default ProductService;  