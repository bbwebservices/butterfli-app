'use strict';
var React = require('react-native');

var {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  PanResponder,
  Image,
  TouchableHighlight,
  LayoutAnimation
} = React;

var UnapprovedContent = React.createClass({

  componentWillMount() {
    this.panResponder = PanResponder.create({
      //says we should respond to pan gensture:
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handleGrant,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleEnd
    });
    this.prevLeft = 0;
    this.slideStyle = {
      left: this.prevLeft,
    }
  },

  componentDidMount() {
    this.updatePosition()
  },

  updatePosition() {
    this.refs.slide.setNativeProps({
      style: this.slideStyle
    })
    if(this.slideStyle.left > 270) {
      this.props.approvePost(this.props.dash_id, this.props.id, 'toggle_approve');
      this.refs.slide.setNativeProps({
        style: {
          backgroundColor: 'yellow'
        }
      })
    } else if (this.slideStyle.left < -310) {
      this.props.approvePost(this.props.dash_id, this.props.id, 'toggle_disapprove');
      this.refs.slide.setNativeProps({
        style: {
          backgroundColor: 'pink'
        }
      })
    } else if (40 < this.slideStyle.left < 270) {
      this.refs.slide.setNativeProps({
        style: {
          backgroundColor: 'blue'
        }
      })  
    } 
  },

  handleEnd(e, gestureState) {
    this.refs.slide.setNativeProps({
      style: {
        backgroundColor: 'blue'
      }
    })

   
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)

    this.prevLeft += gestureState.dx;
  },

  snapBack() {
    if(40 > this.slideStyle.left > 270) {
      this.slideStyle.left = 0;
      this.refs.slide.setNativeProps({
        style: this.slideStyle
    })
    }
  },

  handleMove(e, gestureState) {
    this.slideStyle.left = this.prevLeft + gestureState.dx;
    this.updatePosition();
  },

  handleGrant() {
    this.refs.slide.setNativeProps({
      style: {
        backgroundColor: 'green'
      }
    })
  },

	render: function () {
    console.log(this.props.imgSrc)
			return (
				<View key={this.props.idProp} ref='slide' style={[{flex: 1}, styles.container]} {...this.panResponder.panHandlers}>
          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <Image resizeMode={Image.resizeMode.contain} style={styles.imageStyle} key={this.props.key} source={{uri: this.props.imgSrc}} />
            <Text style={{fontStyle: 'italic'}}>{this.props.body}</Text>         
            <Text style={{fontStyle: 'italic'}}>Source: {this.props.title}</Text>
          </View>

          <TouchableHighlight onPress={function(){this.props.approvePost(this.props.dash_id, this.props.id, 'toggle_approve')}.bind(this)} style={[styles.choiceButton, {backgroundColor: "#1E824C"}]}>
            <Text style={{color: '#ffffff'}}>Approve</Text>
          </TouchableHighlight>
          
          <TouchableHighlight onPress={function(){this.props.approvePost(this.props.dash_id, this.props.id, 'toggle_disapprove')}.bind(this)} style={[styles.choiceButton, {backgroundColor: "#CF000F" }]}>
            <Text style={{color: '#ffffff'}}>Disapprove</Text>
          </TouchableHighlight>
        </View>
		  )	
	}
});

var styles = StyleSheet.create({
	container: {
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000000',
    position: 'absolute',
    height: 600
  },
  header: {
    height: 120,
    backgroundColor: 'red'
  },
  body: {
    backgroundColor: 'green',
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    height: 400,
    width: 375
  },
})

module.exports = UnapprovedContent;