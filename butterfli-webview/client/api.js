var request = require('request');

module.exports = {

	userLogin(username, password){
		username = username.toLowerCase().trim();
		password = password.trim();

		var headers = {'Content-Type': 'application/json'};	
		var dataString = '{"user": {"email": "'+username+'", "password": "'+password+'"}}';
		var options = {
				url: 'http://localhost:3000/users/sign_in.json',
				method: 'POST',
				headers: headers,
				body: dataString
		};

		return new Promise((resolve, reject)=>{
			request(options, function(error, response, body) {
				if(error) {
					console.error('Log In Error: ', error);
				}
				console.log('login response: ',response)
				if(response.statusCode === 200) {
					resolve(JSON.parse(body).token)
				}

			})
		}).then((token)=>{
			console.log("IN API PROM VALUE: ", token);
			return token;
		})
	},

	getUserDashes(token){
		var headers = { 'Authorization': token };
		var	options = {
				url: 'http://localhost:3000/dashes.json',
				method: 'GET',
				headers: headers
		};

		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				resolve(JSON.parse(body).dashes)
			})
		}).then((dashes) => {
			return dashes;
		})
		
	},

	newUserRegistration(email, password, password_confirmation){
		console.log('in api: ', email, password, password_confirmation);

		var	options = {
				url: 'http://localhost:3000/users'+'?email='+email+'&password='+'&password_confirmation='+password_confirmation,
				method: 'POST',
		};
		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				resolve(response);
			})
		})
		.then((res) => {
			// If this is 200, then we sign the user in to their new acct
			return res;
		});
		
	},


/*************
Scraper, post to netwrk
*************/
	scraper(jwt, dashId){
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/scraper.json',
			method: 'GET',
			headers: headers
		}
		return new Promise((resolve, reject)=>{
			request(options, (error, response, body) => {	
				resolve(JSON.parse(body).dashes)	
			})
		}).then((dashes)=>{
			return dashes;
		})

	},

	scrapeForPics(jwt, dashId, network, term){
		var headers = { 'Authorization': jwt, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/pic-scrape.json?network='+network+'&search_term='+term,
			method: 'GET',
			headers: headers
		}
		return new Promise( (resolve, reject) => {
			request(options, function(error, response, body) {
				if(error){
					console.log('error getting pics: ', error)
				}
				resolve(response);
			})
		}).then((response)=>{
			return response;
		})
	},

	getPostQueue(jwt, dashId){
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/queue',
			method: 'GET',
			headers: headers
		}

		return new Promise((resolve, reject)=>{
			request(options, (error, response, body) => {
				console.log('Queue Response: ', response)
				if(response.statusCode === 200) {	
					resolve(JSON.parse(body).dashes)	
				}
			})
		}).then((dashes)=>{
			return dashes;
		})
	},

	toggleApprove(jwt, dashId, postId, toggle){
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/posts/'+postId+'/'+toggle,
			method: 'GET',
			headers: headers
		}

		return new Promise( (resolve, reject) => {
			request(options, (error, response, body) => {
				resolve(response)
			})
		}).then((res) => {
			return res;	
		})
	},

	editPostBody(jwt, dashId, postId, network){
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/posts/'+postId+'/edit?network='+network,
			method: 'GET',
			headers: headers,
		}
		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				resolve(response);
			})
		}).then((res) => {
			console.log('edit post response: ', res);
			return res;
		})
	},

	postToNetwork(jwt, dashId, postId, network){
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/post?postid='+postId+'&network='+network,
			method: 'GET',
			headers: headers,
		}
		return new Promise((resolve, reject)=>{
			request(options, function(error, response, body) {
				resolve(response);
			})
		}).then((res)=>{
			console.log('post to network response: ', res);

			return res;
		})
	},


/***********
Create and Update Dashes
***********/
	createDash(jwt, options){
		if(!options.title){
			return console.log('You Need to Add Title!!');
		}
		var params = this.createDashParamBuilder(options);
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes'+params,
			method: 'POST',
			headers: headers,
		}
		return new Promise((resolve, reject) => {
			request(options, function(error, response, body) {
				resolve(response);
			})
		})
	},

	deleteDash(jwt, dashId){
		var headers = { 'Authorization': jwt , 'Access-Control-Allow-Origin': 'http://localhost:3000'};
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId,
			method: 'DELETE',
			headers: headers,
		}
		return new Promise((resolve, reject) => {
			request(options, function(error, response, body) {
				if(error) {
					console.log('delete error: ', error);
				}
				resolve(response);
			})
		})
	},

	createDashParamBuilder(options){
		var url = '?title='+options.title;
		var argOptions = arguments[0];
		for(var param in argOptions){
			if(param !== 'title'){
			  url += '&'+param+'='+argOptions[param];
			}
		}
  		return url;
	},

	updateDash(jwt, dashId, options){
		var params = this.updateDashParamBuilder(options);
		console.log('params: ', params);
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+params,
			method: 'PUT',
			headers: headers
		}
		console.log(options.url);
		return new Promise((resolve, reject) => {
			request(options, (error, response, body)=>{
				resolve(response)
			})
		})
		.then((res) => {
				return res;
			})
	},

	updateDashParamBuilder(options){
		var first = true;
		var url = '';
		var argOptions = arguments[0];

		if(options.title){
		    url += '?title='+options.title;
		    first = false;
		}
		for(var param in argOptions){
		    if(first){
		        url += '?'+param+'='+argOptions[param];
		        first = false;
		    } else {
		        if(param !== 'title'){
		          url += '&'+param+'='+argOptions[param];
		        }
		    }
		}
		return url;
	}
}