import { createStore } from 'redux';
import userReducer from './test.reducer.js';

const store = createStore(userReducer);

export default store;