import HTTPService from '../../HTTPService';
import Store from './Store';

/**
 * Exposes all needed function to create and find stores
 */
class StoreService {
    /**
     * Search all stores
     * @param {function} callback function to execute once the stores are been found
     */
    static getStores(callback) {
        const url = `${HTTPService.getBaseUrl()}/api/stores`;
        fetch(url, { method: 'GET' })
            .then(response => {
                response.json().then((parsedResponse) => {
                    const data = [];
                    for (const store of parsedResponse) {
                        data.push(new Store(store._id,
                            store.name,
                            store.location,
                            store.region));
                    }
                    callback(data);
                }).catch(error => console.log(error.message));
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}

export default StoreService;  