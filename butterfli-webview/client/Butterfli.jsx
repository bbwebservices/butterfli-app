var React = require('react'),
	ReactDOM = require('react-dom'),
    Login = require('./components/Login.jsx'),
    AccountHome = require('./components/AccountHome.jsx'),
    request = require('request');

var Butterfli = React.createClass({

	getInitialState: function(){
		return {
			isLoggedIn: false,
			username: null,
			password: null,
			dashes: null,
			jwt: null
		}
	},

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
				if(response.statusCode === 200){
					this.setState({
						isLoggedIn: true,
						jwt: JSON.parse(body).token
					})
				}
				resolve(this.state.jwt);
			}.bind(this))

		}.bind(this)).then(function(value) {
			this.getDashes(value);
		}.bind(this))
		
	},

	getDashes: function (value) {

		console.log('STATE: ', this.state.jwt)
		var headers = { 'Authorization': this.state.jwt };
		var	options = {
				url: 'http://localhost:3000/dashes.json',
				method: 'GET',
				headers: headers
		};
		request(options, function(error, response, body) {
			console.log('DASHES: ', body);
			this.setState({
				dashes: body
			})
		}.bind(this))

	},

	render: function (){
		return (
			<div>
				{/* renders a child depending on the path, then passes App's props to that child. */}
				{this.props.children && React.cloneElement(this.props.children, {
						isLoggedIn: this.state.isLoggedIn,
						updateCreds: this.updateCreds,
						username: this.state.username,
						dashes: this.state.dashes
					})
				}
			</div>
		)
	}
});

module.exports = Butterfli;