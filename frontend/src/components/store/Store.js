/**
 * Class representing a store
 */
class Store {
    /**
     * Normal constructor
     * @param {string} id sotre ir
     * @param {string} name store name
     * @param {object} location coordinates of the store : { lat: 43.618015, lng: 7.075195}
     * @param {string} region store region name
     */
    constructor(id, name, location, region){
        this.id = id;
        this.name = name;
        this.location = location;
        this.region = region;
    }

    /**
     * Convert a store object to JSON understandable by the backend
     * @return {string} name and location in a JSON string
     */
    toSupportedJSON() {
        return JSON.stringify({ name: this.name, location: this.location });
    }
}

export default Store;