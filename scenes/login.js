'use strict';
import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, AlertIOS } from 'react-native';
var t = require('tcomb-form-native');
import base from '../config';
import styles from './styles';
import db from '../dbConfig';
import superagent from 'superagent';
import { Actions } from 'react-native-router-flux';


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
  // TODO: send user data to reducer made with RN-router-flux 
  async onPress() {
    try {
      var value = this.refs.form.getValue();
      if (value) { // if validation fails, value will be null
        const user = await base.auth().signInWithEmailAndPassword(value.email, value.password);
        if(user) {
          console.log('user from FB: ', user)
          var future = new Date();
          future.setDate(future.getDate() + 30);


          const userData = await superagent
          .post(db.url + '/getUser')
          .send({ email: user.email })
          .end((err, res) => {
            if(err) {
              throw new Error(err);
            }
          });
          if(userData) {
            console.log('user data: ', userData)
            Actions.camera({ user: userData.body[0] });
          }
        }
      }
    } catch(e) {
      console.log(e)
      AlertIOS.alert('Error logging in. Sorry!');
    }
  }


  toggleSignUp() {
    Actions.signUp();
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
        <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Text onPress={this.toggleSignUp}>Or Sign Up!</Text>
      </View>
    );
  }
}

export default Login;
