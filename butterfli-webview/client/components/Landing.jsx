var React = require('react');
var Login =require('./Login.jsx');
var AccountHome = require('./AccountHome.jsx');

var Landing = React.createClass({

	render: function (){
		// check if logged in, render appropriate component
		var loginRoute = function () {
			if(this.props.isLoggedIn) {
				return (<AccountHome dashes={this.props.dashes} username={this.props.username} />)
			} else if (!this.props.isLoggedIn) {
				return (<Login updateCreds={this.props.updateCreds} />)
			}
		}.bind(this)

		return (
			<div>
				{loginRoute()}
			</div>
		)
	}
})

module.exports = Landing;