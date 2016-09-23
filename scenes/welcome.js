'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
var t = require('tcomb-form-native');
import base from '../config';
import Home from './home';

class Welcome extends Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
      }
    })
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
      </View>
    )
  }
}

export default Welcome;
