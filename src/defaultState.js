export const defaultState = {
	routes: {
		current: "/",
		params: {}
	},
	users: {
		isFetching: false,
		error: {
			hasError: false,
			message: ""
		},
		data: []
	}	
}