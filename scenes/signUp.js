'use strict';
var RNUploader = require('NativeModules').RNUploader;
import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import base from '../config';

var User = t.struct({
  email: t.String,              // a required string
  password: t.String,
  userName: t.String
});

class SignUp extends Component {
  render() {
    return(
      <View>
        <Text>Sign Up</Text>
      </View>
    )
  }
}

export default SignUp;
