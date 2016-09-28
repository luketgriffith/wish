import React, {Component} from 'react';
const styles = require('./styles.js')
import { View, TouchableHighlight, Text } from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={{ padding: 5, marginTop: 5, marginBottom: 5, backgroundColor: 'blue' }}>{this.props.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
