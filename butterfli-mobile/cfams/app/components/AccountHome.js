'use strict';

var React = require('react-native');
var Dash = require('./Dash.js');
var DashHome = require('./DashHome.js');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  Image,
  LayoutAnimation,
  TouchableWithoutFeedback,
  ScrollView,
  Link
} = React;

var AccountHome = React.createClass({

	getInitialState: function () {
		return {
			viewStyle: {
				height: 240,
			    width: 360
			}
		}
	},

	goToDashHome: function (id) {
		// reset the unapprovedContent state here. so dash can be repopulated when selecting different one
		if(!this.props.currentAccount) {
			return this.props.saveId(id, this.goToDashHome);
		}
		this.props.navigate(this.props.navigator, DashHome, 'Dash Home');
	},

	render: function () {
		console.log('dashes: ', this.props.userDashes)
		var idProp = 0;
		var dashList = this.props.userDashes.map(function (dash) {
			idProp++;
			return ( 
				<View key={idProp}>
					<TouchableHighlight onPress={function(){this.goToDashHome(dash.id)}.bind(this)} style={styles.buttonContents}>
						<Text>{dash.title}</Text>
					</TouchableHighlight>
				</View> 
			)
		}.bind(this)) 

		return (
			<View style={styles.container}>	
				{dashList}	
			</View>
		)
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: 20
	},
	dash: {
		backgroundColor: 'turquoise',
		padding: 10,
		borderRadius: 10,
	},
	buttonContents: {
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

module.exports = AccountHome;