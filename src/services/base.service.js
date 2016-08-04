import Syncano from 'syncano';
import constant from '../constant.js';

export default class BaseService {
    /**
     * constructor
     */
    constructor() {
    	this.constant = constant;
        this.connection = Syncano({ accountKey: 'f105d32a319e87a61c349e5ee2ec5dbec3d7b7f8' });
    }

    /**
     * adds entity
     * @parameter {Object} query
     * @return {Promise}
     */
    add(entity) {
        entity.instanceName = this.constant.instanceName;

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
        query.instanceName = this.constant.instanceName;

        return this.connection.DataObject
            .please()
            .get(query);
    }

    /**
     * fetch list for name
     * @parameter {String} name
     * @return {Promise}
     */
    fetchList(name) {
        var query = {
            name: name,
            instanceName: this.constant.instanceName,
        };

        return this.connection.DataEndpoint
            .please()
            .fetchData(query);
    }
}
