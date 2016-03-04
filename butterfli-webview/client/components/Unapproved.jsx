var React = require('react');

var Unapproved = React.createClass({

	_renderContent(){
		if(this.props.unapprovedPosts){
			return (<div>posts here</div>)
		}
		return (<div>cannot get posts!</div>)
	},

	render(){
		return (
			<div>
				<div>Unapproved</div>
				<div>
					{this._renderContent()}
				</div>
			</div>
		)
	}
})

module.exports = Unapproved;