var React = require('react');
var Navbar = require('./Navbar.jsx');
var Approved = require('./Approved.jsx');
var Unapproved = require('./Unapproved.jsx');

var ScrapeHome = React.createClass({

	getInitialState(){
		return {
			selected: '',
			twitterTerm: '',
			giphyTerm: '',
			redditTerm: '',
			tumblrTerm: ''
		}
	},

	selectTab(tab){
		this.setState({
			selected: tab
		})
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

	animateContainer(){
		TweenMax.from('.fadeIn', 0.3, {scale: 1.04, opacity: 0})
	},

	componentDidMount(){
		this.animateContainer();
	},

	_renderContentTabs(){
		if(this.state.selected === 'Unapproved') {
			this.refs.unapprovedTab.classList.add('uk-active');
			this.refs.approvedTab.classList.remove('uk-active');
			return ( 
				<Unapproved 
					postApproval={this.props.postApproval} 
					unapprovedPosts={this.props.unapprovedPosts} 
					currentDash={this.props.currentDash}
				/> 
			)
		}
		if(this.refs.approvedTab){
			this.refs.approvedTab.classList.add('uk-active');
			this.refs.unapprovedTab.classList.remove('uk-active');
		}
		return (
			<Approved 
				postApproval={this.props.postApproval} 
				approvedPosts={this.props.approvedPosts}
				currentDash={this.props.currentDash}	 
			/>
		)
	},

	render(){
		return (
			<div>
				<Navbar {...this.props} currentDash={this.props.currentDash}/>
				<div className="uk-container uk-container-center uk-margin-top fadeIn">

					<div className="uk-grid">
						<div className="uk-width-1-4" style={{marginTop: 52}}>
							<div className="uk-panel uk-panel-box uk-panel-box-primary">
								<form className='uk-form'>
									<input ref="twitterTerm" onChange={ this.updateTwitterTerm } type='text' className="uk-width-1-1" />
									<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'twitter', this.state.twitterTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Twitter</a>
								</form>
							</div>
							<div className="uk-panel uk-panel-box uk-panel-box-primary">
								<form className='uk-form'>
									<input ref="giphyTerm" onChange={ this.updateGiphyTerm } type='text' className="uk-width-1-1" />
									<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'giphy', this.state.giphyTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Giphy</a>
								</form>
							</div>
							<div className="uk-panel uk-panel-box uk-panel-box-primary">
								<form className='uk-form'>
									<input ref="redditTerm" onChange={ this.updateRedditTerm } type='text' className="uk-width-1-1" />
									<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'reddit', this.state.redditTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Reddit</a>
								</form>
							</div>
							<div className="uk-panel uk-panel-box uk-panel-box-primary">
								<form className='uk-form'>
									<input ref="tumblrTerm" onChange={ this.updateTumblrTerm } type='text' className="uk-width-1-1" />
									<a onClick={ ()=>{this.props.picScrape(this.props.currentDash[0].id, 'tumblr', this.state.tumblrTerm)} } className='uk-button uk-button-large uk-width-1-1'>Search Tumblr</a>
								</form>
							</div>
						</div>

						<div className="uk-width-3-4">
							<ul className="uk-tab">
								<li className="uk-active" ref="approvedTab"><a onClick={()=>{this.selectTab('Approved')}}>Approved</a></li>
								<li ref="unapprovedTab"><a onClick={()=>{this.selectTab('Unapproved')}}>Unapproved</a></li>
							</ul>
							{this._renderContentTabs()}
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = ScrapeHome;