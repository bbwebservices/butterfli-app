var React = require('react');
var GiphyModal = require('./modals/GiphyModal.jsx');


var UnapprovedSidebar = React.createClass({

	getInitialState() {
		return {
			showGiphyOptions: false,
			twitterTerm: '',
			giphyTerm: '',
			redditTerm: '',
			tumblrTerm: '',
			advancedOptions: ''
		};
	},

	//Start api request to get content. based on network, search term, and search options
	getPics(network, nTerm){
		this.props.picScrape(this.props.id, network, this.state[nTerm], this.state.advancedOptions)
	},

	updateTerms(networkTerm){
		this.setState({
			[networkTerm]: this.refs[networkTerm].value
		})
	},

	setAdvancedOptions(options, remove){
		var updatedOption,
			reg;
		if(remove){
			if(options.match(/,/g)) this.setState({ advancedOptions: '' });
		    else {
				reg = new RegExp(options, 'i');
				updatedOption = this.state.advancedOptions.replace(reg, '');
				this.setState({ advancedOptions: updatedOption });
			}
		} else {
			if(this.state.advancedOptions === '') this.setState({ advancedOptions: options });
			else {
				updatedOption = this.state.advancedOptions +options;
				this.setState({ advancedOptions: updatedOption });
			}
		}
	},

	_renderGiphyOptions(){
		if(this.state.showGiphyOptions){
			return (
				<GiphyModal setAdvancedOptions={this.setAdvancedOptions} />
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
							<input ref="twitterTerm" onChange={ () => {this.updateTerms('twitterTerm')} } type='text' className="uk-width-1-1" />
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
							<input ref="giphyTerm" onChange={ () => {this.updateTerms('giphyTerm')} } type='text' className="uk-width-1-1" />
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
							<input ref="redditTerm" onChange={ () => {this.updateTerms('redditTerm')} } type='text' className="uk-width-1-1" />
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
							<input ref="tumblrTerm" onChange={ () => {this.updateTerms('tumblrTerm')} } type='text' className="uk-width-1-1" />
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