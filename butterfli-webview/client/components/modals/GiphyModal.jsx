var React = require('react');

var GiphyModal = React.createClass({

	getInitialState: function() {
		return {
			gifsChecked: false,
			stickersChecked: false,
			searchChecked: false,
			translateChecked: false,
			randomChecked: false,
			advancedTerms: '',

		};
	},

	// animate serach options down. need to work on this
	animateDown(){
		TweenMax.from('.dropIn', 1, {bottom: 100, opacity: 0})
	},

	componentDidMount(){
		this.animateDown();
	},

	_renderChildOptions(){

		// Render options to put after gifs or stickers are selected
		if(this.state.stickersChecked || this.state.gifsChecked){
			return (
				<div className="uk-vertical-align uk-text-center uk-height-1-1 uk-margin-top">
					<div style={{zIndex: 1}} className="uk-vertical-align-middle">
						
						<label>search</label>
						{(() => {
							if(this.state.translateChecked || this.state.randomChecked){
								return <input type="checkbox" style={{marginRight: 8}} disabled/>
							} else {
								return ( 
									<input 
									onClick={() => {
										if(!this.state.searchChecked) {
											this.setState({
												searchChecked: true,
												advancedTerms: this.state.advancedTerms +'search'
											});

										}
					    				else {
					    					var updatedTerms = this.state.advancedTerms.replace(/search/i, '');
					    					this.setState({
					    						searchChecked: false,
					    						advancedTerms: updatedTerms
					    					})
					    				}
					    			}} 
				    				type="checkbox" 
				    				style={{marginRight: 8}}
				    				/>
			    				)
							}
						})()}

						<label>translate</label>
						{(() => {
							if(this.state.searchChecked || this.state.randomChecked) {
								return <input type="checkbox" disabled/>
							} else {
								return (
									<input 
									onClick={() => {
										if(!this.state.translateChecked) {
											this.setState({
												translateChecked: true,
												advancedTerms: this.state.advancedTerms +'translate'
											})
										}
					    				else {
					    					var updatedTerms = this.state.advancedTerms.replace(/translate/i, '');
					    					this.setState({
					    						translateChecked: false,
					    						advancedTerms: updatedTerms
					    					})
					    				}
					    			}} 
				    				type="checkbox"
				    				/>
				    			)
							}
						})()}
						
						<label>random</label>
						{(() => {
							if(this.state.searchChecked || this.state.translateChecked) {
								return <input type="checkbox" disabled/>
							} else {
								return (
									<input 
									onClick={() => {
										if(!this.state.randomChecked) {
											this.setState({
												randomChecked: true,
												advancedTerms: this.state.advancedTerms +'random'
											})
										}
					    				else {
					    					var updatedTerms = this.state.advancedTerms.replace(/random/i, '');
					    					this.setState({
					    						randomChecked: false,
					    						advancedTerms: updatedTerms
					    					})
					    				}
					    			}} 
				    				type="checkbox"
				    				/>
				    			)
							}
						})()}
					</div>
				</div>


			)
		}
	},

	render(){
		return (
			<div className="dropIn">
				<div 
				className="uk-vertical-align uk-text-center uk-height-1-1 uk-margin-top"
				
				>
					<div style={{zIndex: 1}} className="uk-vertical-align-middle">
						<label>gifs</label>
						{(() => {
							if(this.state.stickersChecked){
								return <input style={{marginRight: 8}} type='checkbox' disabled/>
							} else {
								return (
									<input onClick={() => {
										if(!this.state.gifsChecked) {
											this.setState({
												gifsChecked: true,
												advancedTerms: 'gifs,'
											});

										}
					    				else {
					    					var updatedTerms = this.state.advancedTerms.replace(/gifs,/i, '');
					    					this.setState({
					    						gifsChecked: false,
					    						advancedTerms: updatedTerms
					    					});

					    				}
									}} style={{marginRight: 8}} type='checkbox'/>
								)
							}
						})()}
						
						<label>stickers</label>
						{(() => {
							if(this.state.gifsChecked){
								return <input type='checkbox' disabled/>
							} else {
								return (
									<input onClick={() => {
										if(!this.state.stickersChecked) {
											this.setState({
												stickersChecked: true,
												advancedTerms: 'stickers,'
											})
										}
									    else {
					    					var updatedTerms = this.state.advancedTerms.replace(/stickers,/i, '');
									    	this.setState({
									    		stickersChecked: false,
									    		advancedTerms: updatedTerms
									    	})
									    }
									}} type='checkbox' />
								)
							}
						})()}
						

					</div>
				</div>
				{this._renderChildOptions()}
			</div>
		)
	}
})

module.exports = GiphyModal;