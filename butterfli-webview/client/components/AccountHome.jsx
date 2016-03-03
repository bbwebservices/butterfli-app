var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var AccountHome = React.createClass({
	render(){
		console.log('HEYYYYY: ', this.props)
		if(this.props.dashes){
			var dashList = this.props.dashes.map(function(element){
				return <li><Link to="DashHome">{element.title}</Link></li>
			})
		}
		
		return (
			<div>
				<Navbar />
				<div>Sup, {this.props.username}! Account Home, fool!</div>
				<div>
					<ul>
						{dashList}
					</ul>
				</div>
			</div>
		)
	}
})

module.exports = AccountHome;