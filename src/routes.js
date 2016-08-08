import React from 'react';
import { Route, IndexRoute } from 'react-router';
import layout from './views/layout.jsx';
import HomePage from './views/home/HomePage';
import DashboardPage from './views/screen1/first-screen.module.jsx';
import RestaurantsPage from './views/restaurants/module.jsx';
import OrderPage from './views/order/order.module.jsx';
import UsersPage from './views/users/module.jsx';
import Store from './store';

// const onRestaurantsEnter = (nextState, replace, callback) => {
// 	console.log('on enter');
// 	callback();
// }

export default (
	<Route path="/" component={layout}>     	
     	<IndexRoute component={HomePage} />
     	<Route path="dashboard" component={DashboardPage} />
     	<Route path="users" component={UsersPage} />
     	<Route path="order" component={OrderPage} />     	
     	<Route path="order/:orderId" component={OrderPage} />
     	<Route path="restaurants" component={RestaurantsPage} />
  	</Route>
);
