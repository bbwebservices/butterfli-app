var React = require('react');

var unapprovedListItem = React.createClass({

	render(){
		return (
			<div key={this.props.currentDash[0].id} style={{textAlign: 'center'}} className="uk-width-1-3 uk-panel uk-panel-box stagger dropIn">
				<img style={{height: 200}} src={this.props.og_source}></img>
				<p>{this.props.title}</p>
				<p>{this.props.body}</p>
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_approve', 'unapproved') } } className="uk-button uk-width-1-2">Approve</a>
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_disapprove', 'unapproved') } } className="uk-button uk-width-1-2">Disapprove</a>
			</div>
		)
	}
})

module.exports = unapprovedListItem;