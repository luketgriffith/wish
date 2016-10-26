import React, {Component} from 'react';
const styles = require('./styles.js')
import { View, TouchableHighlight, Text, Image } from 'react-native';
import Welcome from './welcome';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={{ marginBottom: 5 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#EEE', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{width: 50, height: 50, borderRadius: 10 }}
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
