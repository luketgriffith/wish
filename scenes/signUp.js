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
var Platform = require('react-native').Platform;
// var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-picker';

var Form = t.form.Form;

var User = t.struct({
  email: t.String,              // a required string
  password: t.String,
  firstName: t.String,
  lastName: t.String
});

var options = {
  title: 'Profile Picture'
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: ''
    }
    this.onPress = this.onPress.bind(this);
    this.upload = this.upload.bind(this);
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  upload() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
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
      <TouchableHighlight style={styles.button} onPress={this.upload} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Choose Profile Photo</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Sign Up!</Text>
      </TouchableHighlight>
      </View>
    )
  }
}

export default SignUp;
