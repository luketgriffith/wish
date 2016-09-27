'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder } from 'react-native';
import FindFriends from './findFriends';

class Friends extends Component {
  constructor(props) {
    super(props);
    
    this.onPress = this.onPress.bind(this);
  }
  
  onPress() {
    this.props.navigator.push({
      component: FindFriends,
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
        <Text>Friends go here</Text>
        <TouchableHighlight onPress={this.onPress} style={{ backgroundColor: 'blue' }}>
          <Text>Find Friends!</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default Friends;
