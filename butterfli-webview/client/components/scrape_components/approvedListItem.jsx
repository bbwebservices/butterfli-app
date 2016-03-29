var React = require('react');
var R = require('ramda');

var approvedListItem = React.createClass({

	getInitialState() {
		return {
			isSelected: false,
			hasChanged: false,
			newBody: null,
			hasBody: false
		}
	},

	componentDidMount() {
		// fix blank input problem here
		if(this.props.body) {
			this.setState({
				hasBody: true,
				isSelected: true
			})
		}
		console.log(this.props.id);
		console.log(R.findIndex(R.propEq('id', this.props.id))(this.props.approvedPosts))
	},

	addText(){
		this.setState({
			hasBody: true,
			isSelected: true
		})
	},

	inputChange(){
		this.state.isSelected ? this.setState({isSelected: false}) : this.setState({isSelected: true});
		console.log(this.state.isSelected)
	},

	onSubmit(e){
		e.preventDefault();
		this.props.editPostBody(this.props.currentDash[0].id, this.props.id, this.refs.postInput.value);
		if(this.refs.postInput.value === ''){
			this.setState({
				isSelected: false,
				hasBody: false
			})
		} else {
			this.setState({
				isSelected: false,
				// hasChanged: true,
				newBody: this.refs.postInput.value
			})
		}
		console.log('isSelected State: ', this.state);
	},

	_renderBody() {
		return this.state.hasChanged ? <p>{this.state.newBody}</p> : <p>{this.props.body}</p>
	},


	// if there is no body, render add text button. 
	// if it is not selected for editing, render out original post body. 
	// else render out input field
	_renderPostBody(){
		if(!this.state.hasBody){
			return (
				<div onClick={this.addText} className="uk-button uk-button-primary uk-width-1-4" style={{marginLeft:10, marginBottom:5}}>
					Add Text
				</div>
			)
		} else if(!this.state.isSelected) {
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
			<div 
			onClick={()=> this.props.selectedForEdit(this.props.id)}
			key={this.props.currentDash[0].id} 
			style={
			(()=>{
				{/* if we are currently editing this post (last index in array), give it a border, else render usual style */}
				if(this.props.index === this.props.approvedPosts.length-1){
					return {border: 'green 5px solid', textAlign: 'center', top: 500}
				}
				else return this.props.positionStyle
			})()}	 
			className={"uk-panel uk-panel-box "+this.props.animationsCSS+" "+this.props.columnSize}
			>
				<img style={{height: 300}} src={this.props.og_source}></img>
				<p>{this.props.title}</p>
				{(()=>{
					{/* If we are viewing in the editor, render out all buttons */}
					if(this.props.showButtons){
						return(
							<div>
								<div className="uk-width-1-1">
									{this._renderPostBody()}
								</div>
								<div style={{marginBottom:5}} className="uk-width-1-1">
									<a onClick={ () => {
										this.props.postToNetwork(this.props.currentDash[0].id, this.props.id, 'twitter');
									}} style={{marginLeft:10}} className="uk-button uk-width-1-4">Twitter</a>
									<a style={{marginLeft:10}} className="uk-button uk-width-1-4">Facebook</a>
									<a style={{marginLeft:10}} className="uk-button uk-width-1-4">Tumblr</a>
								</div>
							</div>
						)
					}
				})()}
				<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, this.props.id, 'toggle_disapprove', 'approved') } } className="uk-button uk-button-danger uk-width-1-2">Remove</a>
			</div>
		)
	}
})

module.exports = approvedListItem;