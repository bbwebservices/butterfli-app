'use strict';
var React = require('react-native');
var UnapprovedContent = require('./UnapprovedContent.js');


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
  TouchableOpacity,
  ScrollView,
  PanResponder
} = React;

var Dash = React.createClass({

	getInitialState: function () {
		return {
			viewStyle: {
				height: 400,
			}
		}
	},

	render: function () {
		
		// var images = this.props.unapprovedContent.map(function (element, index) {
		// 	console.log(element.image_src)
		// 	idProp++;
		// 	return (
		// 		<View key={idProp} ref='slide' style={styles.slide} {...this.panResponder.panHandlers}>
		// 			<View style={{flex: 1, backgroundColor: 'white'}}>
		// 				<Image resizeMode={Image.resizeMode.contain} style={imageStyle} key={index} source={{uri: element.image_src}} />
		// 				<Text style={{fontStyle: 'italic'}}>{element.body}</Text>					
		// 				<Text style={{fontStyle: 'italic'}}>Source: {element.title}</Text>
		// 			</View>
		// 			<TouchableHighlight onPress={function(){this.props.approvePost(element.dash_Id, element.id, 'toggle_approve')}.bind(this)} style={[styles.choiceButton, {backgroundColor: "#1E824C"}]}>
		// 				<Text style={{color: '#ffffff'}}>Approve</Text>
		// 			</TouchableHighlight>
					
		// 			<TouchableHighlight onPress={function(){this.props.approvePost(element.dash_Id, element.id, 'toggle_disapprove')}.bind(this)} style={[styles.choiceButton, {backgroundColor: "#CF000F" }]}>
		// 				<Text style={{color: '#ffffff'}}>Disapprove</Text>
		// 			</TouchableHighlight>
		// 		</View>
		// 		)
		// }.bind(this))
		var idProp = 0;
		var contentComps = this.props.unapprovedContent.map(function(element, index) {
			console.log("DASHID: ", element)
			idProp++;
			return (
				<View key={idProp}>
					<UnapprovedContent 
						idProp={idProp} 
						imgSrc={element.image_src} 
						key={index} 
						body={element.body}
						title={element.title} 
						approvePost={this.props.approvePost}
						dash_id={element.dash_id} 
						id={element.id}
					/>
				</View>
			)
		}.bind(this))

		return (
			<View style={{flex: 1}}>
				{contentComps}
			</View>
		)
	}
});

var styles = StyleSheet.create({
	scrollView: {
		backgroundColor: 'D9F0FF',
		height: 300,
	 },
	horizontalScrollView: {
		height: 600,
		width: 400
	},
	accountHome: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 20
	},
	resizeMode: {
	    flex: 2,
	    flexDirection: 'row',
	    borderBottomWidth: 0.5,
	    borderColor: 'black',
	    backgroundColor: '#ffffff',
 	},
 	choiceButton: {
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
 	slide: {
 		flex: 1,
 		flexDirection: 'column',
	    justifyContent: 'center',
	    alignItems: 'center',
	    position: 'absolute',
	    backgroundColor: 'white',
	    top: 0,
	    left: 0
 	}

})

module.exports = Dash;