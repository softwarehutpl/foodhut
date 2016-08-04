import BaseServcie from './base.service.js';

const restaurantClass = 'restaurants';

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
            className: restaurantClass
        };

        return this.fetch(query);
    }
}
