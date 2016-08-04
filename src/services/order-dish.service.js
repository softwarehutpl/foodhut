import BaseService from './base.service.js';
import UserService from './user.service.js';

export default class OrderDishService extends BaseService {
    /*
     * constructor
     */
    constructor() {
        super();
        this.$user = new UserService;
    }

    /**
     * adds new order dish
     * @param {String} name
     * @param {Number} price
     * @param {Number} orderId
     * @param {Number} userId
     * @return {Promise}
     */
    addOrderDish(dish) {
        dish.className = this.constant.orderDishesClass;
        return this.add(dish)
            .then(() => {
                return this.$user.getUser(dish.user);
            })
            .then(user => {
                user.balance -= dish.price;
                return user.save();
            });
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

    removeDish(id) {
        var dish = {
            id: id,
            className: this.constant.orderDishesClass
        }

        return this.remove(dish);
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
