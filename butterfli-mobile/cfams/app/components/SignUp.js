'use strict';

var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight
} = React;

var SignUp = React.createClass({
	render: function () {
		return (
			<View>
				<View style={styles.introText}>
					<Text>Sign up with Butterfli and start finding awesome content!</Text>
				</View>
				<View>
					<TextInput style={styles.textInput} placeholder='email' />
					<TextInput style={styles.textInput} placeholder='password' />
					<TextInput style={styles.textInput} placeholder='confirm password' />
				</View>
				<TouchableHighlight style={styles.submitButton}>
					<Text>Create Account</Text>
				</TouchableHighlight>

			</View>
		)
	}
});

var styles = StyleSheet.create({
	conatiner: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	introText: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

	},
	textInput: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
        flexDirection: 'row',
        borderColor: '#B2CFDD',
        borderRadius: 4,
        borderWidth: 2,
        padding: 5,
        color: 'darkgrey',
        backgroundColor: '#ffffff',
        marginHorizontal: 30,
	    marginVertical: 3,
	},
	submitButton: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginHorizontal: 30,
	    marginVertical: 3,
	    padding: 5,
	    borderRadius: 3,
	    paddingVertical: 10,
	    backgroundColor: '#B2CFDD',
	    height: 50
  	},
})

module.exports = SignUp;