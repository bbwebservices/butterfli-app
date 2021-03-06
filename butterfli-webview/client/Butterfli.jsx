var React = require('react'),
	ReactDOM = require('react-dom'),
    Login = require('./components/Login.jsx'),
    AccountHome = require('./components/AccountHome.jsx'),
    api = require('./api.js'),
    R = require('ramda');

var Butterfli = React.createClass({

	getInitialState: function(){

		if(localStorage.state){
			return JSON.parse(localStorage.getItem('state'))
		} else {
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
		}
	},

	componentDidUpdate: function (prevProps, prevState) {
	    localStorage.state = JSON.stringify(this.state);
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
				console.log('login api working? :', value);
				this.getDashes(value);
			});
	},

	newUserSignUp: function (email, password, password_confirmation) {
		api.newUserRegistration(email, password, password_confirmation)
			.then((response) => {
				console.log("sign up response: ", response);
			})	
	},

	fbOAuth: function (dashId) {
		console.log('in bfli fboauth')
		api.fbOAuth(this.state.jwt, dashId)
			.then((response) => {
				console.log('fb OAuth Response: ', response)
			})
	},

	updatePassword: function (password, password_confirmation) {
		api.updatePassword(this.state.jwt, password, password_confirmation)
			.then((response) => {
				console.log('Update Password Response: ', response);
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

	// grab user selected dash, then save to state
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

	updateTwitDash(dashId, options){
		api.updateDash(this.state.jwt, dashId, options)
			.then((res) => {
				console.log('update dash res: ', res);
			})

	},

	// fire create dash, on response update dash state with new
	createDash: function (options) {
		api.createDash(this.state.jwt, options)
			.then((res) => {
				var newDash = JSON.parse(res.body);
				var newState = this.state.dashes;
				console.log(newDash.dash)
				newState.push(newDash.dash);
				this.setState({
					dashes: newState
				})
				console.log('NewState: ', this.state.dashes);
			})
	},

	// fire delete dash, on success filter out of current state 
	deleteDash: function (dashId) {
		api.deleteDash(this.state.jwt, dashId)
			.then((res) => {
				console.log('delete dash res: ', res, 'state: ', this.state.jwt);
				var newDashState = this.state.dashes.filter((element) => {
					if(element.id === dashId){
						return false
					}
					return true
				})
				this.setState({
					dashes: newDashState
				})
				console.log("NEW DASH STATE: ", this.state.dashes);


			})
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

	picScrape: function (dashId, network, term, advanced) {
		api.scrapeForPics(this.state.jwt, dashId, network, term, advanced)
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

	postApproval: function (dashId, postId, toggle, location) {
		api.toggleApprove(this.state.jwt, dashId, postId, toggle)
			.then((response) => {
				if(response.statusCode === 200) {
					if(toggle === 'toggle_approve'){
						var newApprovedState = this.state.unapprovedPosts.filter((post) => {
							if(post.id === postId) return true;
							return false;
						});
						if(this.state.approvedPosts === null){
							this.setState({
								approvedPosts: newApprovedState
							});
						} else {
							var approveToAdd = this.state.approvedPosts.concat(newApprovedState);
							this.setState({
								approvedPosts: approveToAdd
							});
						}	
					}
					if(location === 'approved'){
						var newApprovedState = this.state.approvedPosts.filter((post) => {
							if(post.id === postId) return false;
							return true
						});
						this.setState({
							approvedPosts: newApprovedState
						})
					} else if (location === 'unapproved') {
						var newUnapprovedState = this.state.unapprovedPosts.filter((post) => {
							if(post.id === postId) return false
							return true
						});
						this.setState({
							unapprovedPosts: newUnapprovedState
						});
					}
				}
			})
	},

/*****************
POST CONTENT
*****************/

	// Send new post body to db. on user submit in Approved Tab
	editPostBody: function (dashId, postId, body) {
		api.editPostBody(this.state.jwt, dashId, postId, body)
			.then((res) => {
				var newApprovedState = this.state.approvedPosts;
				for (var i = 0; i < newApprovedState.length; i++) {
					if(newApprovedState[i].id === postId){
						newApprovedState[i].body = body;
						console.log('Added this body: ', newApprovedState[i])
					}
				}
				this.setState({
					approvedPosts: newApprovedState
				})
		})

	},

	// fires when user clicks on an image in Approved Tab. brings selected post to the front of stack.
	selectedForEdit: function(postId){
		var postToMove = R.filter(R.propEq('id', postId), this.state.approvedPosts),
		    postRemoved = R.reject((post) => {return post.id === postId}, this.state.approvedPosts);
		this.setState({
			approvedPosts: R.prepend(postToMove[0], postRemoved)
		});
	},

	// fires either when user clicks arrows, or right or left keys in Approved Tab. Shifts stack right or left.
	shiftPost: function(foreward) {
		if(foreward){
			var last = this.state.approvedPosts[0],
			    postRemoved = R.drop(1, this.state.approvedPosts);
			this.setState({
				approvedPosts: R.append(last, postRemoved)
			});
		}
		else {
			var first = this.state.approvedPosts[this.state.approvedPosts.length-1],
				postRemoved = R.dropLast(1, this.state.approvedPosts)
			this.setState({
				approvedPosts: R.prepend(first, postRemoved)
			})
		}
	},


	postToNetwork: function(dashId, postId, network) {
		console.log('post id: ', postId);
		console.log('dash id: ', dashId);

		api.postToNetwork(this.state.jwt, dashId, postId, network)
			.then((response) => {
				console.log('post to network response: ', response)
			})

		/****************
		all set to remove once backend updates
		*****************/
		/* var newApprovedState = this.state.approvedPosts.filter((element) => {
		* 	if(element.id === postId){
		* 		return false;
		* 	}
		* 	return true;
		* });

		* this.setState({
		* 	approvedPosts: newApprovedState
		* })
		*/ 

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
						newUserSignUp: this.newUserSignUp,
						updateTwitDash: this.updateTwitDash,
						createDash: this.createDash,
						deleteDash: this.deleteDash,
						editPostBody: this.editPostBody,
						fbOAuth: this.fbOAuth,
						updatePassword: this.updatePassword,
						selectedForEdit: this.selectedForEdit,
						shiftPost: this.shiftPost
					})
				}
			</div>
		)
	}
});

module.exports = Butterfli;