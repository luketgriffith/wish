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
import { RNS3 } from 'react-native-aws3';


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
      console.log(data.path);
      let file = {
          uri: data.path,
          name: "image.jpeg",
          type: "image/jpeg"
        }

      
        RNS3.put(file, options).then(response => {
          console.log('waasdfdsa')
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
          console.log(response.body);
          /**
           * {
           *   postResponse: {
           *     bucket: "your-bucket",
           *     etag : "9f620878e06d28774406017480a59fd4",
           *     key: "uploads/image.png",
           *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
           *   }
           * }
           */
        }).catch((err) => {
          console.log('errrrrr: ', err)
        })

      }).catch((err) => {
        console.log('SHOOOOOOT ERROR: ', err)
      })
  }
}



export default Home;
