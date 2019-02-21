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
        fetch(url, { method: 'GET', mode: 'cors' })
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

    /**
     * Create a new store
     * @param {Store} store store to add in the database
     * @param {function} callback function to execute once the store was created
     */
    static createAStore(store, callback){
        const url = `${HTTPService.getBaseUrl()}/api/stores`;
        fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: store.toSupportedJSON()
            })
            .then(response => {
                response.json().then((parsedResponse) => {
                    callback(new Store(parsedResponse._id,
                        parsedResponse.name,
                        parsedResponse.location,
                        parsedResponse.region));
                }).catch(error => console.log(error.message));
            })
            .catch(error => {
                console.log(error.message);
        });
    }
}

export default StoreService;  