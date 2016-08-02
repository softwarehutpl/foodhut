import { createStore, combineReducers } from 'redux';
import testReducer from './test.reducer.js';

const store = createStore(testReducer);

export default store;
