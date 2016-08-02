import './styles/style.css';

import Hello from './content/hello.jsx';
import World from './content/world.jsx';

import $order from './services/order.service.js';

var test = new $order();
test.getOrders()
	.then(orders => {
		console.log(orders);
	});
