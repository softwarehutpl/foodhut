import './styles/style.css';

import Hello from './content/hello.jsx';
import World from './content/world.jsx';

import $order from './services/order.service.js';

var orderService = new $order();
var testRestaurant = null;
orderService.getTestRestaurant()
	.then(testRest => {
		testRestaurant = testRest;
		console.log('testRest', testRest);
	});

// orderService.addOrder({

// })

orderService.getOrders()
	.then(orders => {
		console.log(orders);
	});
