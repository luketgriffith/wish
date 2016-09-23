
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
      auth: false
    }

    this.onPress = this.onPress.bind(this);
  }



  componentWillMount() {

    base.auth().onAuthStateChanged(function(user) {

      if (user) {
        console.log('wheeee user')
        // User is signed in.
        this.setState({
          auth: true
        })

      } else {
        // No user is signed in.
      }
    });

  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
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
            component: Home,
            title: '',
            passProps: {
              user: data
            },
          });
        }
      })
    }
  }

  render() {
    let login;

    var styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
      },
      title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }
    });

    let options = {
          fields: {
            password: {
              secureTextEntry: true
            }
      }
    }

    if(this.state.auth) {
      login = (
          <View style={styles.container}>
            <Form
              ref="form"
              type={User}
              options={options}
            />
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
          </View>
        )
    } else {
      login = (
        <ScrollableTabView>
          <Welcome tabLabel="Welcome" />
          <Home tabLabel="Camera" />
          <Friends tabLabel="Friends" />
          <List tabLabel="List" />
        </ScrollableTabView>
      )
    }

    return (

        login

    );
  }
}

export default Login;
