var React = require('react');

var Login = React.createClass({
	render(){
		return (
			<div className="uk-vertical-align uk-text-center uk-height-1-1 uk-margin-top">
				<div className="uk-vertical-align-middle" style={styles.formContainer}>
					<h1>butterfli.</h1>
					<form className="uk-panel uk-panel-box uk-form">
						<div className="uk-form-row">
							<input ref="username" type="text" placeholder="Username" value="test@example.com"/>
						</div>
						<div className="uk-form-row">
							<input ref="password" type="text" placeholder="Password" value="12345678"/>
						</div>
						<div className="uk-form-row">
							<a onClick={ () => {this.props.updateCreds(this.refs.username.value, this.refs.password.value)}} className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Login</a>
						</div>
						<div className="uk-form-row">
							<a className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Sign Up</a>
						</div>
						<div className="uk-form-row"></div>
					</form>

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

module.exports = Login;