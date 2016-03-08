var React = require('react');

var approvedListItem = React.createClass({

	render(){
		return (
			<div key={this.props.id} style={{textAlign: 'center'}} className="uk-width-1-3 uk-panel uk-panel-box stagger dropIn">
				<img style={{height: 200}} src={this.props.og_source}></img>
				<p>{this.props.title}</p>
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_disapprove') } } className="uk-button uk-width-1-2">Disapprove</a>
				<a className="uk-button uk-width-1-3">Twitter</a>
				<a className="uk-button uk-width-1-3">Facebook</a>
				<a className="uk-button uk-width-1-3">Tumblr</a>

			</div>
		)
	}
})

module.exports = approvedListItem;