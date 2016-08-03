import React from 'react';
import ReactDOM from 'react-dom';

import './styles/style.css';

import Hello from './content/hello.jsx';
import World from './content/world.jsx';

import $order from './services/order.service.js';
import $test from './services/test.service.js';

var orderService = new $order();
var testService = new $test();

testService.getTestRestaurant()
	.then(restaurant => {
		return orderService.addOrder(restaurant.id);
	})
	.then(()=>{
		console.log('added new order');
		return;
	})
	.then(()=> {
		return orderService.getOrders();
	})
	.then(orders => {
		console.log('all orders', orders);
	})
	.then(()=> {
		console.log('end of test');
	})

// import Test from './views/test/test.module.jsx';

// ReactDOM.render(Test, document.querySelector('div'));
