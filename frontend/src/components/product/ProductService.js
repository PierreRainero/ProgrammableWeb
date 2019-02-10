import Product from './Product';

/**
 * Exposes all needed function to find one or multiple products
 */
class ProductService {

    static getBaseUrl() {
        return process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL}:${process.env.REACT_APP_DEV_PORT}` : process.env.REACT_APP_PROD_URL;
    }

    /**
     * Find one product using his scan code
     * @param {string} code scan code to search
     */
    static searchProductByCode(code) {
        const url = `${this.getBaseUrl()}/api/products/${code}`;
        return new Promise(function(resolve, reject) {
            fetch(url, {method: 'GET'})
                .then(response => {
                    response.json().then((parsedResponse) => {
                        resolve(new Product(parsedResponse.code, parsedResponse.name, parsedResponse.score, parsedResponse.nutrigrade, parsedResponse.novaGroup, parsedResponse.ingredients, parsedResponse.allergens, parsedResponse.additives));
                    });
                })
                .catch(error => {
                    reject(error.message);
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
                });
            })
            .catch(error => {
                console.log(error.message);
        });
    }
}

export default ProductService;  