'use strict';

var React = require('react-native');
var SignUp = require('./SignUp.js');
var Dash = require('./Dash.js');
var AccountHome = require('./AccountHome.js');

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TextInput,
  AlertIOS
} = React;

var Login = React.createClass({

	goToSignUp: function () {
		this.props.navigate(this.props.navigator, SignUp, 'Sign Up');
	},

	goToDashes: function () {		
		if(!this.props.userLoggedIn) {
			return this.props.checkCreds(this.goToDashes);
		} else if(this.props.userDenied) {
            return AlertIOS.alert('Sorry, your creds don\'t checkout!');
		}	
		this.props.navigate(this.props.navigator, AccountHome, 'Account Home');
	},

	render: function () {
		return (
			<View style={styles.login}>

				<View style={styles.headingContainer}>
					<Text style={styles.heading}>Welcome to Butterfli</Text>
					<Text style={styles.tagLine}>the premier content finding and management system</Text>
					<Text style={styles.tagLine}>for the cannabis industry</Text>
				</View>

                <TouchableHighlight>
                    <TextInput style={styles.inputField} onChangeText={this.props.setUsername} placeholder='username'/>    
                </TouchableHighlight>

                <TouchableHighlight>
                    <TextInput style={styles.inputField} onChangeText={this.props.setPassword} placeholder='password'/>    
                </TouchableHighlight>

				<View style={styles.buttonContainer}>
		 
					<TouchableHighlight style={[styles.button, {marginRight: 20}]} onPress={this.goToSignUp}>
						<Text style={{fontFamily: 'verdana'}}>Sign Up</Text>
					</TouchableHighlight>
					<TouchableHighlight style={[styles.button, {marginLeft: 20}]} onPress={this.goToDashes}>
						<Text style={{fontFamily: 'verdana'}}>Login</Text>
					</TouchableHighlight>
				</View>	

			</View>	
		)
	}
});

var styles = StyleSheet.create({
	login: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 80,
	},
	inputField: {
		height: 50,
        width: 300,
        borderColor: '#B2CFDD',
        borderRadius: 4,
        borderWidth: 2,
        marginBottom: 30,
        padding: 5,
        justifyContent: 'center',
        color: 'darkgrey',
        backgroundColor: '#ffffff'
	},
	headingContainer: {
		marginBottom: 30,
		alignItems: 'center',
	},
	heading: {
		fontSize: 28,
		fontFamily: 'verdana'
	},
	tagLine: {
		fontSize: 10,
		fontStyle: 'italic',
		fontFamily: 'verdana'

	},
	buttonContainer: {
		flexDirection: 'row',
	},
	button: {
		alignItems: 'center',
	    marginHorizontal: 5,
	    marginVertical: 3,
	    padding: 5,
	    backgroundColor: '#EAEAEA',
	    borderRadius: 3,
	    paddingVertical: 10,
	    paddingHorizontal: 30

	}
})

module.exports = Login;