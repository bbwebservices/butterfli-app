'use strict';
var React = require('react-native');
var ApprovedContent = require('./ApprovedContent.js');
var UnapprovedContent = require('./AccountHome.js');


var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  LayoutAnimation,
  TouchableWithoutFeedback
} = React;

var Navbar = React.createClass({
	getInitialState: function () {
		return {
			menuButton: '...',
			menuButtonStyle: {
				marginTop: -25
			},
			links: {
				approved: ''
			},
			navStyle: {
				height: 50
			},
			menuStyle: {
				marginTop: null
			},

		}
	},

	toApprovedPage: function () {
		console.log(this.props.approvedContent)
		if(!this.props.approvedContent) {
			return this.props.getApprovedContent(this.props.currentAccount.id, this.toApprovedPage)
		}
		this.props.navigate(this.props.navigator, ApprovedContent, 'Approved Content');
	},

	toUnapprovedPage: function () {
		this.props.navigate(this.props.navigator, UnapprovedContent, 'Unapproved Content');
	},

	animateNavbar: function () {
		this.setState({
			navStyle: {
				height: this.state.navStyle.height > 50 ? 50 : 200
			},
			menuButtonStyle: {
				marginTop: this.state.navStyle.height > 50 ? -25 : 90
			},
			menuStyle: {
				marginTop: this.state.navStyle.height > 50 ? null : 30
			},

		})
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring, this.showMenu)

	},
	// try changing margin height so it is hidden instead and doesnt
	showMenu: function () {
		console.log('show menu');
		this.setState({ 
			links: this.state.navStyle.height > 50 ? {approved: 'Approved Posts', unapproved: 'Unapproved Posts'} : {approved: '', unapproved: ''}
		})
	},

	render: function () {
		var navbarStyle = [styles.container, this.state.navStyle];
		var buttonStyle = [this.state.menuButtonStyle, {fontSize: 20}];
		var menuStyle = [styles.linkStyle, this.state.approvedStyle]
		
		return (
			<View style={navbarStyle}>
				<View style={{marginTop: 15, flex: 1, flexDirection: 'row'}}>
					<View style={styles.menuButton}>
						
						<View style={this.state.menuStyle}>
							<TouchableHighlight onPress={this.toApprovedPage}>
									<Text>{this.state.links.approved}</Text>
							</TouchableHighlight>

							<TouchableHighlight onPress={this.toUnapprovedPage}>
									<Text>{this.state.links.unapproved}</Text>
							</TouchableHighlight>
						</View>

						<TouchableWithoutFeedback 
							onPress={this.animateNavbar} 
							style={styles.menuButton} 
							>
							<Text style={buttonStyle}>{this.state.menuButton}</Text> 
						</TouchableWithoutFeedback> 
					</View>
				</View>
			</View>
		)
	}
})

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5F5F5',
		flex: 1,
		flexDirection: 'row'
	},
	menuButton: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	linkStyle: {
		flex: 1,
		flexDirection: 'row',
	},


})

module.exports = Navbar;