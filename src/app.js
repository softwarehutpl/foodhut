'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { Router, browserHistory, hashHistory  } from 'react-router';
import routes from './routes';
import store from './store';

import './styles/style.css';
import './styles/restaurant.css';

render(
	<Provider store={store}>
    	<Router  history={hashHistory} /*history={browserHistory}*/ routes={routes} />
    </Provider>,
  	document.getElementById('app')
);