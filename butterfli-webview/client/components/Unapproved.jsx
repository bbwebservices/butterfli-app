var React = require('react');

var Unapproved = React.createClass({

	_renderContent(){
		if(this.props.unapprovedPosts){
			return this.props.unapprovedPosts.map(function(element){
				return ( <div className="uk-width-1-3 uk-margin uk-panel"><img src={element.og_source}></img></div> )
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