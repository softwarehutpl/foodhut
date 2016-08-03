import React from 'react';
import { Provider, connect } from 'react-redux';
import OrderView from './order.view.jsx';
import OrderStore from './order.store.js';
import $orderDish from '../../services/order-dish.service.js';
import $user from '../../services/user.service.js';

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
			var orderDishService = new $orderDish();
			orderDishService.addOrderDish(dishName, price, 28, 1);
		}
	};
}

function refetch() {
	var orderDishService = new $orderDish();
	orderDishService.getOrderDishes()
		.then(function success(orderDishes){
			var userService = new $user();
			OrderStore.dispatch({
				type: 'INIT_DATA',
				orderDishes: orderDishes.objects.map(orderDish=>{
					console.log('orderDishX', orderDish);
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
refetch();
export default <Provider store={OrderStore}><OrderDishes/></Provider>;