import BaseService from './base.service';

const orderClass = 'orders';
const restaurantClass = 'restaurants';

export default class OrderService extends BaseService {

    /**
     * constructor
     */
    constructor() {
        super();
    }

    /**
     * @param {Object} order
     * @param {Function} callback
     * @return {Promise}
     */
    addOrder(order, callback) {
        return this.connection.instance
            .class(orderClass)
            .dataObject()
            .add(order, callback);
    }

    /**
     * fetches specific order
     * @param {String} id
     * @param {Object} filter
     * @param {Function} callback
     * @return {Promise}
     */
    getOrder(id, filter, callback) {
        return this.connection.instance
            .class(orderClass)
            .dataObject()
            .detail(id, filter, callback);
    }

    /**
     * fetches restaurants
     * @return {Promise}
     */
    getOrders() {
        return this.connection.DataEndpoint
            .please()
            .fetchData({ name: 'orders', instanceName: 'autumn-field-2134' })
            .then(function(dataObjects) {
                return dataObjects;
            });
    }

    getTestRestaurant() {
    	console.log('this connection', this.connection.instance);
    	return this.connection.instance
            .class(restaurantClass)
            .dataObject()
            .detail(5);
    }
}
