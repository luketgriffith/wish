'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, ListView, AlertIOS, Image } from 'react-native';
import styles from './styles';
import base from '../config';
import ListItem from './listItem';
import SingleItem from './singleItem';
// import fetch from 'isomorphic-fetch';
import superagent from 'superagent';
import db from '../dbConfig';

class FriendItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      claimed: false
    }

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
    let data = {
      item: this.props.item,
      user: this.props.user
    }

    superagent
      .post(db.url + '/claimGift')
      .send(data)
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          console.log('claiming response...', res.body);
          this.setState({
            claimed: true
          });
        }
      })
  }

  render() {
    let claim;
    if(this.state.claimed || this.props.item.claimed) {
      claim = <View><Text>This gift has already been claimed!</Text></View>
    } else {
      claim = (
        <TouchableOpacity onPress={this.claimPrompt}>
          <Text>Claim This Gift!</Text>
        </TouchableOpacity>
      )
    }
    return(
      <View style={{ flex: 1, padding: 10 }}>
        <Image
          source={{ uri: this.props.item.img_url }}
          style={{ width: 400, height: 400 }}
        />
        <Text>{this.props.item.description}</Text>
        {claim}
      </View>
    )
  }
}

export default FriendItem;
