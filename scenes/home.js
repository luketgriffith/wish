'use strict';
import React, { Component, PropTypes } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  AppRegistry,
  Dimensions
 } from 'react-native';
var t = require('tcomb-form-native');
// import ReadImageData from 'react-native-asset-library-to-base64';
import base from '../config';
import Camera from 'react-native-camera';
var RNUploader = require('NativeModules').RNUploader;
var ReadImageData = require('NativeModules').ReadImageData;


class Home extends Component {

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
    console.log('this.props.user.uid', this.props.user.uid);

    this.camera.capture().catch((error) => {
      console.log('errrrrrrrr:', error)
    }).then((data) => {
      let ref = base.storage().ref();
      let imgRef = ref.child('images/' + this.props.user.uid)
      var body = new FormData();
      var photo = {
        uri: data.path
      }
      body.append(photo);

      imgRef.put(body).then((data) => {
        console.log('uploaded?')
      })
      }).catch((err) => {
        console.log('SHOOOOOOT ERROR: ', err)
      })
  }
}



export default Home;
