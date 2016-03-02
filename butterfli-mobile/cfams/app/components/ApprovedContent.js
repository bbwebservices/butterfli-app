var React = require('react-native');

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
} = React;

var ApprovedContent = React.createClass({

  componentDidMount: function () {
    console.log('ayyy ', this.props.approvedContent);
  },

	render: function () {
    console.log(this.props.approvedContent)
    var imageStyle = [styles.resizeMode]
    var idProp = 0;
    var images = this.props.approvedContent.map(function (element, index) {
      idProp++;
      return (

        <View key={idProp} style={{marginBottom: 50, flex: 1}}>

          <View style={{flex: 1}}>
            <Image resizeMode={Image.resizeMode.contain} style={imageStyle} key={index} source={{uri: element.image_src}} />
            <Text style={{fontStyle: 'italic'}}>{element.body}</Text>         
            <Text style={{fontStyle: 'italic'}}>Source: {element.title}</Text>
          </View>
          
          <View>
            <View style={styles.postContainer}>
              <TouchableHighlight onPress={function(){this.props.sendPost(element.dash_id, element.id, 'post_tweet')}.bind(this)} style={styles.choiceButton}>
                <Text>Post to Twitter!</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={function(){this.props.sendPost(element.dash_id, element.id, 'post_tumblr')}.bind(this)} style={styles.choiceButton}>
                <Text>Post to Tumblr!</Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight onPress={function(){this.props.approvePost(element.dash_id, element.id, 'toggle_disapprove')}.bind(this)} style={styles.choiceButton}>
              <Text>Disapprove</Text>
            </TouchableHighlight>
          </View>

        </View>

        )
    }.bind(this)) 
             
    return (
      <View>
        <View>  
              <ScrollView
                  automaticallyAdjustContentInsets={false}
                  horizontal={false}
                  style={[styles.scrollView, styles.horizontalScrollView]}>
                  {images}
              </ScrollView>
           </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  scrollView: {
      backgroundColor: 'D9F0FF',
      // height: 300,
      flex: 1
    },
  horizontalScrollView: {
    flex: 1
  },
  accountHome: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  resizeMode: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: '#ffffff',
    height: 400 
  },
  choiceButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 5,
    borderRadius: 3,
    paddingVertical: 10,
    backgroundColor: 'blue'
  },
  postContainer: {

  }

})

module.exports = ApprovedContent;
