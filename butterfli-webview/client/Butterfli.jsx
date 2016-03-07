var React = require('react'),
	ReactDOM = require('react-dom'),
    Login = require('./components/Login.jsx'),
    AccountHome = require('./components/AccountHome.jsx'),
    api = require('./api.js');

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
		new Promise((resolve, reject) => {
			this.setState({
				username: username,
				password: password
			})
			resolve(this.state.password)
		}).then((value) => {
			// send login request, once we have creds
			this.checkCreds();
		});
	},

	// make request to log the user in
	checkCreds: function (){
		// make request, set state accordingly
		api.userLogin(this.state.username, this.state.password)
		.then((value) => {
			this.setState({
				jwt: value
			})
			console.log('login api working?, :', value)
			this.getDashes(value);
		});
	},

	newUserSignUp: function (email, password, password_confirmation) {
		api.newUserRegistration(email, password, password_confirmation)
			.then((response) => {
				console.log("sign up response: ", response);
			})	
	},

/****************
DASHES
****************/
	getDashes: function (jwt) {		
		api.getUserDashes(jwt)
		.then((dashes) => {
			this.setState({
				dashes: dashes,
				isLoggedIn: true
			})
		})
	},

	saveCurrentDash: function (dashId){
		var dashToSave = this.state.dashes.filter((element) => {
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
		api.scraper(this.state.jwt, dashId)
			.then((dashes) => {
				this.setState({
					unapprovedPosts: dashes
				})
				this.postQueue(dashId);
			})
	},

	picScrape: function (dashId, network, term) {
		api.scrapeForPics(this.state.jwt, dashId, network, term)
			.then((response) => {
				if(response.statusCode === 200) {
					this.scraper(dashId);	
				}
				if(response.statusCode !==200) {
					console.log('Wrong Status code: ', response.statusCode)
				}
			})
	},

	postQueue: function (dashId) {
		api.getPostQueue(this.state.jwt, dashId)
			.then((dashes) => {
				this.setState({
					approvedPosts: dashes
				})
			})
	},

	postApproval: function (dashId, postId, toggle) {
		api.toggleApprove(this.state.jwt, dashId, postId, toggle)
			.then((response) => {
				if(response.statusCode === 200) {
					this.scraper(dashId);
				}
			})
	},

/*****************
POST CONTENT
*****************/
	postToNetwork: function(dashId, postId, network) {
		api.postToNetwork(this.state.jwt, dashId, postId, network)
		.then((response) => {
			console.log('post to network response: ', response)
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
						postQueue: this.postQueue,
						postToNetwork: this.postToNetwork,
						newUserSignUp: this.newUserSignUp
						
					})
				}
			</div>
		)
	}
});

module.exports = Butterfli;