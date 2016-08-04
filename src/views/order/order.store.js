import { createStore } from 'redux';
import orderReducer from './order.reducer.js';

const orderStore = createStore(orderReducer);

export default orderStore;
