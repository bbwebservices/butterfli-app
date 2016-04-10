var React = require('react');

var TwitterModal = React.createClass({

	componentDidMount(){
		this.animateDown();
	},

	animateDown(){
		TweenMax.from('.twitDropIn', 0.3, {top: -20, opacity: 0})
	},

	render(){
		return (
			<div style={styles.container} className="twitDropIn">
				<form className='uk-panel uk-panel-box uk-form uk-border'>
					<h2>Advanced Twitter Search</h2>
					<h3>Words</h3>
					<div className='uk-form-row'>
					<label>All of these Words</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>
					

					<div className='uk-form-row'>
						<label>This exact phrase</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>

					<div className='uk-form-row'>
						<label>Any of these words</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>

					<div className='uk-form-row'>
						<label>None of these words</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>

					<div className='uk-form-row'>
						<label>These hashtags</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>

					<h3>People</h3>
					<div className='uk-form-row'>
						<label>From these accounts</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>

					<div className='uk-form-row'>
						<label>To these accounts</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>

					<div className='uk-form-row'>
						<label>Mentioning these accounts</label>
						<input style={{left: 50, position: 'relative'}} />
					</div>
					<button className="uk-button">Save</button>
				</form>
			</div>
		)
	}
})

var styles = {
	container: {
		width: 500,
		height: 'auto',
		backgroundColor: '#eeeeee',
		zIndex: 10,
		position: 'absolute',
		right: '-230%',
	    left: '135%',
	    top: '10px'

	}
}

module.exports = TwitterModal;