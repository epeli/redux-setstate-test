import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import { fetchUsers } from "../actions"


class Users extends Component {
	
	constructor (props) {
		super(props);
		this.props.dispatch ( fetchUsers () );
	}

	/*comment out the constructor, uncomment this, then toggle between the two links in the
		browser, and the error/warning goes away 
	componentWillMount() {
		this.props.dispatch ( fetchUsers () );
	}
	*/

	render () {
		return (
			<p>Does not matter if the data is actually output in render</p>
		);
	}
	
};


export default connect( (state) => {
	return {
		users: state.users
	}
})(Users);