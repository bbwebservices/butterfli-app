var React = require('react'),
	ReactDOM = require('react-dom'),
    Login = require('./components/Login.jsx'),
    AccountHome = require('./components/AccountHome.jsx'),
    request = require('request');

var Butterfli = React.createClass({

	getInitialState: function(){
		return {
			username: null,
			password: null,
			isLoggedIn: false,
			jwt: null,
			dashes: null,
			currentDash: null,
			approvedPosts: null,
			unapprovedPosts: null
		}
	},

/***************
CREDENTIALS
***************/
	// save the inputted username and password
	updateCreds: function(username, password){

		// promise to be sure the state is set before attempting the login request
		new Promise(function(resolve, reject){
			this.setState({
				username: username,
				password: password
			})
			resolve(this.state.password)
		}.bind(this)).then(function(value) {
			// send login request, once we have creds
			this.checkCreds();
		}.bind(this));
	},

	// make request to log the user in
	checkCreds: function (){
		var headers = {'Content-Type': 'application/json'};	
		var dataString = '{"user": {"email": "'+this.state.username+'", "password": "'+this.state.password+'"}}';
		var options = {
				url: 'http://localhost:3000/users/sign_in.json',
				method: 'POST',
				headers: headers,
				body: dataString
		};
		// make request, set state accordingly
		new Promise(function(resolve, reject) {
			request(options, function (error, response, body) {
				console.log('Login Body: ', body)
				if(response.statusCode === 200){
					this.setState({
						jwt: JSON.parse(body).token
					})
				}
				resolve(this.state.jwt);
			}.bind(this))

		}.bind(this)).then(function(value) {
			this.getDashes(value);
		}.bind(this));
	},

/****************
DASHES
****************/
	getDashes: function (value) {

		var headers = { 'Authorization': this.state.jwt };
		var	options = {
				url: 'http://localhost:3000/dashes.json',
				method: 'GET',
				headers: headers
		};
		request(options, function(error, response, body) {
			this.setState({
				dashes: JSON.parse(body).dashes,
				isLoggedIn: true
			})
		}.bind(this))

	},

	saveCurrentDash: function (dashId){
		var dashToSave = this.state.dashes.filter(function(element){
			if(element.id === dashId) {
				return true;
			}
		})
		this.setState({
			currentDash: dashToSave
		})

		console.log("DTSS: ", this.state.currentDash)
	},

/******************
SCRAPE FOR CONTENT
******************/
	scraper: function (dashId) {
		var headers = { 'Authorization': this.state.jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/scraper.json',
			method: 'GET',
			headers: headers
		}
		request(options, function(error, response, body) {
			console.log('Scraper Response: ', response)
			console.log('Scraper Body: ', JSON.parse(body).dashes)
			this.setState({
				unapprovedPosts: JSON.parse(body).dashes
			})
			console.log('unapproved posts state: ', this.state.unapprovedPosts)
		}.bind(this))

		this.postQueue(dashId);
	},

	picScrape: function (dashId, network, term) {

		console.log(dashId, network, term);

		var headers = { 'Authorization': this.state.jwt, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/pic-scrape.json?network='+network+'&search_term='+term,
			method: 'GET',
			headers: headers
		}
		request(options, function(error, response, body) {
			if(error){
				console.log('error: ', error)
			}
			console.log('pic scraper response: ', response)
			
		})
		this.scraper(dashId);
	},

	postQueue: function (dashId) {
		var headers = { 'Authorization': this.state.jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/queue',
			method: 'GET',
			headers: headers
		}

		request(options, (error, response, body) => {
			console.log('Queue Response: ', response)
			if(response.statusCode === 200) {
				console.log('Queue Body: ', body)
				this.setState({
					approvedPosts: JSON.parse(body).dashes
				})
			}
		})
	},

	postApproval: function (dashId, postId, toggle) {
		var headers = { 'Authorization': this.state.jwt };
		var options = {
			url: 'http://localhost:3000/dashes/'+dashId+'/posts/'+postId+'/'+toggle,
			method: 'GET',
			headers: headers
		}

		new Promise( (resolve, reject) => {
			request(options, (error, response, body) => {
				console.log('Approval Response: ', response);
				resolve(response)
			})
		}).then((res) => {
			if(res.statusCode === 200) {
				this.scraper(dashId);
			}
		})
	},


/*****************
RENDERING
*****************/
	render: function () {
		return (
			<div>
				{/* renders a child depending on the path, then passes App's props to that child. */}
				{this.props.children && React.cloneElement(this.props.children, {
						isLoggedIn: this.state.isLoggedIn,
						updateCreds: this.updateCreds,
						username: this.state.username,
						dashes: this.state.dashes,
						saveCurrentDash: this.saveCurrentDash,
						currentDash: this.state.currentDash,
						scraper: this.scraper,
						picScrape: this.picScrape,
						approvedPosts: this.state.approvedPosts,
						unapprovedPosts: this.state.unapprovedPosts,
						postApproval: this.postApproval,
						postQueue: this.postQueue
					})
				}
			</div>
		)
	}
});

module.exports = Butterfli;