var React = require('react');
var Navbar = require('./Navbar.jsx')

var EditAccount = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.02);
		TweenMax.from('.fadeIn', 0.3, {scale: 1.04, opacity: 0})
	},

	componentDidMount(){
		this.animateListItems();
	},

	render(){
		return(
			<div>
				<Navbar username={this.props.username}/>
				<div className="uk-container uk-container-center uk-margin-top fadeIn">
					<div className="uk-grid">	
						<div style={{marginTop: 100}} className="uk-width-medium-1-4 uk-row-first stagger column1">
							<h1>Edit User Info</h1>
							<div className="uk-panel uk-panel-box">	
									<div className="uk-form-row">
										<label className="uk-form-label">New Username</label>
										<div className="uk-form-controls">
											<input type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">New Password</label>
										<div className="uk-form-controls">
											<input type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">New Password Confirmation</label>
										<div className="uk-form-controls">
											<input type="text" className="uk-width-2-3" />
										</div>
									</div>
								</div>
						</div>
					</div>
				</div>	
			</div>
		)
	}
})

module.exports = EditAccount;