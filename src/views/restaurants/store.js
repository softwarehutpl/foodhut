import {createStore} from 'redux';
import restaurantReducer from './reducer.js';

const store = createStore(restaurantReducer);

export default store;