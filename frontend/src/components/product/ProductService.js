
class ProductService {

    static getBaseUrl(){
        return process.env.NODE_ENV==='development'? `${process.env.REACT_APP_DEV_URL}:${process.env.REACT_APP_DEV_PORT}` : process.env.REACT_APP_PROD_URL;
    }

    static searchProductsByName(name, callback){
        const url = `${this.getBaseUrl()}/api/products?name=${name}`;
        console.log(url);
        fetch(url, {method: 'GET'})
            .then(response => {
                response.json().then((parsedResponse) => {
                    console.log(parsedResponse);
                });
                callback();
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}

export default ProductService;  