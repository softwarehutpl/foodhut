import React from 'react';
import { Provider, connect } from 'react-redux';
import OrderView from './order.view.jsx';
import OrderStore from './order.store.js';
import $orderDish from '../../services/order-dish.service.js';
import $user from '../../services/user.service.js';
import $test from '../../services/test.service.js';

// export default class OrderModule {

// }

var userService = new $user();
var orderDishService = new $orderDish();
var testService = new $test();

var USER = null;
var ORDER = null;
testService.getLoggedUser()
	.then(function(user) {
		USER = user;
	});

testService.getCurrentOrder()
	.then(function(order) {
		ORDER = order;
	});


function storeToProps(store) {
	return {
		orderDishes: store.orderDishes,
	};
}

function dispatchToProps(dispatch) {
	return {
		addDish: function addDish(dishName, price) {
			dispatch({
				type: 'ADD_DISH',
				dishName: dishName,
				price: price,
			});
			orderDishService.addOrderDish(dishName, price, ORDER.id, USER.id)
				.then(() => {
					fetchDishes();
				});
		}
	};
}

function fetchDishes() {
	//orderDishService.getOrderDishes(ORDER ? ORDER.id : null)
	orderDishService.getOrderDishes(28)
		.then(function success(orderDishes){
			OrderStore.dispatch({
				type: 'INIT_DATA',
				orderDishes: orderDishes.objects.map(orderDish=>{
					return	{
						dishName: orderDish.name,
						price: orderDish.price,
						userName: orderDish.user.name,
					};
				}),
			});
		});
}

let OrderDishes = connect(storeToProps, dispatchToProps)(OrderView);
fetchDishes();
export default <Provider store={OrderStore}><OrderDishes/></Provider>;