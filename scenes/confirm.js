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
  Image,
  TextInput
 } from 'react-native';
var t = require('tcomb-form-native');
// import ReadImageData from 'react-native-asset-library-to-base64';
import base from '../config';
import Camera from 'react-native-camera';
import { RNS3 } from 'react-native-aws3';
import s3 from '../db';
import Welcome from './welcome';
import Home from './home';
import superagent from 'superagent';
import db from '../dbConfig';
import { Actions } from 'react-native-router-flux';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    Actions.pop();
  }

  confirm() {
    let file = {
        uri: this.props.image,
        name: this.props.user.email + '/' + Date.now().toString() + "/image.jpeg",
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
            description: this.state.text,
            user: this.props.user.id,
            img_url: response.body.postResponse.location
          }
          superagent
            .post(db.url + '/items')
            .send(data)
            .end((err, res) => {
              if(err) {
                console.log(err);
              } else {
                Actions.list({ user: this.props.user });
              }
            })
        })
        .catch(err => console.log('error: ', err))
  }

  render() {
    console.log(this.props);
    return(
      <View style={{ padding: 10, paddingTop: 20, flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, padding: 0, paddingBottom: 40 }}>
          <Image
            style={{ flex: 1, height: 200 }}
            source={{ uri: this.props.image }}
           />
           <TextInput
             style={{height: 40, backgroundColor: 'black', color: 'white', borderColor: 'gray', borderWidth: 1, position: 'absolute', top: 30, width: 315, flex: 1, left: 20 }}
             onChangeText={(text) => this.setState({text: text})}
             value={this.state.text}
           />
           <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40 }}>
             <TouchableOpacity onPress={this.cancel} style={{ flex: .5 }}>
               <Text style={{ textAlign: 'left' }}>Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={this.confirm} style={{ flex: .5 }}>
              <Text style={{ textAlign: 'right' }}>Confirm</Text>
             </TouchableOpacity>
           </View>
         </View>

      </View>
    )
  }
}

export default Confirm;
