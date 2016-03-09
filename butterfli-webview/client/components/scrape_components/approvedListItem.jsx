var React = require('react');

var approvedListItem = React.createClass({

	render(){
		return (
			<div key={this.props.id} style={{textAlign: 'center'}} className="uk-width-1-2 uk-panel uk-panel-box stagger dropIn">
				<img style={{height: 300}} src={this.props.og_source}></img>
				<p>{this.props.title}</p>
				<div style={{marginBottom:5}} className="uk-width-1-1">
					<a style={{marginLeft:10}} className="uk-button uk-width-1-4">Twitter</a>
					<a style={{marginLeft:10}} className="uk-button uk-width-1-4">Facebook</a>
					<a style={{marginLeft:10}} className="uk-button uk-width-1-4">Tumblr</a>
				</div>
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_disapprove') } } className="uk-button uk-width-1-2">Disapprove</a>

			</div>
		)
	}
})

module.exports = approvedListItem;