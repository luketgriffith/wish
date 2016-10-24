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
      item: this.props.item
    }

    this.claim = this.claim.bind(this);
    this.claimPrompt = this.claimPrompt.bind(this);
    this.releasePrompt = this.releasePrompt.bind(this);
    this.back = this.back.bind(this);
  }

  claimPrompt() {
    AlertIOS.alert(
      'Claim this gift?',
      'This will make it unavailable for other friends to buy for this person.',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Claim!', onPress: this.claim.bind(null, true) }
     ],
    )
  }

  releasePrompt() {
    AlertIOS.alert(
      'Release this gift?',
      'This will make it available for other friends to buy for this person.',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Release', onPress: this.claim.bind(null, false) }
     ],
    )
  }

  back() {
    this.props.navigator.pop(0);
  }

  componentWillMount() {
    if(this.props.item) {
      superagent
        .get(db.url + '/singleItem/' + this.props.item.id)
        .end((err, res) => {
          if(err) {
            console.log(err)
          } else {
            console.log('gotta item: ', res.body)
            this.setState({
              item: res.body
            })
          }
        })
    }
  }

  claim(bool) {
    let data = {
      claim: bool,
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
            item: res.body
          });
        }
      })
  }

  render() {
    let claim;
    let release;
    console.log('the state...', this.state)
    if(this.state.item.claimed && this.state.item.claimed_by === this.props.user.id) {
      release = (
        <View>
          <TouchableOpacity onPress={this.releasePrompt}>
            <Text>Release Gift</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      release = null;
    }
    if(this.state.item && this.state.item.claimed) {
      claim = (
              <View>
                <Text>This gift has already been claimed!</Text>
                {release}
              </View>
            )
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
          source={{ uri: this.state.item.img_url }}
          style={{ width: 400, height: 400 }}
        />
        <Text>{this.state.item.description}</Text>
        {claim}
        <TouchableOpacity onPress={this.back}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FriendItem;
