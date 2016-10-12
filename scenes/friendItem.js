'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, ListView, AlertIOS, Image } from 'react-native';
import styles from './styles';
import base from '../config';
import ListItem from './listItem';
import SingleItem from './singleItem';
import fetch from 'isomorphic-fetch';
import superagent from 'superagent';
import db from '../dbConfig';

class FriendItem extends Component {
  constructor(props) {
    super(props);

    this.claim = this.claim.bind(this);
    this.claimPrompt = this.claimPrompt.bind(this);
  }

  claimPrompt() {
    AlertIOS.alert(
      'Claim this gift?',
      'This will make it unavailable for other friends to buy for this person.',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Claim!', onPress: this.claim }
     ],
    )
  }

  claim() {
    console.log('claiming gift....')
  }

  render() {
    return(
      <View style={{ flex: 1, padding: 10 }}>
        <Image
          source={{ uri: this.props.item.img_url }}
          style={{ width: 400, height: 400 }}
        />
        <Text>{this.props.item.description}</Text>
        <TouchableOpacity onPress={this.claimPrompt}>
          <Text>Claim This Gift!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FriendItem;
