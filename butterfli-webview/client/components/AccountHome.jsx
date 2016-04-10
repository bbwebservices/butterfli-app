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

	numberParse(input){
		var nums = {
				'1': 'one',
				'2': 'two',
				'3': 'three',
				'4': 'four',
				'5': 'five',
				'6': 'six',
				'7': 'seven',
				'8': 'eight',
				'9': 'nine' ,
				'0': 'zero'
		}
		var trimmed = input.replace(/\s+/g, "");
		if(nums[trimmed[0]]) {
			var str = trimmed.slice(1, trimmed.length)
			str = nums[trimmed[0]] + str;
			return str
		}
		return trimmed;	
	},
	
	render(){

		if(this.props.dashes) {
			console.log('In Account Home, dashes props: ', this.props.dashes)
			var key = 0;
			var dashList = this.props.dashes.map((element) => {
				key++;
				this.numberParse(element.title.replace(/\s+/g, ""));
				return (
					<div 
					ref={this.numberParse(element.title)}
					onMouseEnter={() => this.mouseEnterAnimations('.'+this.numberParse(element.title))}
					onMouseLeave={() => this.mouseLeaveAnimations('.'+this.numberParse(element.title))}
					className={"uk-width-1-4 uk-text-center stagger uk-margin-top "+this.numberParse(element.title)} 
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
			<div className="accountHomeCont">
				<Navbar username={this.props.username} currentDash={this.props.currentDash}/>
				<div className="uk-container uk-container-center uk-margin-top">
					<div className="uk-grid">								
							<div 
							onMouseEnter={() => this.mouseEnterAnimations('.editDash')}
							onMouseLeave={() => this.mouseLeaveAnimations('.editDash')}
							className={"uk-width-1-4 uk-text-center stagger editDash uk-margin-top"} 
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