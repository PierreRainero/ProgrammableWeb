
class ProductService {

    static getBaseUrl(){
        return process.env.NODE_ENV==='development'? `${process.env.DEV_URL}:${process.env.DEV_PORT}` : process.env.PROD_URL;
    }

    static getProducts(page, numberOfItems){
        const url = `${this.getBaseUrl()}/products?page=${page}&itemsPerPage=${numberOfItems}`;
    }
}

export default ProductService;  