var React = require('react');
var ReactDOM = require('react-dom');
var UnapprovedListItem = require('./scrape_components/unapprovedListItem.jsx')


var Unapproved = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.05);
	},

	componentDidMount(){
		this.animateListItems();
	},

	_renderContent(){
		if(this.props.unapprovedPosts){
			return this.props.unapprovedPosts.map( (element) => {
				return ( 
					<UnapprovedListItem 
						id={element.id} 
						og_source={element.og_source} 
						title={element.title} 
						currentDash={this.props.currentDash} 
						postApproval={this.props.postApproval} 
					/>
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


module.exports = Unapproved;