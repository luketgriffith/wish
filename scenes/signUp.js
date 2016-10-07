'use strict';
var RNUploader = require('NativeModules').RNUploader;
import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, AlertIOS } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import styles from './styles';
import base from '../config';
import Welcome from './welcome';
import db from '../dbConfig';
import superagent from 'superagent';

var Form = t.form.Form;

var User = t.struct({
  email: t.String,              // a required string
  password: t.String,
  firstName: t.String,
  lastName: t.String
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
    let navigate = (user) => {
      this.props.navigator.push({
        component: Welcome,
        title: '',
        passProps: {
          user: user
        }
      });
    }

    var value = this.refs.form.getValue();
    base.auth().createUserWithEmailAndPassword(value.email, value.password).catch(function(error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      if(error){
        AlertIOS.alert(error.message);
      }
    }).then(function(user) {
      if(!user) {
        return;
      } else {

        let data = {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email
        }

        superagent
          .post(db.url + '/users')
          .send(data)
          .end((err, res) => {
            if(err) {
              console.log('error.....', err)
              AlertIOS.alert('Error signing up', 'Make sure your email is valid.')
            } else {
              navigate(res.body)
            }
          });
      }
    })
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
