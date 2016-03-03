var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var AccountHome = React.createClass({
	render(){
		console.log('HEYYYYY: ', this.props.dashes)
		return (
			<div>
				<Navbar />
				<div>Sup, {this.props.username}! Account Home, fool!</div>
				<div>{this.props.dashes}</div>
				<Link to="DashHome">Go to Dash Home</Link>
			</div>
		)
	}
})

module.exports = AccountHome;