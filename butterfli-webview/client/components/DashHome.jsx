var React = require('react');
var Navbar = require('./Navbar.jsx');

var DashHome = React.createClass({
	render(){
		return (
			<div>
				<Navbar />
				<div>Dash Home, fool!</div>
			</div>
		)
	}
})

module.exports = DashHome;