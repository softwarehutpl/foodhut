import BaseService from './base.service.js';

export default class OrderDishService extends BaseService {
    /*
     * constructor
     */
    constructor() {
        super();
    }

    /**
     * adds new order dish
     * @param {String} name
     * @param {Number} price
     * @param {Number} orderId
     * @param {Number} userId
     * @return {Promise}
     */
    addOrderDish(name, price, orderId, userId) {
        var orderDish = {
            name: name,
            price: price,
            order: orderId,
            user: userId,
            className: this.constant.orderDishesClass
        };

        return this.add(orderDish);
    }

    /**
     * adds new dish 
     * @param {String} dishName
     * @return {Promise}
     */
    addDish(dishName) {
        var dish = {
            dish_name: dishName,
            className: this.constant.dishClass
        };

        return this.add(dish);
    }

    /**
     * fetches all order dishes
     * @return {Promise}
     */
    getOrderDishes(id) {
        var query = {
            id: id,
            name: this.constant.orderDishesClass
        };

        return this.fetchList(query);
    }
}
