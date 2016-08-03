import BaseServcie from './base.service.js';

export default class TestService extends BaseServcie {
    /**
     * constructor
     */
    constructor() {
        super();
    }

    /*
     * fetches sample restaurant
     */
    getTestRestaurant() {
        var query = {
            id: 5,
            className: this.constant.restaurantClass
        };

        return this.fetch(query);
    }

    getLoggedUser(id) {
        var query = {
            id: id,
            className: this.constant.userClass
        };

        return this.fetch(query);
    }

    getCurrentOrder() {
        var query = {
            id: 28,
            className: this.constant.orderClass
        };

        return this.fetch(query);
    }
}
