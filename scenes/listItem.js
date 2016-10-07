import React, {Component} from 'react';
const styles = require('./styles.js')
import { View, TouchableHighlight, Text, Image } from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={{ flexDirection: 'row', backgroundColor: '#A0DDFF', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{width: 60, height: 60}}
           source={{ uri: this.props.item.img_url }}
          />
          <Text
            style={{  flex: 1, paddingLeft: 5 }}>
            {this.props.item.description}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
