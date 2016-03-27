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

		return new Promise((resolve, reject) => {
			request(options, function(error, response, body) {
				if(error) {
					console.error('Log In Error: ', error);
				}
				console.log('login response: ',response)
				if(response.statusCode === 200) {
					resolve(JSON.parse(body).token)
				}
			})
		}).then((token) => {
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
		var headers = {'Content-Type': 'application/json'};	
		var dataString = '{"user": {"email": "'+email+'", "password": "'+password+'", "password_confirmation": "'+password_confirmation+'"}}';
		var	options = {
				url: 'http://localhost:3000/users.json',
				method: 'POST',
				headers: headers,
				body: dataString
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

	fbOAuth(jwt, dashId){
		var headers = {'Authorization': jwt}
		var options = { 
			url: 'http://localhost:3000/dashes/'+dashId+'/fb_oauth',
			method: 'GET' 
		}
		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				resolve(response)
			})
		})
	},

	updatePassword(jwt, password, password_confirmation){
		var options = {
			url: 'http://localhost:3000/users/password?password='+password+'&password_confirmation='+password_confirmation,
			method: 'PUT' ,
			headers: { 
				'Authorization': jwt,
				'Origin': 'http://localhost:4000', 
				'Access-Control-Allow-Origin': 
				'http://localhost:4000' 
			},

		}

		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				resolve(response)
			})
		})
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
		}).then((dashes) => {
			return dashes;
		})
	},

	scrapeForPics(jwt, dashId, network, term, advanced){

		//pass in params from unapproved page
		var headers = { 'Authorization': jwt, 'Content-Type': 'application/json'};
		var options = {
			url: advanced !== '' ? 'http://localhost:3000/dashes/'+dashId+'/pic-scrape.json?network='+network+'&search_term='+term +'&param_array='+advanced
						  : 'http://localhost:3000/dashes/'+dashId+'/pic-scrape.json?network='+network+'&search_term='+term,
			method: 'GET',
			headers: headers
		};
		return new Promise((resolve, reject) => {
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
		}).then((dashes) => {
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

	editPostBody(jwt, dashId, postId, body){
		var headers = { 'Authorization': jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/edit-post.json'+'?post_id='+postId+'&body_text='+body,
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
			url: 'http://localhost:3000/dashes/'+dashId+'/post?post_id='+postId+'&network='+network,
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
		var headers = { 'Authorization': jwt, Origin: 'http://localhost:4000', 'Access-Control-Allow-Origin': 'http://localhost:4000'};
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'.json',
			headers: headers,
			dataType: 'json'
		}
		return new Promise((resolve, reject) => {
			request.del(options, function(error, response, body) {
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
		var headers = { 'Authorization': jwt, Origin: 'http://localhost:4000' };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+params,
			method: 'PUT',
			headers: headers
		}
		console.log(options.url);
		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
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