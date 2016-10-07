import React, {Component} from 'react';
const styles = require('./styles.js')
import { View, TouchableHighlight, Text, Image } from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{width: 70, height: 70}}
           source={{ uri: this.props.item.img_url }}
          />
          <Text style={{ padding: 5, marginTop: 5, marginBottom: 5, backgroundColor: 'blue' }}>{this.props.item.description}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
