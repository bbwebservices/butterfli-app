'use strict';

var React = require('react-native');
var Dash = require('./Dash.js');
var UnapprovedContent = require('./UnapprovedContent.js');

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

var localhostUri = 'https://butterfli.herokuapp.com/';
var onlineUri = 'http://localhost:3000/';

var ScrapeHome = React.createClass({

	getInitialState: function () {
		return {
			twitterTerm: '',
			giphyTerm: '',
			redditTerm: '',
			tumblrTerm: '',
			animating: {
				twitter: false,
				giphy: false,
				reddit: false,
				tumblr: false
			},
			twitterButton: 'Twitter'

		}
	},

	goToUnapprovedContent: function () {
		this.props.navigate(this.props.navigator, UnapprovedContent, 'UnapprovedContent')
	},

	addTerms: function (toggle, term) {
		this.props.resetContentState();
		fetch(onlineUri+'/dashes/'+this.props.currentAccount.id+'/'+toggle+'?search_term='+term, {method: 'GET'}, function(){
			this.setState({
				animating: {
					twitter: true,
					twitterButton: 'Fetching Tweets...'
				}
			})
		}, function (err) {
			console.error('Error adding Terms: ', err)
		}.bind(this))
		.then(function (response) {
			console.log('Scrape Response: ', response)
			this.setState({
				animating: {
					twitter: false,
					twitterButton: 'Twitter'
				}
			})
		}.bind(this))
	},

	goToDashes: function (id) {
		if(!this.props.unapprovedContent) {
			return this.props.getDashContent(id, this.goToDashes);
		}
		this.props.navigate(this.props.navigator, Dash, 'Dash');
		// this.props.navigate(this.props.navigator, UnapprovedContent, 'UnapprovedContent')
		
	},

	render: function () {
		return (
			<View style={styles.ScrapeHome}>
					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({twitterTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#4099FF'}]} onPress={function(){this.addTerms('twitter-pics', this.state.twitterTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana', color: "#ffffff"}}>{this.state.twitterButton}</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({giphyTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#35465C'}]} onPress={function(){this.addTerms('giphy-gifs', this.state.giphyTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana', color: "#ffffff"}}>Giphy</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({redditTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#5F99CF'}]} onPress={function(){this.addTerms('reddit-pics', this.state.redditTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana', color: "#ffffff"}}>Reddit</Text>
						</TouchableHighlight>
					</View>

					<View style={styles.termContainer}>
						<TouchableHighlight>
							<TextInput onChangeText={function (term) {this.setState({tumblrTerm: term})}.bind(this)} style={styles.inputField} />
						</TouchableHighlight>
						<TouchableHighlight style={[styles.button, {backgroundColor: '#35465C'}]} onPress={function(){this.addTerms('tumblr-pics', this.state.tumblrTerm)}.bind(this)}>
							<Text style={{fontFamily: 'verdana', color: "#ffffff"}}>Tumblr</Text>
						</TouchableHighlight>
					</View>

				<TouchableHighlight style={[styles.button, styles.scrapeButton]} onPress={function (){this.goToDashes(this.props.currentAccount.id)}.bind(this)}>
					<Text>Scrape!</Text>
				</TouchableHighlight>
			</View>
		)
	}
});

var styles = StyleSheet.create({
	ScrapeHome: {
		flex: 1,
		justifyContent: 'center'
	},
	inputField: {
		height: 50,
        flexDirection: 'row',
        borderColor: '#B2CFDD',
        borderRadius: 4,
        borderWidth: 2,
        padding: 5,
        justifyContent: 'center',
        color: 'darkgrey',
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
	    marginVertical: 3,
	},
	scrapeButton: {
	    backgroundColor: '#EAEAEA',
		marginTop: 20,
		height: 60
	},
	button: {
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginHorizontal: 5,
	    marginVertical: 3,
	    padding: 5,
	    borderRadius: 3,
	    paddingVertical: 10,
  	},
	termContainer: {
		padding: 5,
		marginTop: 20,
        borderRadius: 4,
        borderColor: 'grey'
	}
})

module.exports = ScrapeHome;