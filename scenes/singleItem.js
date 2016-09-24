import React, {Component} from 'react';
const styles = require('./styles.js')
import { View, TouchableHighlight, Text } from 'react-native';

class SingleItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.item.name}</Text>
      </View>
    );
  }
}

module.exports = SingleItem;
