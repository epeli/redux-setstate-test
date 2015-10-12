export default class Router {
	
	//constructor() {}
	
	static computeRoute() {
	
		const data = {
			route: "",
			params: {}
		}
		const hash = window.location.hash.substr(1);
		
		if (hash === "") {
			return data;
		}
		
		const routeAndParams = hash.split("?");
		
		data.route = routeAndParams[0];	 
		
		if (routeAndParams.length === 2) {
			routeAndParams[1].split("&").forEach ( function (param, index) {
				const tmp = param.split("=");
				data.params[tmp[0]] = tmp[1];
			});
		}
	
		return data;
	}	
	
	
	static setRoute(route) {
		window.location.hash = route;
	}
	
	
};