import { defaultState } from './defaultState';

const GET_USERS = "GET_USERS";
const RECEIVE_GET_USERS = "RECEIVE_GET_USERS";
const SET_CURRENT_ROUTE = "SET_CURRENT_ROUTE";





function users (state = defaultState.users, action) {
	switch (action.type) {
		case GET_USERS:
			return Object.assign({}, state, {
				isFetching: true
			})
		case RECEIVE_GET_USERS:
			if (action.payload.success === true) {	
				return Object.assign ({}, state, {
					isFetching: false,
					data: action.payload.data
				});
			} else {
				return Object.assign ({}, state, {
					isFetching: false,
					data: {},
					error: {
						hasError: true,
						message: action.payload.message
					}
				});
			}
		default:
			return state;
	}
}



/////////////////////////////////////// ROUTES

function routes (state = defaultState.routes, action) {
	switch (action.type) {
		case SET_CURRENT_ROUTE:
			return Object.assign({}, state, {
				current: action.payload.data.route,
				params: action.payload.data.params
			});
			
		default:
			return state;
	}
}




//////// ROOT REDUCER HERE
export default function rootReducer(state, action) {
  
  	/* this I don't understand yet; it seems like I have to describe the complete state default state structure
	  	here, which might not suck conceptually, but with the "combineReducers" function provided by Redux,
	  	you don't need this. I have this here now because I want to understand the structure more completely */
	if (!state) {
		state = defaultState
	} 
	
	return {
		users: users(state.users, action),
		routes: routes(state.routes, action)
	};
	
}