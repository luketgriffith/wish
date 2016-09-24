
'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import base from '../config';
import Home from './home';
import Welcome from './welcome';
import Friends from './friends';
import List from './list';
import SignUp from './signUp';
import styles from './styles';
var ScrollableTabView = require('react-native-scrollable-tab-view');



var Form = t.form.Form;

// here we are: define your domain model
var User = t.struct({
  email: t.String,              // a required string
  password: t.String
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      signUp: false
    }
    this.toggleSignUp = this.toggleSignUp.bind(this)
    this.onPress = this.onPress.bind(this);
  }



  componentWillMount() {
    base.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('wheeee user')
        // User is signed in.
        this.props.navigator.push({
          component: Welcome,
          title: '',
          passProps: {
            user: user
          },
        });

      } else {
        // No user is signed in.
      }
    });

  }


  onPress() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      base.auth().signInWithEmailAndPassword(value.email, value.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorMessage){
          console.log(errorMessage)
        }
      }).then((data) => {
        console.log('the data...', data)
        //set a cookie or something
        if(data) {
          this.props.navigator.push({
            component: Welcome,
            title: '',
            passProps: {
              user: data
            },
          });
        }
      })
    }
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  toggleSignUp() {
    this.props.navigator.push({
      component: SignUp,
      title: '',
      passProps: {

      }
    });
  }

  render() {

    let options = {
          fields: {
            password: {
              secureTextEntry: true
            }
      }
    }

    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Text onPress={this.toggleSignUp}>Or Sign Up!</Text>
      </View>
    );
  }
}

export default Login;
