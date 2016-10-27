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
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
var t = require('tcomb-form-native');
// import ReadImageData from 'react-native-asset-library-to-base64';
import base from '../config';
import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3';
import s3 from '../db';
import Confirm from './confirm';


class Home extends Component {

  render() {
    console.log('rendering home....', this.props)
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
      captureDiv: {
        position: 'absolute',
        bottom: 150,
        flex: 1,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent'
      },
      capture: {
        width: 70,
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 7
      }
    });

    return (
      <Container>
               <Header>
                   <Title>Logo Go Here</Title>
               </Header>

               <Content>
               <View style={styles.container}>
                 <Camera
                   captureTarget={Camera.constants.CaptureTarget.disk}
                   ref={(cam) => {
                     this.camera = cam;
                   }}
                   style={styles.preview}
                   aspect={Camera.constants.Aspect.fill}>
                    <TouchableOpacity style={styles.captureDiv} onPress={this.takePicture.bind(this)}>
                      <View style={styles.capture}></View>
                    </TouchableOpacity>
                 </Camera>
               </View>
               </Content>
           </Container>
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
