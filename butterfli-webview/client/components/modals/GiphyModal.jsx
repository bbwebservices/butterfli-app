var React = require('react');

var GiphyModal = React.createClass({

	getInitialState: function() {
		return {
			gifsChecked: false,
			stickersChecked: false,
			searchChecked: false,
			translateChecked: false,
			randomChecked: false

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
										if(!this.state.searchChecked) this.setState({searchChecked: true})
					    				else this.setState({searchChecked: false})}} 
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
										if(!this.state.translateChecked) this.setState({translateChecked: true})
					    				else this.setState({translateChecked: false})}} 
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
										if(!this.state.randomChecked) this.setState({randomChecked: true})
					    				else this.setState({randomChecked: false})}} 
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
										if(!this.state.gifsChecked) this.setState({gifsChecked: true})
					    				else this.setState({gifsChecked: false})
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
										if(!this.state.stickersChecked) this.setState({stickersChecked: true})
									    else this.setState({stickersChecked: false})
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