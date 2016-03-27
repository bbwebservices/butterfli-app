var React = require('react');
var ReactDOM = require('react-dom');
var UnapprovedListItem = require('./scrape_components/unapprovedListItem.jsx');
var UnapprovedSideBar = require('./UnapprovedSideBar.jsx');


var Unapproved = React.createClass({

	componentDidMount(){
		this.animateListItems();
	},

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.05);
	},
	

	_renderContent(){

		if(this.props.unapprovedPosts){
			return this.props.unapprovedPosts.map((element) => {
				return ( 
					<UnapprovedListItem 
						id={element.id} 
						og_source={element.og_source} 
						title={element.title} 
						currentDash={this.props.currentDash} 
						postApproval={this.props.postApproval} 
						body={element.body}
					/>
				)
			})
		}
		return ( <div>cannot connect to the server!</div> )
	},

	render(){
		return (
			<div className="uk-grid uk-margin-top ">
				<UnapprovedSideBar 
					id={this.props.currentDash[0].id}
					picScrape={this.props.picScrape}
				 />
				<div className="uk-width-3-4">
					<div className="uk-grid">
						{this._renderContent()}
					</div>
				</div>	
			</div>
		)
	}
})


module.exports = Unapproved;