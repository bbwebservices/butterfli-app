var React = require('react');
var Link = require('react-router').Link;

var Navbar = React.createClass({

	showDropDown(){
		TweenMax.to(this.refs.dropDown, 1, {y: 100})
	},

	hideDropDown(){
		TweenMax.to(this.refs.dropDown, 1, {y: -10})
	},

	_renderDashTitle(){
		return this.props.currentDash ? <span style={{fontSize: 14, opacity: 0.6}}>/ {this.props.currentDash[0].title}</span> : '';
	},

	_renderDropDown(){
		return (
			<div onMouseEnter={this.showDropDown} onMouseLeave={this.hideDropDown} ref='dropDown' style={dropDownStyle}>
				<ul className="uk-nav uk-nav-navbar">
					<li>
						test nav
					</li>
				</ul>
			</div>
		)
	},

	render(){
		return (
			<div className="uk-margin">
				<nav style={{zIndex: 2}} className="uk-navbar">
					<Link to="index"><div className="uk-navbar-brand notif-text uk-margin-small-top">Butterfli {this._renderDashTitle()}</div></Link>
					<div className="uk-navbar-content uk-navbar-flip uk-hidden-small uk-margin-small-top">
						<ul className="uk-navbar-nav">
							<li className="uk-parent uk-active">
							<Link to='edituser'>{this.props.username}</Link>
							{/*{this._renderDropDown()*/}
							</li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
});

var dropDownStyle = {
	position: 'relative', 
	top: -10, 
	zIndex: 2,
	width: 100,
	height: 200
}

module.exports = Navbar;