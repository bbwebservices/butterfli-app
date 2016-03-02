var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var AccountHome = React.createClass({
	render(){
		return (
			<div>
				<Navbar />
				<div>Sup, {this.props.username}! Account Home, fool!</div>
				<Link to="DashHome">Go to Dash Home</Link>
			</div>
		)
	}
})

module.exports = AccountHome;