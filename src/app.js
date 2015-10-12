import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setCurrentRoute } from './actions';

import Router from './router';

import Users from './components/users';



class App extends Component {
	
	// need this in order to have explicit access to the Redux store
	static contextTypes = {
		store: React.PropTypes.object.isRequired		
	}
	
	
	constructor(props, context) { 
		super(props);
		
		this.props.dispatch( setCurrentRoute( Router.computeRoute() ) );
		
		window.addEventListener('hashchange', () => {
			this.props.dispatch( setCurrentRoute( Router.computeRoute() ) );
	    });

	}

	
	render() {
		
		const { 
			    createNewUser,
			    routes,
			     } = this.props;		
		
		let child = undefined;
		
		switch (routes.current) {
			
			case "/placeholder": 
				child = <p>Does not matter what this says</p>; 
				break;
			
			
			default: 
				child = <Users />;
				
		}	


		return (
			<div>
				<a href="#/">Click between me...</a><br />
				<a href="#/placeholder">...and me, and look in the console to see the "setState()" warning</a>
				{child}	
			</div>
		)
	}
}

export default connect (state => state)(App);