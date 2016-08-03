import BaseService from './base.service';

export default class OrderService extends BaseService {

    /**
     * constructor
     */
    constructor() {
        super();
    }

    /**
     * @param {Object} order
     * @return {Promise}
     */
    addOrder(restaurantId) {
        var order = {
            restaurant: restaurantId,
            is_closed: false,
            date_created: new Date().toISOString(),
            className: this.constant.orderClass,
        }

        return this.add(order);
    }

    /**
     * fetches specific order
     * @param {Number} id
     * @return {Promise}
     */
    getOrder(id) {
        var query = {
            id: id,
            className: this.constant.orderClass
        };

        return this.fetch(query);
    }

    /**
     * fetches orders
     * @return {Promise}
     */
    getOrders() {
        return this.fetchList(this.constant.orderClass);
    }
}
