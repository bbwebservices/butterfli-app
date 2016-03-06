var React = require('react');

var Navbar = React.createClass({

	_renderDashTitle(){
		return this.props.currentDash ? <span style={{fontSize: 14, opacity: 0.6}}>/ {this.props.currentDash[0].title}</span> : '';
	},

	_renderDropDown(){

	},

	render(){
		if(this.props.currentDash){
			console.log('nav props: ', this.props.currentDash[0].title);
		}
		return (
			<div className="uk-margin">
				<nav className="uk-navbar">
					<a className="uk-navbar-brand notif-text uk-margin-small-top">Butterfli {this._renderDashTitle()}</a>
					<div className="uk-navbar-content uk-navbar-flip uk-hidden-small uk-margin-small-top">
						<ul className="uk-navbar-nav">
							<li className="uk-parent uk-active"><a>{this.props.username}</a></li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
})

module.exports = Navbar;