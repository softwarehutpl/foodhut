import React from 'react';
import { Provider, connect } from 'react-redux';
import OrderView from './order.view.jsx';
import OrderStore from './order.store.js';
import $orderDish from '../../services/order-dish.service.js';
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
			OrderStore.dispatch({
				type: 'INIT_DATA',
				orderDishes: orderDishes.objects,
			});
		});
}

let OrderDishes = connect(storeToProps, dispatchToProps)(OrderView);
refetch();
export default <Provider store={OrderStore}><OrderDishes/></Provider>;