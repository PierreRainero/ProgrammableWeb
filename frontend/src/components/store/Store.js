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
}

export default Store;