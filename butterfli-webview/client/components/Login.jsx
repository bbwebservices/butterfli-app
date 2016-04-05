var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var Login = React.createClass({

	animate(){
		TweenMax.from('.dropIn', 0.5, {y: -25, x: -3, opacity: 0});
	},

	componentDidMount() {
		this.animate();
	},

	render(){
		return (
			<div className='loginCont'>
				<Navbar />
				<div className="uk-vertical-align uk-text-center uk-height-1-1 uk-margin-top dropIn">
					<div style={{zIndex: 1}} className="uk-vertical-align-middle" style={styles.formContainer}>
						<h1>butterfli.</h1>
						<form className="uk-panel uk-panel-box uk-form">
							<div className="uk-form-row">
								<input ref="username" type="text" placeholder="Username"/>
							</div>
							<div className="uk-form-row">
								<input ref="password" type="password" placeholder="Password"/>
							</div>
							<div className="uk-form-row">
								<a onClick={ () => {this.props.updateCreds(this.refs.username.value, this.refs.password.value)}} className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Login</a>
							</div>
							<div className="uk-form-row">
								<Link to="signup"><a className="uk-width-1-1 uk-button uk-button-primary uk-button-large">Sign Up</a></Link>
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

module.exports = Login;