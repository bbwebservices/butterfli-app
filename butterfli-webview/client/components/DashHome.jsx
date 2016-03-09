var React = require('react');
var Navbar = require('./Navbar.jsx');
var Link = require('react-router').Link;

var DashHome = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.02);
	},

	mouseEnterAnimations(element){
		TweenMax.to(element, 0.3, {scale: 1.04})
	},

	mouseLeaveAnimations(element){
		TweenMax.to(element, 0.3, {scale: 1})
	},

	componentDidMount(){
		this.animateListItems();
		this.props.scraper(this.props.currentDash[0].id)
	},

	showDashes(){
		if (!this.props.currentDash) {
			return (
				<div>
					<h3>Loading...</h3>
				</div>
			)
		} else if (this.props.currentDash) {
			return (
				<div className="uk-grid">	
					<div className="uk-width-1-4 uk-text-center stagger editDash uk-margin-top">
						<div className="uk-thumbnail uk-overlay-hover">
							<Link to='editdash'>
								<div 
								onMouseEnter={() => {this.mouseEnterAnimations('.editDash')}}
								onMouseLeave={() => this.mouseLeaveAnimations('.editDash')} 
								className="uk-overlay uk-button" 
								style={{width: 150, height: 125, paddingTop:5}}
								>
									Edit Dash
									<div className="uk-icon-hover uk-icon-gear uk-icon-large uk-width-1-1" ></div>

								</div>
							</Link>
						</div>
					</div>
					<div className="uk-width-1-4 uk-text-center stagger scraper uk-margin-top">
						<div className="uk-thumbnail uk-overlay-hover">
							<Link to='ScrapeHome'>
								<div 
								onMouseEnter={() => {this.mouseEnterAnimations('.scraper')}}
								onMouseLeave={() => this.mouseLeaveAnimations('.scraper')}
								className="uk-overlay uk-button" 
								style={{width: 150, height: 125, paddingTop:5}} 
								onClick={() => {this.props.scraper(this.props.currentDash[0].id)}}
								>
									Scrape!
									<div className="uk-icon-hover uk-icon-globe uk-icon-large uk-width-1-1" ></div>

								</div>
							</Link>
						</div>
					</div>
					
				</div>


			)
		}
	},

	render(){
		return (
			<div>
				<Navbar currentDash={this.props.currentDash} username={this.props.username}/>

				<div className="uk-container uk-container-center uk-margin-top">
					{this.showDashes()}
				</div>
			</div>
		)
	}
})

module.exports = DashHome;