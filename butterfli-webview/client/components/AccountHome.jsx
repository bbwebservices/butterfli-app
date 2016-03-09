var React = require('react');
var Link = require('react-router').Link

var Navbar = require('./Navbar.jsx');

var AccountHome = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.02);
	},

	mouseEnterAnimations(element){
		TweenMax.to(element, 0.3, {scale: 1.04})
	},

	mouseLeaveAnimations(element){
		TweenMax.to(element, 0.3, {scale: 1})
	},

	componentDidMount() {
		this.animateListItems();
	},
	
	render(){

		if(this.props.dashes) {
			console.log('In Account Home, dashes props: ', this.props.dashes)
			var key = 0;
			var dashList = this.props.dashes.map((element) => {
				key++;
				return (
					<div 
					ref={element.title.replace(/\s+/g, "")}
					id={element.title.replace(/\s+/g, "")}
					onMouseEnter={() => this.mouseEnterAnimations('#'+element.title.replace(/\s+/g, ""))}
					onMouseLeave={() => this.mouseLeaveAnimations('#'+element.title.replace(/\s+/g, ""))}
					className={"uk-width-1-4 uk-text-center stagger"} 
					key={key}
					>
						<div className="uk-thumbnail uk-overlay-hover" onClick={ () => {this.props.saveCurrentDash(element.id)} }>
							<Link to="DashHome">
								<div 
								className="uk-overlay uk-button" 
								style={{width: 150, height: 125}} 
								>
									{element.title}
									<div className="uk-icon-hover uk-icon-rocket uk-icon-large uk-width-1-1" ></div>
								</div>
							</Link>
						</div>
					</div>
				)
			})
		}
		
		return (
			<div>
				<Navbar username={this.props.username} currentDash={this.props.currentDash}/>
				<div className="uk-container uk-container-center uk-margin-top">
					<div className="uk-grid">
							
								
							<div 
							onMouseEnter={() => {this.mouseEnterAnimations('.editDash')}}
							onMouseLeave={() => this.mouseLeaveAnimations('.editDash')}
							className={"uk-width-1-4 uk-text-center stagger editDash"} 
							key={key}
							>
								<div className="uk-thumbnail uk-overlay-hover">
									<Link to='adddash'>
										<div 
										className="uk-overlay uk-button" 
										style={{width: 150, height: 125, paddingTop:5}}
										>
											Add New Dash
											<div className="uk-icon-hover uk-icon-cloud-upload uk-icon-large" ></div>
										</div>
									</Link>
								</div>
							</div>	
							{dashList}						
								
							
					</div>
				</div>
			</div>
		)
	}
})

module.exports = AccountHome;