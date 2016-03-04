var React = require('react');

var Approved = React.createClass({

	_renderContent(){
		if(this.props.approvedPosts){
			return (<div>posts here</div>)
		}
		return (<div>cannot get posts!</div>)
	},

	render(){
		return (
			<div>
				<div>
					Approved
				</div>
				<div>
					{this._renderContent()}
				</div>
			</div>
		)
	}
})

module.exports = Approved;