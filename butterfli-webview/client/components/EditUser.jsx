var React = require('react');
var Navbar = require('./Navbar.jsx')

var EditAccount = React.createClass({

	render(){
		return(
			<div>
				<Navbar username={this.props.username}/>
				<div className="uk-container uk-container-center uk-margin-top fadeIn">
					<div className="uk-grid">	
						<div style={{marginTop: 100}} className="uk-width-medium-1-4 uk-row-first stagger column1">
							<h1>Edit User Page</h1>
						</div>
					</div>
				</div>	
			</div>
		)
	}
})

module.exports = EditAccount;