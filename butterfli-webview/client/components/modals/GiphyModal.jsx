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

	componentDidMount(){
		this.animateDown();
	},

	// animate serach options down. need to work on this
	animateDown(){
		TweenMax.from('.gifDropIn', 1, {bottom: 100, opacity: 0})
	},

	_renderChildOptions(){

		// Render options to put after gifs or stickers are selected
		if(this.state.stickersChecked || this.state.gifsChecked){
			return (
				<div className="uk-vertical-align uk-text-center uk-height-1-1 uk-margin-top gifDropIn">
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
											// Set advancedTerms then update in parent
											this.setState({
												searchChecked: true,
											});
											this.props.setAdvancedOptions('search', false);
										}
					    				else {
					    					this.setState({
					    						searchChecked: false,
					    					})
					    					this.props.setAdvancedOptions('search', true);
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
											// Set advancedTerms then update in parent
											this.setState({
												translateChecked: true,
											})
											this.props.setAdvancedOptions('translate', false);
										}
					    				else {
					    					this.setState({
					    						translateChecked: false,
					    					})
					    					this.props.setAdvancedOptions('translate', true);
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
											// Set advancedTerms then update in parent
											this.setState({
												randomChecked: true,
											})
											this.props.setAdvancedOptions('random', false);
										}
					    				else {
					    					this.setState({
					    						randomChecked: false,
					    					})
					    					this.props.setAdvancedOptions('random', true);
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
			<div className="gifDropIn">
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
											});
											this.props.setAdvancedOptions('gifs,', false);
										}
					    				else {
					    					this.setState({
					    						gifsChecked: false,
					    						searchChecked: false,
									    		translateChecked: false,
									    		randomChecked: false
					    					});
											this.props.setAdvancedOptions('gifs,', true);
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
											})
											this.props.setAdvancedOptions('stickers,', false);

										}
									    else {
									    	this.setState({
									    		stickersChecked: false,
									    		searchChecked: false,
									    		translateChecked: false,
									    		randomChecked: false
									    	})
									    	this.props.setAdvancedOptions('stickers,', true);
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