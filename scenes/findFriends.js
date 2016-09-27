'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder } from 'react-native';
import Welcome from './welcome';

class FindFriends extends Component {
  constructor(props) {
    super(props);
    
    this.onPress = this.onPress.bind(this);
  }
  
  onPress() {
    this.props.navigator.push({
      component: Welcome,
      title: '',
      passProps: {
        user: this.props.user,
        navigator: this.props.navigator
      }
    })
  }
  
  render() {
    return (
      <View>
        <Text>Find Friends</Text>
        
        <TouchableOpacity onPress={this.onPress}>
          <Text>Back</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}

export default FindFriends;