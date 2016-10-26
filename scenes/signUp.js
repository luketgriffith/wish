'use strict';
var RNUploader = require('NativeModules').RNUploader;
import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, AlertIOS, Image } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import styles from './styles';
import base from '../config';
import Welcome from './welcome';
import db from '../dbConfig';
import superagent from 'superagent';
var Platform = require('react-native').Platform;
import { RNS3 } from 'react-native-aws3';
import s3 from '../db';
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
      img_url: null
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
          img_url: source
        });
      }
    });
  }


  onPress() {
    var value = this.refs.form.getValue();
    base.auth().createUserWithEmailAndPassword(value.email.toLowerCase(), value.password).catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      if(error){
        AlertIOS.alert(error.message);
      }

    }).then((user) => {
      if(!user) {
        return;
      } else {

        let file = {
            uri: this.state.image,
            name: value.email + "/image.jpeg",
            type: "image/jpeg"
          }

          let options = {
            keyPrefix: "images/",
            bucket: "wishlistgriffith",
            region: "us-east-1",
            accessKey: s3.access_key,
            secretKey: s3.secret_key,
            successActionStatus: 201
          }

          RNS3.put(file, options)
            .then(response => {
              console.log('response: ', response)

              let data = {
                firstName: value.firstName.toLowerCase(),
                lastName: value.lastName.toLowerCase(),
                email: value.email.toLowerCase(),
                img_url: response.body.postResponse.location
              }

              superagent
                .post(db.url + '/users')
                .send(data)
                .end((err, res) => {
                  if(err) {
                    console.log('error.....', err)
                    AlertIOS.alert('Error signing up', 'Make sure your email is valid.')
                  } else {
                    console.log('sign up res...', res.body)
                    this.props.navigator.push({
                      component: Welcome,
                      title: '',
                      passProps: {
                        user: res.body,
                        navigator: this.props.navigator
                      }
                    });
                  }
                });
            })
            .catch(err => console.log('error: ', err))

      }
    })
  }

  render() {
    let image;
    if(this.state.img_url) {
      image = <Image source={this.state.img_url} style={{ height: 200, width: 200 }} />
    } else {
      image = <Text>No Image Selected</Text>
    }

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
      {image}
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
