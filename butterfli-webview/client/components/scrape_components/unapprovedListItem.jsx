var React = require('react');

var unapprovedListItem = React.createClass({

	componentDidMount() {
		TweenMax.from('.dropIn', 0.3, {y: 10})
	},

	render(){
		console.log('in aprlisitem: ', this.props.title)
		return (
			<div key={this.props.id} style={{textAlign: 'center'}} className="uk-width-1-3 uk-panel uk-panel-box stagger dropIn">
				<img style={{height: 200}} src={this.props.og_source}></img>
				<p>{this.props.title}</p>
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_approve') } } className="uk-button uk-width-1-2">Approve</a>
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_disapprove') } } className="uk-button uk-width-1-2">Disapprove</a>

			</div>
		)
	}
})

module.exports = unapprovedListItem;