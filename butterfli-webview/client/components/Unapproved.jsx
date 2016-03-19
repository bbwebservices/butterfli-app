var React = require('react');
var ReactDOM = require('react-dom');
var UnapprovedListItem = require('./scrape_components/unapprovedListItem.jsx')


var Unapproved = React.createClass({

	getInitialState(){
		return {
			twitterTerm: '',
			giphyTerm: '',
			redditTerm: '',
			tumblrTerm: ''
		}
	},

	updateTwitterTerm(){
		this.setState({
			twitterTerm: this.refs.twitterTerm.value
		})
	},
	
	updateGiphyTerm(){
		this.setState({
			giphyTerm: this.refs.giphyTerm.value
		})
	},

	updateRedditTerm(){
		this.setState({
			redditTerm: this.refs.redditTerm.value
		})
	},

	updateTumblrTerm(){
		this.setState({
			tumblrTerm: this.refs.tumblrTerm.value
		})
	},

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.05);
	},

	componentDidMount(){
		this.animateListItems();
	},

	_renderContent(){

		if(this.props.unapprovedPosts){
			return this.props.unapprovedPosts.map((element) => {
				return ( 
					<UnapprovedListItem 
						id={element.id} 
						og_source={element.og_source} 
						title={element.title} 
						currentDash={this.props.currentDash} 
						postApproval={this.props.postApproval} 
						body={element.body}
					/>
				)
			})
		}
		return ( <div>cannot connect to the server!</div> )
	},

	render(){
		return (
			<div className="uk-grid uk-margin-top ">
				<div className="uk-width-1-4">
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.currentDash[0].id, 'twitter', this.state.twitterTerm);
						}} className='uk-form'>
							<input ref="twitterTerm" onChange={ this.updateTwitterTerm } type='text' className="uk-width-1-1" />
							<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'twitter', this.state.twitterTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Twitter</a>
						</form>
					</div>
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.currentDash[0].id, 'giphy', this.state.giphyTerm);
						}} className='uk-form'>
							<input ref="giphyTerm" onChange={ this.updateGiphyTerm } type='text' className="uk-width-1-1" />
							<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'giphy', this.state.giphyTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Giphy</a>
						</form>
					</div>
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.currentDash[0].id, 'reddit', this.state.redditTerm);
						}} className='uk-form'>
							<input ref="redditTerm" onChange={ this.updateRedditTerm } type='text' className="uk-width-1-1" />
							<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'reddit', this.state.redditTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Reddit</a>
						</form>
					</div>
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.currentDash[0].id, 'tumblr', this.state.tumblrTerm);
						}} className='uk-form'>
							<input ref="tumblrTerm" onChange={ this.updateTumblrTerm } type='text' className="uk-width-1-1" />
							<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'tumblr', this.state.tumblrTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Tumblr</a>
						</form>
					</div>
				</div>
				<div className="uk-width-3-4">
					<div className="uk-grid">
						{this._renderContent()}
					</div>
				</div>	
			</div>
		)
	}
})


module.exports = Unapproved;