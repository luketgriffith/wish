'use strict';
import React, { Component, PropTypes } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  AppRegistry,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
var t = require('tcomb-form-native');
// import ReadImageData from 'react-native-asset-library-to-base64';
import base from '../config';
import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3';
import s3 from '../db';
import Confirm from './confirm';


class Home extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    base.auth().signOut().catch(function(err) {

    }).then(function() {
      this.props.navigator.push({
        component: Login,
        title: '',
        passProps: {

        }
      })
    });
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
      }
    });

    return (
      <View style={styles.container}>
        <Camera
          captureTarget={Camera.constants.CaptureTarget.disk}
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    // console.log('this.props.user.uid', this.props.user.uid);

    this.camera.capture().catch((error) => {
      console.log('errrrrrrrr:', error)
    }).then((data) => {
      console.log('the data we got from camera: ', data);
      this.props.navigator.push({
        component: Confirm,
        title: '',
        passProps: {
          image: data.path,
          navigator: this.props.navigator,
          user: this.props.user
        }
      })
      }).catch((err) => {
        console.log('SHOOOOOOT ERROR: ', err)
      })
  }
}



export default Home;
