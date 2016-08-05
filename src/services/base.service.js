import Syncano from 'syncano';
import constant from '../constant.js';

export default class BaseService {
    /**
     * constructor
     */
    constructor() {
    	this.constant = constant;
        this.connection = Syncano({ 
            apiKey: '4a76384d8137935042a557e020ace03382cdc755',
            defaults: {
                instanceName: "autumn-field-2134"
            } 
        });
    }

    /**
     * adds entity
     * @parameter {Object} query
     * @return {Promise}
     */
    add(entity) {
        return this.connection.DataObject
            .please()
            .create(entity);
    }

    /**
     * get single entity 
     * @parameter {Object} query
     * @return {Promise}
     */
    fetch(query) {
        return this.connection.DataObject
            .please()
            .get(query);
    }

    /**
     * fetch list for name
     * @parameter {String} name
     * @return {Promise}
     */
    fetchList(query) {
        return this.connection.DataEndpoint
            .please()
            .fetchData(query);
    }
}
