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

    getLoggedUser() {
        var query = {
            id: 1,
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
