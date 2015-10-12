
const GET_USERS = "GET_USERS";
const RECEIVE_GET_USERS = "RECEIVE_GET_USERS";
const SET_CURRENT_ROUTE = "SET_CURRENT_ROUTE";

import Router from "./router.js";


function getUsers (data) {
	return {
		type: GET_USERS
	}
}


function receiveGetUsers (payload) {
	return {
		type: RECEIVE_GET_USERS,
		payload: payload
	}
}


export function fetchUsers () {
	return (dispatch) => {

		dispatch ( getUsers() );
		
		dispatch ( receiveGetUsers ({success: true, data: []})); 
		

	}
}


/////////////////////// ROUTES

export function setCurrentRoute (data) {
	return {
		type: SET_CURRENT_ROUTE,
		payload: {
			data: data
		}
	}
}
