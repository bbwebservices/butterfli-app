var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var AccountHome = React.createClass({
	render(){
		console.log('HEYYYYY: ', this.props.dashes)
		
		// this.props.dashes.forEach(function(element){
		// 	console.log(element);
		// })

		return (
			<div>
				<Navbar />
				<div>Sup, {this.props.username}! Account Home, fool!</div>
				<div>{this.props.dashes}</div>
				<Link to="DashHome">{this.props.dashes}</Link>
			</div>
		)
	}
})

module.exports = AccountHome;