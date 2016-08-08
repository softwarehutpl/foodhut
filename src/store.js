import { createStore, combineReducers } from 'redux';
import restaurant from './views/restaurants/reducer';
import order from './views/order/order.reducer';
import dashboard from './views/screen1/first-screen.reducer';
import users from './views/users/reducer';

export default createStore(combineReducers({
		dashboard,
		order,
		restaurant,
		users	
	})
);