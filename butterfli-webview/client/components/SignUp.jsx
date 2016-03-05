var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var SignUp = React.createClass({
	render(){
		return (
			<div>
			<Navbar />
			<div className="uk-vertical-align uk-text-center uk-height-1-1 uk-margin-top">
				<div className="uk-vertical-align-middle" style={styles.formContainer}>
					<h1>butterfli.</h1>
					<form className="uk-panel uk-panel-box uk-form">
						<div className="uk-form-row">
							<input ref="username" type="text" placeholder="Username"/>
						</div>
						<div className="uk-form-row">
							<input ref="password" type="text" placeholder="Password"/>
						</div>
						<div className="uk-form-row">
							<input ref="confirmPassword" type="text" placeholder="Password Confirmation"/>
						</div>
						<div className="uk-form-row">
							<a className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Sign Up</a>
						</div>
						<div className="uk-form-row"></div>
					</form>

				</div>
			</div>
			</div>
		)
	}
});

var styles = {
	formContainer: {
		width: 250
	}
}

module.exports = SignUp;