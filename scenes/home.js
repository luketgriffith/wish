'use strict';
import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
var t = require('tcomb-form-native');
import base from '../config';

class Home extends Component {
  constructor(props) {
    super(props)

  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  render() {
    return(
      <View>
        <Text>Home Screen</Text>
      </View>
    )
  }
}

export default Home;
