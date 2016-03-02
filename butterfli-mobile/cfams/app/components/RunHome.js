var React = require('react-native');

var {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	TouchableOpacity,
	ScrollView,
	LayoutAnimation,
	TextInput,
	ActivityIndicatorIOS
} = React;

var localhostUri = 'https://butterfli.herokuapp.com/';
var onlineUri = 'http://localhost:3000/';

var DashHome = React.createClass({

	getInitialState: function () {
		return {
			term: '',
			count: '',
			phil: 'Start Phil!',

		}
	},

	addTerm: function () {
		var acctId = this.props.currentAccount.id;
	    fetch(onlineUri+'dashes/'+acctId+'/add_term?body='+this.state.term+'&count='+this.state.count, {method: 'GET'}, function (err) {
	      console.error('error adding terms: ', err);
	    })
	    .then(function (response) {
	      console.log('newTerm response: ', response);
	      this.props.getRunTerms(acctId)
	    }.bind(this))
  	},

  	removeTerm: function (termId) {
  		var acctId = this.props.currentAccount.id;
	    fetch(onlineUri+'dashes/'+acctId+'/destroy_term?term_id='+termId, {method: 'DELETE'}, function (err) {
	      console.error('error adding terms: ', err);
	    })
	    .then(function (response) {
	      console.log('newTerm response: ', response);
	      this.props.getRunTerms(acctId)
	    }.bind(this))
  	},

  	setLoading: function () {
  		var loader = 'Phil is running.';
  		var counter = 0;
  		setTimeout(function() {
  			counter++;
  			if(counter > 3){
  				loader = 'Phil is running.'
  				return loader; 
  			}
  			loader += '.'
  			return loader;
  		}, 1000)
  	},

	startPhil: function () {
		this.setLoading();
		this.setState({
			phil: 'Phil is running...'
		})
		console.log('booting up Phil...');
  		var acctId = this.props.currentAccount.id;
		fetch(onlineUri+'dashes/'+acctId+'/favorite-tweets', {method: 'GET'}, function (err) {
			console.error('Phil had a malfunction: ', err)
		})
		.then(function (response) {
			console.log('Message from Phil: ', response)
			this.setState({
				phil: 'Start Phil!'
			})
		}.bind(this))
	},

	// Create _renderRow function for these, then add to Scroll View
	render: function () {
		var uniqueKey = 0;
		var terms = this.props.philTerms.map(function (term) {
			uniqueKey++;
			return (
				<TouchableOpacity key={uniqueKey} style={styles.term} onPress={function () {this.removeTerm(term.id)}.bind(this)}>
					<View style={styles.termInfo}>
						<Text>Term: </Text><Text style={{fontStyle: 'italic'}}>{term.body}</Text>
						<Text>Count: </Text><Text style={{fontStyle: 'italic'}}>{term.count}</Text>
					</View>
				</TouchableOpacity>
			)
		}.bind(this))
		return (
			<View style={styles.dashHome}>
				<Text>This is Phil</Text>
				<Text>he's very good at following directions.</Text>
				<Text>he's here to help people find your brand.</Text>
				<Text>plug in a few tags below and</Text>
				<Text>phil will go to work.</Text>
				<Text>let phil bring people to the party.</Text>

				<TextInput onChangeText={function (value) {this.setState({term: value})}.bind(this)} style={styles.inputField} placeholder='term' />
				<TextInput onChangeText={function (value) {this.setState({count: value})}.bind(this)} style={styles.inputField} placeholder='count' />
				
				<View style={styles.philButtonsCont}>
					<TouchableHighlight style={styles.button} onPress={this.addTerm}>
						<Text style={{fontFamily: 'verdana', color: "#000000"}}>Add Term</Text>
					</TouchableHighlight>
					<TouchableHighlight style={styles.button} onPress={this.startPhil}>
						<Text style={{fontFamily: 'verdana', color: "#000000"}}>{this.state.phil}</Text>
					</TouchableHighlight>
				</View>
				
				<ScrollView 
					automaticallyAdjustContentInsets={false}
					style={{height: 350}} 
					>
					<View style={styles.termContainer}>
						{terms}
					</View>
				</ScrollView>


			</View>
		)
	}
});

var styles = StyleSheet.create({
	dashHome: {
		flex: 1,
		alignItems: 'center'
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
	button: {
		flex: .5,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginHorizontal: 5,
	    marginVertical: 3,
	    padding: 5,
	    borderRadius: 3,
	    paddingVertical: 10,
	    paddingHorizontal: 40,
	    backgroundColor: '#EAEAEA',

	},
	philButtonsCont: {
		flex: 1,
		flexDirection: 'row',
	},
	term: {
		flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginHorizontal: 5,
	    marginVertical: 3,
	    padding: 5,
	    borderRadius: 3,
	    paddingVertical: 10,
	    backgroundColor: '#EAEAEA',
	    width: 350
	},
	termsContainer: {
		flex: 1,
		flexDirection: 'row'
	},
	termInfo: {
		flexDirection: 'column',
		alignItems: 'center',
	},
});

module.exports = DashHome;