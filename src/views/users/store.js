import { createStore } from 'redux';
import userReducer from './reducer.js';

const store = createStore(userReducer);

export default store;