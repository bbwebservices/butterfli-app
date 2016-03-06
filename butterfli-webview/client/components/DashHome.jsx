var React = require('react');
var Navbar = require('./Navbar.jsx');
var Link = require('react-router').Link;

var DashHome = React.createClass({

	componentDidMount(){
		this.props.scraper(this.props.currentDash[0].id)
	},

	showDashes(){
		if (!this.props.currentDash) {
			return (
				<div>
					<Navbar currentDash={this.props.currentDash}/>
					<h3>Loading...</h3>
				</div>
			)
		} else if (this.props.currentDash) {
			return (
				<div>
					<Navbar currentDash={this.props.currentDash} username={this.props.username}/>
					<div>Dash Home, fool!</div>
					<div>{this.props.currentDash[0].title}</div>
					<a onClick={ () => {this.props.scraper(this.props.currentDash[0].id)} }><Link to='ScrapeHome'>Scrape!</Link></a>
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