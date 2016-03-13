var React = require('react');
var Navbar = require('./Navbar.jsx');
var api = require('./../api.js');
var Link = require('react-router').Link;

var AddDash = React.createClass({

	getInitialState() {
		return {
			isCreated: false 
		};
	},

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.02);
		TweenMax.from('.fadeIn', 0.3, {scale: 1.04, opacity: 0})
	},

	mouseEnterAnimations(element){
		TweenMax.to(element, 0.3, {scale: 1.04})
	},

	mouseLeaveAnimations(element){
		TweenMax.to(element, 0.3, {scale: 1})
	},

	createDash(title){
		this.props.createDash({title: title});
		this.setState({
			isCreated: true
		})
	},

	componentDidMount(){
		this.animateListItems();
	},

	_renderAddDashPage(){
		if(this.state.isCreated){
			return (
				<div>
					<Navbar currentDash={this.props.currentDash} username={this.props.username}/>			
					<div className="uk-container uk-container-center uk-margin-top fadeIn">
						<h3>Profile successfully Added!</h3>
						<Link to="index">Back to Account Home</Link>
					</div>	
				</div>
			)
		} else {
			return (
				<div>
					<Navbar currentDash={this.props.currentDash} username={this.props.username}/>			
					<div className="uk-container uk-container-center uk-margin-top fadeIn">
						<div className="uk-grid">
							<div onMouseEnter={() => this.mouseEnterAnimations('.column1')} onMouseLeave={() => this.mouseLeaveAnimations('.column1')} className="uk-width-medium-1-4 uk-row-first stagger column1">
								<div className="uk-panel uk-panel-box">	
									<h3 className="uk-panel-title ">Dash Info</h3>
									<div className="uk-form-row">
										<label className="uk-form-label">Title</label>
										<div className="uk-form-controls">
											<input ref="title" type="text" className="uk-width-2-3" />
										</div>
									<div onClick={() => this.createDash(this.refs.title.value)} className="uk-button">update</div>

									</div>

									<div className="uk-form-row">
										<label className="uk-form-label">Default Subreddit</label>
										<div className="uk-form-controls">
											<input type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">Default Giphy Term</label>
										<div className="uk-form-controls">
											<input type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">Default Twitter Term</label>
										<div className="uk-form-controls">
											<input type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">Default Tumblr Term</label>
										<div className="uk-form-controls">
											<input type="text" className="uk-width-2-3" />
										</div>
									</div>
								</div>
							</div>
							<div onMouseEnter={() => this.mouseEnterAnimations('.column2')} onMouseLeave={() => this.mouseLeaveAnimations('.column2')} className="uk-width-medium-1-4 uk-row-first stagger column2">
								<div className="uk-panel uk-panel-box">	

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
								</div>
							</div>
							<div onMouseEnter={() => this.mouseEnterAnimations('.column3')} onMouseLeave={() => this.mouseLeaveAnimations('.column3')} className="uk-width-medium-1-4 uk-row-first stagger column3">
								<div className="uk-panel uk-panel-box">	

									<h3 className="uk-panel-title">Twitter Info</h3>
									<div className="uk-form-row">
										<label className="uk-form-label">Consumer Key</label>
										<div className="uk-form-controls">
											<input ref="twit_consumer_key" type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">Consumer Secret</label>
										<div className="uk-form-controls">
											<input ref="twit_consumer_secret" type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">Access Token</label>
										<div className="uk-form-controls">
											<input ref="twit_access_token" type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-form-row">
										<label className="uk-form-label">Access Token Secret</label>
										<div className="uk-form-controls">
											<input ref="twit_access_token_secret" type="text" className="uk-width-2-3" />
										</div>
									</div>
									<div className="uk-button">update</div>

								</div>

							</div>
							<div onMouseEnter={() => this.mouseEnterAnimations('.column4')} onMouseLeave={() => this.mouseLeaveAnimations('.column4')} className="uk-width-medium-1-4 stagger column4">
								<div className="uk-panel uk-panel-box">	

								<h3 className="uk-panel-title">Tumblr Info</h3>
								<div className="uk-form-row">
									<label className="uk-form-label">Consumer Key</label>
									<div className="uk-form-controls">
										<input type="text" className="uk-width-2-3" />
									</div>
								</div>
								<div className="uk-form-row">
									<label className="uk-form-label">Consumer Secret</label>
									<div className="uk-form-controls">
										<input type="text" className="uk-width-2-3" />
									</div>
								</div>
								<div className="uk-form-row">
									<label className="uk-form-label">OAuth Token</label>
									<div className="uk-form-controls">
										<input type="text" className="uk-width-2-3" />
									</div>
								</div>
								<div className="uk-form-row">
									<label className="uk-form-label">OAuth Token Secret</label>
									<div className="uk-form-controls">
										<input type="text" className="uk-width-2-3" />
									</div>
								</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			);
		}
	},

	render: function() {
		return (
			<div>
				{this._renderAddDashPage()}
			</div>
		);
	}
})

module.exports = AddDash;