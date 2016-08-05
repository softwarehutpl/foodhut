// import React from 'react';
// import { render } from 'react-dom';
// import './styles/style.css';

// import Users from './views/users/users.view.jsx';

// // import Test from './views/test/test.module.jsx';
// // ReactDOM.render(Test, document.querySelector('div'));

// // import Order from './views/order/order.module.jsx';
// // ReactDOM.render(Order, document.querySelector('div'));


// import './styles/restaurant.css';
// import RestaurantsPage from './views/restaurants/module.jsx';
// ReactDOM.rende r(RestaurantsPage, document.querySelector('div'));

import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import store from './store';

import './styles/style.css';
import './styles/restaurant.css';

render(
	<Provider store={store}>
    	<Router history={browserHistory} routes={routes} />
    </Provider>,
  	document.getElementById('app')
);