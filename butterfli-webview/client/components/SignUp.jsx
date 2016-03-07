var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var SignUp = React.createClass({

	getInitialState(){
		return {
			email: '',
			password: '',
			password_confirmation: ''
		}
	},

	updateEmail(){
		this.setState({
			email: this.refs.email.value
		})
	},

	updatePassword(){
		this.setState({
			password: this.refs.password.value
		})
	},

	updatePasswordConfirmation(){
		this.setState({
			password_confirmation: this.refs.confirmPassword.value
		})
	},

	animate(){
		TweenMax.from('.dropIn', 0.5, {y: -25, x: -3, opacity: 0});
	},

	componentDidMount() {
		this.animate();
	},

	render(){
		return (
			<div>
			<Navbar />
			<div className="uk-vertical-align uk-text-center uk-height-1-1 uk-margin-top">
				<div style={{zIndex: 1}} className="uk-vertical-align-middle dropIn" style={styles.formContainer}>
					<h1>butterfli.</h1>
					<form className="uk-panel uk-panel-box uk-form">
						<div className="uk-form-row">
							<input onChange={this.updateEmail} ref="email" type="text" placeholder="Email"/>
						</div>
						<div className="uk-form-row">
							<input onChange={this.updatePassword} ref="password" type="text" placeholder="Password"/>
						</div>
						<div className="uk-form-row">
							<input onChange={this.updatePasswordConfirmation} ref="confirmPassword" type="text" placeholder="Password Confirmation"/>
						</div>
						<div className="uk-form-row">
							<a onClick={() => this.props.newUserSignUp(this.state.email, this.state.password, this.state.password_confirmation)} className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Sign Up</a>
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