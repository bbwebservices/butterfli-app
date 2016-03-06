var React = require('react');
// var gsap = require('gsap');

// var TweenMax = gsap.TweenMax;

var Approved = React.createClass({

	componentDidMount(){
		var node = this.getDOMNode();

		TweenMax.from(node, 5, {y:30});
	},

	_renderContent(){
		if(this.props.approvedPosts){
			return this.props.approvedPosts.map( (element) => {
				return ( 
					<div style={{textAlign: 'center'}} className="uk-width-1-3 uk-panel uk-panel-box stagger">
						<img style={{height: 200}} src={element.og_source}></img>
						<p>{element.title}</p>
						<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, element.id, 'toggle_disapprove') } } className="uk-button uk-width-1-2">Disapprove</a>

					</div> 
				)
			})
		}
		return ( <div>cannot get posts!</div> )
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