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

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  componentWillMount() {
    let navigate = (user) => {
      console.log('navigate....', this.props.navigator)
      this.props.navigator.push({
        component: Welcome,
        title: '',
        passProps: {
          navigator: this.props.navigator,
          user: user,
        },
      });
    }
    console.log('wat login thing')
    base.auth().onAuthStateChanged((user) => {
      if(user) {
        console.log('still logged in...', user)
        superagent
          .post(db.url + '/getUser')
          .send({ email: user.email })
          .end((err, res) => {
            if(err) {
              console.log(err)
            } else {
              // console.log('getting user...', res.body)
              let newUser = res.body[0];
              console.log(newUser)
              navigate(newUser);
            }
          });
      } else {
        AlertIOS.alert(
          'Error Logging In',
          'Please check your email and password and try again.',
         [
           {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
         ],
        )
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
          superagent
            .post(db.url + '/getUser')
            .send({ email: data.email })
            .end((err, res) => {
              if(err) {
                console.log(err)
              } else {
                console.log('getting user...', res.body)
                let newUser = res.body[0];
                this.props.navigator.push({
                  component: Welcome,
                  title: '',
                  passProps: {
                    user: newUser
                  },
                });
              }
            });
        }
      })
    }
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
