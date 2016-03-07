var React = require('react');
var Navbar = require('./Navbar.jsx');

var EditDash = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.02);
		TweenMax.from('.fadeIn', 0.3, {scale: 1.04, opacity: 0})

	},

	componentDidMount(){
		this.animateListItems();
	},

	render: function() {
		return (
			<div>
				<Navbar currentDash={this.props.currentDash} username={this.props.username}/>			
				<div className="uk-container uk-container-center uk-margin-top fadeIn">
					<div className="uk-grid">
						<div className="uk-width-medium-1-3 uk-row-first stagger">
							<h3 className="uk-panel-title">Dash Info</h3>
							<div className="uk-form-row">
								<label className="uk-form-label">Title</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Reddit Term</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Giphy Term</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Twitter Term</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Tumblr Term</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>

						</div>
						<div className="uk-width-medium-1-3 uk-row-first stagger">
							<h3 className="uk-panel-title">Facebook Info</h3>
							<div className="uk-form-row">
								<label className="uk-form-label">Access Token</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Access Token Secret</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Consumer Key</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Consumer Key Secret</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Blah</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>

						</div>
						<div className="uk-width-medium-1-3 uk-row-first stagger">
							<h3 className="uk-panel-title">Twitter Info</h3>
							<div className="uk-form-row">
								<label className="uk-form-label">Access Token</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Access Token Secret</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Consumer Key</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Consumer Key Secret</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Blah</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>

						</div>
						<div className="uk-width-medium-1-3 stagger"></div>
						<div style={{marginTop: 40}} className="uk-width-medium-1-3 stagger">
							<h3 className="uk-panel-title">Tumblr Info</h3>
							<div className="uk-form-row">
								<label className="uk-form-label">Access Token</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Access Token Secret</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Consumer Key</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Consumer Key Secret</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>
							<div className="uk-form-row">
								<label className="uk-form-label">Blah</label>
								<div className="uk-form-controls">
									<input type="text" className="uk-width-2-3" />
								</div>
							</div>

						</div>
						<div className="uk-width-medium-1-3 stagger"></div>


					</div>
				</div>
			</div>
		);
	}
})

module.exports = EditDash;