import React, {Component} from 'react';
const styles = require('./styles.js')
import { View, TouchableHighlight, TouchableOpacity, Text, Image } from 'react-native';
import Welcome from './welcome';

class SingleItem extends Component {
  constructor(props) {
    super(props);

    this.back = this.back.bind(this);
  }

  back() {
    this.props.navigator.push({
      component: Welcome,
      title: '',
      passProps: {}
    });
  }

  render() {
    return (
      <View style={{ padding: 10, paddingTop: 60, flexDirection: 'column' }}>
      <TouchableOpacity onPress={this.back} style={{ position: 'absolute', top: 5, left: 5 }}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Image
        style={{width: 200, height: 400}}
        source={{ uri: this.props.item.img_url }}
      />
      <Text>{this.props.item.description}</Text>
      </View>
    );
  }
}

module.exports = SingleItem;
