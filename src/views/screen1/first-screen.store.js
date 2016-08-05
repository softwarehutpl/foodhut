'use strict';
import { createStore, combineReducers } from 'redux';
import firstScreenReducer from './first-screen.reducer.js';

const store = createStore(firstScreenReducer);

export default store;
