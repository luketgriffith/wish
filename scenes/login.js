'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, AlertIOS } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import base from '../config';
import Home from './home';
import Welcome from './welcome';
import Friends from './friends';
import List from './list';
import SignUp from './signUp';
import styles from './styles';
import db from '../dbConfig';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import superagent from 'superagent';


var Form = t.form.Form;

var User = t.struct({
  email: t.String,
  password: t.String
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      signUp: false
    }
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    let navigate = (user) => {
      console.log('nav...', this.props.navigator)
      this.props.navigator.push({
        component: Home,
        title: '',
        passProps: {
          user: user,
          navigator: this.props.navigator
        },
      });
    }

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
        if(data) {
          superagent
            .post(db.url + '/getUser')
            .send({ email: data.email })
            .end((err, res) => {
              if(err) {
                console.log(err)
              } else {
                console.log('getting user from login...', res.body)
                let newUser = res.body[0];
                navigate(newUser)
              }
            });
        }
      })
    }
  }


  toggleSignUp() {
    console.log('NAVVVVVV', this.props.navigator)
    this.props.navigator.push({
      component: SignUp,
      title: '',
      passProps: {
        navigator: this.props.navigator
      }
    });
  }

  render() {
    console.log('login render')
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
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Text onPress={this.toggleSignUp}>Or Sign Up!</Text>
      </View>
    );
  }
}

export default Login;
