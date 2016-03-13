var React = require('react');
var Navbar = require('./Navbar.jsx');
var Approved = require('./Approved.jsx');
var Unapproved = require('./Unapproved.jsx');

var ScrapeHome = React.createClass({

	getInitialState() {
		return {
			selected: '', 
			isSelected: false,
			hasChanged: false,
			newBody: null
		};
	},

	selectTab(tab){
		this.setState({
			selected: tab
		})
	},

	animateContainer(){
		TweenMax.from('.fadeIn', 0.3, {scale: 1.04, opacity: 0, left: 500})
	},

	componentDidMount(){
		this.animateContainer();
	},

	_renderContentTabs(){
		if(this.state.selected === 'Approved') {
			this.refs.approvedTab.classList.add('uk-active');
			this.refs.unapprovedTab.classList.remove('uk-active');
			return (
				<Approved 
					key={this.props.currentDash[0].id}
					postApproval={this.props.postApproval} 
					approvedPosts={this.props.approvedPosts}
					currentDash={this.props.currentDash}	
					postToNetwork={this.props.postToNetwork} 
					editPostBody={this.props.editPostBody}
				/>
			)
		}
		if(this.refs.approvedTab){
			this.refs.unapprovedTab.classList.add('uk-active');
			this.refs.approvedTab.classList.remove('uk-active');
		}
		return ( 
			<Unapproved 
				key={this.props.currentDash[0].id}
				postApproval={this.props.postApproval} 
				unapprovedPosts={this.props.unapprovedPosts} 
				currentDash={this.props.currentDash} 
				picScrape={this.props.picScrape} 
			/> 
		)
	},

	render(){
		return (
			<div>
				<Navbar {...this.props} currentDash={this.props.currentDash}/>
				<div className="uk-container uk-container-center uk-margin-top fadeIn">

					<div className="uk-grid">

						<div className="uk-width-1-1">
							<ul className="uk-tab">
								<li className="uk-active" ref="unapprovedTab"><a onClick={()=>{this.selectTab('Unapproved')}}>Unapproved</a></li>
								<li ref="approvedTab"><a onClick={()=>{this.selectTab('Approved')}}>Approved</a></li>

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