// third party libs
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// app libs
import configureStore from './configureStore';
import App from './app';


const store = configureStore(); //this could take an initial state object, such as from a server

//{ () => <App /> }
ReactDOM.render(
	// <Provider> is how we connect Redux and React
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);