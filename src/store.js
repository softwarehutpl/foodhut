import { createStore, combineReducers } from 'redux';
import restaurant from './views/restaurants/reducer.js';
import order from './views/order/order.reducer.js';
// import users from './views/users/reducer';

export default createStore(combineReducers({
		order,
		restaurant,
		// users	
	})
);