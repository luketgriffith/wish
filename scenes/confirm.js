'use strict';
import React, { Component, PropTypes } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  AppRegistry,
  Dimensions,
  TouchableOpacity,
  Image
 } from 'react-native';
var t = require('tcomb-form-native');
// import ReadImageData from 'react-native-asset-library-to-base64';
import base from '../config';
import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3';
import s3 from '../db';
import Welcome from './welcome';

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
  }

  confirm() {

  }

  render() {
    console.log(this.props);
    return(
      <View style={{ padding: 100 }}>
        <Image
          style={{width: 50, height: 50}}
           source={{ uri: this.props.image }}
         />
        <TouchableOpacity onPress={this.confirm}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Confirm;
