var React = require('react');
var ReactDOM = require('react-dom');
var R = require('ramda');
// var gsap = require('gsap');
// var TweenMax = gsap.TweenMax;

var ApprovedListItem = require('./scrape_components/approvedListItem.jsx');

var Approved = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.05);
		TweenMax.from('.approveFadeIn', 0.3, {opacity: 0})

	},

	componentDidMount(){
		this.animateListItems();
	},

	_renderMainContent(){
		console.log('approved posts: ', this.props.approvedPosts)
		return this.props.approvedPosts.map((element) => {
			return ( 
				<ApprovedListItem 
					approvedPosts={this.props.approvedPosts}
					id={element.id} 
					og_source={element.og_source} 
					title={element.title} 
					currentDash={this.props.currentDash} 
					postApproval={this.props.postApproval} 
					postToNetwork={this.props.postToNetwork}
					body={element.body}
					editPostBody={this.props.editPostBody}
					columnSize={'uk-width-1-2'}
					positionStyle={{textAlign: 'center', position: 'absolute'}}
					showButtons={true}
					animationsCSS={'approveFadeIn'}

				/>
			)
		})
		
	},

	_renderSmallContent(){
		return R.reverse(this.props.approvedPosts.map((element, i) => {
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
					positionStyle={{border: '#eeeeee 5px solid', textAlign: 'center', top: 500}}
					showButtons={false}
					animations={'stagger'}

				/>
			)
		}))
	},

	render(){
		return (
			<div className="uk-grid uk-margin-top">
				<div className="uk-width-1-1">
					<div className="uk-grid">
						<div className="uk-width-1-4 uk-text-center uk-icon-arrow-circle-left"></div>
						{this._renderMainContent()}
						{/*<div style={styles.rightArrow} className="uk-width-1-4 uk-text-center uk-icon-arrow-circle-right"></div>*/}
					</div>
					<div className="uk-grid uk-border-top">
						{this._renderSmallContent()}
					</div>
				</div>
			</div>
		)
	}
})

var styles = {
	leftArrow: {
	    bottom: '-165px',
	    left: '157px',
	    position: 'relative',
	    zIndex: 10,
	    fontSize: 30
	},
	rightArrow: {
	    bottom: '-165px',
	    position: 'relative',
	    zIndex: 10,
	    left: '310px',
	    fontSize: 30
	}
}

module.exports = Approved;