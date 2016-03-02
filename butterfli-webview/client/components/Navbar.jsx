var React = require('react');

var Navbar = React.createClass({
	render(){
		return (
			<div className="uk-margin">
				<nav className="uk-navbar">
					<a className="uk-navbar-brand notif-text uk-margin-small-top">Butterfli</a>
					<div className="uk-navbar-content uk-navbar-flip uk-hidden-small uk-margin-small-top">
						<ul className="uk-navbar-nav">
							<li className="uk-parent uk-active">{this.props.username}</li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
})

module.exports = Navbar;