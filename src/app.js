import React from 'react';
import ReactDOM from 'react-dom';

import './styles/style.css';


// import Test from './views/test/test.module.jsx';

// ReactDOM.render(Test, document.querySelector('div'));

import Order from './views/order/order.module.jsx';
ReactDOM.render(Order, document.querySelector('div'));


// import $test from './services/order-dish.service.js';
// import $order from './services/order.service.js';
// var orderService = new $order();
// orderService.getOrders()
// 	.then(asd => {
//         console.log('aaaaaaaaaaaaaa', asd);
//     });
// var test = new $test();
// test.getOrderDishes()
//     .then(asd => {
//         console.log('bbbbbbbbbbbbbbb', asd);
//     });


