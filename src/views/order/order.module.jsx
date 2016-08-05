import React from 'react';
import { Provider, connect } from 'react-redux';
import OrderView from './order.view.jsx';
import $orderDish from '../../services/order-dish.service.js';
import $user from '../../services/user.service.js';

import $test from '../../services/test.service.js';
import MOCK from '../../mock.js';
import Store from '../../store';

// TODO:
// account balance DONE
// zapisywanie autocomplete'a
// czytanie z autocomplete'a
// usuwanie swojego zamowienia

var orderDishService = new $orderDish();
var userService = new $user();

var testService = new $test();

var USER = null;
testService.getLoggedUser(MOCK.USER_ID)
	.then(function(user) {
		USER = user;
	});

function storeToProps(store) {
	return {
		orderDishes: store.order.orderDishes,
		account: store.order.account,
	};
}

function dispatchToProps(dispatch) {
	return {
		addDish: function addDish(dish) {
			dispatch({
				type: 'ADD_DISH',
				user: { username: USER.username},
				name: dish.name,
				price: dish.price,
			});
			dish.order = MOCK.ORDER_ID;
			dish.user = MOCK.USER_ID;
			orderDishService.addOrderDish(dish)
				.then(() => {
					fetchDishes();
					fetchAccount();
				});
		},
		removeDish: function removeDish(dish) {
			orderDishService.removeOrderDish(dish)
				.then(()=>{
					fetchDishes();
					fetchAccount();
				});
		}
	};
}

function fetchDishes() {
	orderDishService.getOrderDishes(MOCK.ORDER_ID)
		.then(function success(orderDishes){
			Store.dispatch({
				type: 'INIT_DATA',
				orderDishes: orderDishes.objects
			});
		});
}

function fetchAccount() {
	userService.getUser(MOCK.USER_ID)
		.then(function success(user){
			Store.dispatch({
				type: 'INIT_USER_PROFILE',
				account: user,
			});
		})
		.catch((error) => {
            console.log(`Get rorder error: ${error}`);
        });
}

let OrderDishes = connect(storeToProps, dispatchToProps)(OrderView);
fetchAccount();
fetchDishes();

export default connect(storeToProps, dispatchToProps)(OrderView);