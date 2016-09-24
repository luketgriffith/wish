'use strict';
var RNUploader = require('NativeModules').RNUploader;
import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import styles from './styles';
import base from '../config';

var Form = t.form.Form;

var User = t.struct({
  email: t.String,              // a required string
  password: t.String,
  userName: t.String
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);

  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  onPress() {
    console.log('wat')
  }

  render() {

    let options = {
          fields: {
            password: {
              secureTextEntry: true
            }
      }
    }

    return(
      <View style={styles.container}>
      <Form
        ref="form"
        type={User}
        options={options}
      />
      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Sign Up!</Text>
      </TouchableHighlight>
      </View>
    )
  }
}

export default SignUp;
