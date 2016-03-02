'use strict';

var React = require('react-native');
var Dash = require('./Dash.js');
var ScrapeHome = require('./ScrapeHome.js');
var RunHome = require('./RunHome.js')

var {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	ScrollView,
	LayoutAnimation,
	TextInput,
	ActivityIndicatorIOS
} = React;

var DashHome = React.createClass({

	goToScrapeHome: function (id) {
		if(!this.props.unapprovedContent) {
			return this.props.getDashContent(id, this.goToScrapeHome);
		}
		this.props.navigate(this.props.navigator, ScrapeHome, 'Scrape Home');
	},

	goToRunHome: function (id) {
		if(!this.props.philTerms){
			return this.props.getRunTerms(id, this.goToRunHome);
		}
		this.props.navigate(this.props.navigator, RunHome, 'Run Home');
	},

	// Create _renderRow function for these, then add to Scroll View
	render: function () {
		return (
			<View style={styles.dashHome}>
				<TouchableHighlight style={styles.buttonContents} onPress={function (){this.goToScrapeHome(this.props.currentAccount.id)}.bind(this)}>
					<Text>Scrape</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.buttonContents} onPress={function (){this.goToRunHome(this.props.currentAccount.id)}.bind(this)}>
					<Text>Run</Text>
				</TouchableHighlight>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	dashHome: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: 20
	},
	buttonContents: {
		flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginHorizontal: 5,
	    marginVertical: 3,
	    padding: 5,
	    backgroundColor: '#EAEAEA',
	    borderRadius: 3,
	    paddingVertical: 10,
  },

})

module.exports = DashHome;