/**
 * Exposes all needed function to communicate with the backend
 */
class HTTPService {
    /**
     * Returns base url to used according to the deployement context
     * @return {string} base url to communicate with the backend
     */
    static getBaseUrl() {
        return process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_DEV_URL}:${process.env.REACT_APP_DEV_PORT}` : process.env.REACT_APP_PROD_URL;
    }
}

export default HTTPService;  