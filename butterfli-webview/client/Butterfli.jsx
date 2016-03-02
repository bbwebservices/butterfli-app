var React = require('react'),
	ReactDOM = require('react-dom'),
    Login = require('./components/Login.jsx'),
    AccountHome = require('./components/AccountHome.jsx');

var Butterfli = React.createClass({

	getInitialState: function(){
		return {
			isLoggedIn: false,
			username: null,
			password: null
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

			// send login request
			this.checkCreds();
		}.bind(this));
	},

	// make request to log the user in
	checkCreds: function (){
		console.log('username: ', this.state.username, 'password: ', this.state.password);
		this.setState({
			isLoggedIn: true
		})

	},

	render: function (){
		return (
			<div>
				{/* renders a child depending on the path, then passes App's props to that child. */}
				{this.props.children && React.cloneElement(this.props.children, {
						isLoggedIn: this.state.isLoggedIn,
						updateCreds: this.updateCreds,
						username: this.state.username
					})
				}
			</div>
		)
	}
});

module.exports = Butterfli;