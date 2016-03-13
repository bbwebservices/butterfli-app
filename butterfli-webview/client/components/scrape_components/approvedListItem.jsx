var React = require('react');

var approvedListItem = React.createClass({

	getInitialState() {
		return {
			isSelected: false,
			hasChanged: false,
			newBody: null
		}
	},

	inputChange(){
		this.state.isSelected ? this.setState({isSelected: false}) : this.setState({isSelected: true});
		console.log(this.state.isSelected)
	},

	onSubmit(e){
		e.preventDefault()
		this.props.editPostBody(this.props.currentDash[0].id, this.props.id, this.refs.postInput.value);
		this.setState({
			isSelected: false,
			hasChanged: true,
			newBody: this.refs.postInput.value
		})
		console.log('isSelected State: ', this.state);
			
		

	},

	_renderBody() {
		return this.state.hasChanged ? <p>{this.state.newBody}</p> : <p>{this.props.body}</p>
	},

	_renderPostBody(){
		if(!this.state.isSelected) {
			return ( 
				<div onClick={this.inputChange}>
					{this._renderBody()}
				</div>
				)
		} else if (this.state.isSelected) {
			return( 
				
				<form onSubmit={this.onSubmit} className="uk-panel uk-panel-box uk-form">
					<div className="uk-form-row">
						<input  ref="postInput" className="uk-width-1-1" type="text" placeholder={this.props.body} />
					</div>
				</form> 
				
				)
		}
	},

	render(){
		return (
			<div key={this.props.currentDash[0].id} style={{textAlign: 'center'}} className="uk-width-1-2 uk-panel uk-panel-box stagger dropIn">
				<img style={{height: 300}} src={this.props.og_source}></img>
				<p>{this.props.title}</p>
				{this._renderPostBody()}
				<div style={{marginBottom:5}} className="uk-width-1-1">
					<a onClick={ () => this.props.postToNetwork(this.props.currentDash[0].id, this.props.id, 'twitter') } style={{marginLeft:10}} className="uk-button uk-width-1-4">Twitter</a>
					<a style={{marginLeft:10}} className="uk-button uk-width-1-4">Facebook</a>
					<a style={{marginLeft:10}} className="uk-button uk-width-1-4">Tumblr</a>
				</div>
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_disapprove') } } className="uk-button uk-width-1-2">Disapprove</a>
			</div>
		)
	}
})

module.exports = approvedListItem;