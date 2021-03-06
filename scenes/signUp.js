'use strict';
var RNUploader = require('NativeModules').RNUploader;
import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, AlertIOS, Image } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, List, ListItem, InputGroup, Input } from 'native-base';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import styles from './styles';
import base from '../config';
import Home from './home';
import db from '../dbConfig';
import superagent from 'superagent';
var Platform = require('react-native').Platform;
import { RNS3 } from 'react-native-aws3';
import s3 from '../db';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';


var options = {
  title: 'Profile Picture'
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      img_url: null,
      img_loading: false
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
        this.setState({
          img_loading: false
        })
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          img_loading: true
        });
        // You can display the image using either data...
        let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          img_url: source,
          img_loading: false
        });
      }
    });
  }


  onPress() {
    this.setState({
      loading: true
    });

    base.auth().createUserWithEmailAndPassword(this.state.email.toLowerCase(), this.state.password).catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      if(error){
        AlertIOS.alert(error.message);
        this.setState({
          loading: false
        });
      }

    }).then((user) => {
      if(!user) {
        return;
        this.setState({
          loading: false
        });
      } else {

        let file = {
            uri: this.state.image,
            name: this.state.email + "/image.jpeg",
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
              let data = {
                firstName: this.state.firstName.toLowerCase(),
                lastName: this.state.lastName.toLowerCase(),
                email: this.state.email.toLowerCase(),
                img_url: response.body.postResponse.location
              }

              superagent
                .post(db.url + '/users')
                .send(data)
                .end((err, res) => {
                  if(err) {
                    console.log('error.....', err)
                    AlertIOS.alert('Error signing up', 'Make sure your email is valid.')
                    this.setState({
                      loading: false
                    });
                  } else {
                    console.log('sign up res...', res.body)
                    Actions.camera({ user: res.body[0] });
                  }
                });
            })
            .catch(err => {
              AlertIOS.alert('Error. Oh no!');
              console.log('error: ', err)
            })

      }
    })
  }

  render() {
    let image;
    if(this.state.img_loading) {
      image= <Spinner />
    }
    if(this.state.img_url) {
      image = <Image source={this.state.img_url} style={{ height: 200, width: 200 }} />
    } else {
      image = <Text>No Image Selected</Text>
    }

    let view;
    if(this.state.loading) {
      view = <Spinner />
    } else {
      view = (
        <View>
        <List>
          <ListItem>
            <InputGroup borderType='underline' >
              <Icon name='ios-home' style={{color:'#384850'}}/>
              <Input placeholder='email' onChangeText={(t) => this.setState({ email: t })}/>
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup borderType='underline' >
              <Input placeholder='password' type="password" onChangeText={(t) => this.setState({ password: t })}/>
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup borderType='underline' >
              <Input placeholder='First Name' onChangeText={(t) => this.setState({ firstName: t })}/>
            </InputGroup>
          </ListItem>

          <ListItem>
            <InputGroup borderType='underline' >
              <Input placeholder='Last Name' onChangeText={(t) => this.setState({ lastName: t })}/>
            </InputGroup>
          </ListItem>
        </List>

        {image}

        <TouchableHighlight style={styles.button} onPress={this.upload} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Choose/Take Profile Photo!</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up!</Text>
        </TouchableHighlight>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        {view}
      </View>
    )
  }
}

export default SignUp;
