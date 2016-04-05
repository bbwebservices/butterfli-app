var React = require('react');
var ReactDOM = require('react-dom');
var R = require('ramda');

var ApprovedListItem = require('./scrape_components/approvedListItem.jsx');

var Approved = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.05);
		TweenMax.from('.approveFadeIn', 0.3, {opacity: 0})

	},

	componentDidMount(){
		this.animateListItems();
		this.handleKeyPress()
	},

	componentWillMount(){
		window.addEventListener('keyup', this.handleKeyPress, true);
	},

	handleKeyPress(e){
		if(e.keyCode === 39) {
			this.props.shiftPost(true)
		}
		if (e.keyCode === 37) {
			this.props.shiftPost(false)
		}
	},

	_renderContent(editor){
		if(editor){
			var length = this.props.approvedPosts.length
				return ( 
					<ApprovedListItem 
						approvedPosts={this.props.approvedPosts[0]}
						id={this.props.approvedPosts[0].id} 
						og_source={this.props.approvedPosts[0].og_source} 
						title={this.props.approvedPosts[0].title} 
						currentDash={this.props.currentDash} 
						postApproval={this.props.postApproval} 
						postToNetwork={this.props.postToNetwork}
						body={this.props.approvedPosts[0].body}
						editPostBody={this.props.editPostBody}
						columnSize={'uk-width-1-2'}
						positionStyle={{textAlign: 'center', position: 'absolute'}}
						showButtons={true}
						animationsCSS={'approveFadeIn'}
						editWindow={true}

					/>
				)
		} else {
			return this.props.approvedPosts.map((element, i) => {
				return ( 
						<ApprovedListItem 
							index={i}
							approvedPosts={this.props.approvedPosts}
							id={element.id} 
							og_source={element.og_source} 
							title={element.title} 
							currentDash={this.props.currentDash} 
							postApproval={this.props.postApproval} 
							postToNetwork={this.props.postToNetwork}
							body={element.body}
							editPostBody={this.props.editPostBody}
							columnSize={'uk-width-1-3'}
							positionStyle={{border: '#eeeeee 5px solid', textAlign: 'center', top: 450, cursor: 'pointer'}}
							showButtons={false}
							animations={'stagger'}
							selectedForEdit={this.props.selectedForEdit}
						/>
				)
			})
		}

		
		
	},


	render(){
		return (
			<div className="uk-grid uk-margin-top">
					{(() => {
						if(this.props.approvedPosts.length){
							return (
								<div className="uk-width-1-1">
									<div className="uk-grid">
										
										<div style={styles.leftArrow} 
										className="uk-width-1-4 uk-text-center uk-icon-arrow-circle-left"
										onClick={()=>{this.props.shiftPost(false)}}
										>
										</div>

										{this._renderContent(true)}

										<div style={styles.rightArrow} 
										onClick={()=>{this.props.shiftPost(true)}}
										className="uk-width-1-4 uk-text-center uk-icon-arrow-circle-right"
										>
										</div>

									</div>
									<div className="uk-grid uk-border-top">
										{this._renderContent(false)}
									</div>
								</div>
							)
						}
					})()}	
			</div>
		)
	}
})

var styles = {
	leftArrow: {
	    bottom: '-165px',
	    left: '-17px',
	    position: 'relative',
	    zIndex: 10,
	    fontSize: 30
	},
	rightArrow: {
	    bottom: '-165px',
	    position: 'relative',
	    zIndex: 10,
	    left: '50%',
	    fontSize: 30
	}
}

module.exports = Approved;