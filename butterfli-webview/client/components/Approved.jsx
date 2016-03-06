var React = require('react');
var ReactDOM = require('react-dom');
// var gsap = require('gsap');

// var TweenMax = gsap.TweenMax;

var Approved = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:-30, x: -10, opacity: 0}, 0.1);
	},

	componentDidMount(){
		this.animateListItems();
	},

	_renderContent(){
		return this.props.approvedPosts.map( (element) => {
			return ( 
				<div key={element.id} style={{textAlign: 'center'}} className="uk-width-1-3 uk-panel uk-panel-box stagger">
					<img style={{height: 200}} src={element.og_source}></img>
					<p>{element.title}</p>
					<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, element.id, 'toggle_disapprove') } } className="uk-button uk-width-1-2">Disapprove</a>

				</div> 
			)
		})
		
	},

	render(){
		return (
			<div className="uk-grid uk-margin-top ">
					
				{this._renderContent()}
						
			</div>
		)
	}
})

module.exports = Approved;