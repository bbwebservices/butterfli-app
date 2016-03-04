var React = require('react');
var Navbar = require('./Navbar.jsx');
var Link = require('react-router').Link;

var DashHome = React.createClass({

	showDashes(){
		if (!this.props.currentDash) {
			return (
				<div>
					<Navbar />
					<h3>Loading...</h3>
				</div>
			)
		} else if (this.props.currentDash) {
			return (
				<div>
					<Navbar />
					<div>Dash Home, fool!</div>
					<div>{this.props.currentDash[0].title}</div>
					<a onClick={ ()=>{this.props.scraper(this.props.currentDash[0].id)} }><Link to='ScrapeHome'>Scrape!</Link></a>
				</div>
			)
		}
		
	},

	render(){
		return (
			<div>
				{this.showDashes()}
			</div>
		)
	}
})

module.exports = DashHome;