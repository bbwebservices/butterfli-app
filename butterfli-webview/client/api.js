
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

	postToNetwork(){
		var headers = { 'Authorization': this.state.jwt };
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
			return res;
		})
		
	}

}