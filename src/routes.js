import React from 'react';
import { Route, IndexRoute } from 'react-router';
import layout from './views/layout.jsx';
import HomePage from './views/home/HomePage';
import RestaurantsPage from './views/restaurants/module.jsx';
import OrderPage from './views/order/order.module.jsx';
import UsersPage from './views/users/users.view.jsx';

export default (
	<Route path="/" component={layout}>     	
     	<IndexRoute component={HomePage} />
     	<Route path="users" component={UsersPage} />
     	<Route path="order" component={OrderPage} />     	
     	<Route path="order/:orderId" component={OrderPage} />
     	<Route path="restaurants" component={RestaurantsPage} />
  	</Route>
);
