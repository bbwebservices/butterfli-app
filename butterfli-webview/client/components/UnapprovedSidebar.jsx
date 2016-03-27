var React = require('react');
var GiphyModal = require('./modals/GiphyModal.jsx');


var UnapprovedSidebar = React.createClass({

	getInitialState() {
		return {
			showGiphyOptions: false,
			twitterTerm: '',
			giphyTerm: '',
			redditTerm: '',
			tumblrTerm: ''
		};
	},

	getPics(network, nTerm){
		this.props.picScrape(this.props.currentDash[0].id, network, this.state[nTerm])
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

	_renderGiphyOptions(){
		if(this.state.showGiphyOptions){
			return (
				<GiphyModal />
			) 
		} else {
			return (
				<div></div>
			)
		}
	},

	render(){
		return (
			<div className="uk-width-1-4">
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.id, 'twitter', this.state.twitterTerm);
						}} className='uk-form'>
							<input ref="twitterTerm" onChange={ this.updateTwitterTerm } type='text' className="uk-width-1-1" />
							<a onClick={ ()=>{this.getPics('twitter', 'twitterTerm')} } className='uk-button uk-button-large uk-width-1-1'>
								Search Twitter
							</a>
						</form>
					</div>
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.id, 'giphy', this.state.giphyTerm);
						}} className='uk-form'>
							<input ref="giphyTerm" onChange={ this.updateGiphyTerm } type='text' className="uk-width-1-1" />
							<a 
							onClick={ ()=>{this.getPics('giphy', 'giphyTerm')} } 
							className='uk-button uk-button-large uk-width-1-1'
							>
							Search Giphy
							</a>
							<div 
							onClick={(e) => {
								e.preventDefault();
								if(!this.state.showGiphyOptions) this.setState({showGiphyOptions: true});
								else this.setState({showGiphyOptions: false})
							}} 
							className='uk-button uk-button-small uk-width-1-1' style={{marginTop: 10}}
							>
								Advanced Search
							</div>
							{this._renderGiphyOptions()}
						</form>
					</div>
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.id, 'reddit', this.state.redditTerm);
						}} className='uk-form'>
							<input ref="redditTerm" onChange={ this.updateRedditTerm } type='text' className="uk-width-1-1" />
							<a onClick={ ()=>{this.getPics('reddit', 'redditTerm')} } className='uk-button uk-button-large uk-width-1-1'>
								Search Reddit
							</a>
						</form>
					</div>
					<div className="uk-panel uk-panel-box uk-panel-box-primary">
						<form onSubmit={(e) => {
							e.preventDefault();
							this.props.picScrape(this.props.id, 'tumblr', this.state.tumblrTerm);
						}} className='uk-form'>
							<input ref="tumblrTerm" onChange={ this.updateTumblrTerm } type='text' className="uk-width-1-1" />
							<a onClick={ ()=>{this.getPics('tumblr', 'tumblrTerm')} } className='uk-button uk-button-large uk-width-1-1'>
								Search Tumblr
							</a>
						</form>
					</div>
				</div>
		)
	}
})

module.exports = UnapprovedSidebar;