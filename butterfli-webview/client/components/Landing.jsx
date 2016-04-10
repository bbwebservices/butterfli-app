var React = require('react');
var Login =require('./Login.jsx');
var AccountHome = require('./AccountHome.jsx');

var Landing = React.createClass({

	_renderLoginRoute(){
		//check if logged in, render appropriate component
		if(this.props.isLoggedIn) {
			return (<AccountHome saveCurrentDash={this.props.saveCurrentDash} dashes={this.props.dashes} username={this.props.username} />)
		} else if (!this.props.isLoggedIn) {
			return (<Login updateCreds={this.props.updateCreds} />)
		}
	},

	render: function (){
		return (
			<div>
				{this._renderLoginRoute()}
			</div>
		)
	}
})

module.exports = Landing;