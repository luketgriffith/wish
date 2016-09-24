import React, {Component} from 'react';
const styles = require('./styles.js')
import { View, TouchableHighlight, Text } from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
