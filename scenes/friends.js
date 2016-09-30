'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, ListView, Image, Dimensions } from 'react-native';
import FindFriends from './findFriends';
import superagent from 'superagent';
import db from '../dbConfig';
import base from '../config';
import Login from './login';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      requests: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderReq = this.renderReq.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.confirmFriend = this.confirmFriend.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    this.getFriends();
  }

  confirmFriend(friend) {
    
    console.log('tha friend: ', friend)
    let data = {
      user: this.props.user,
      friend: friend
    }

    superagent
      .post(db.url + '/confirmFriend')
      .send(data)
      .end((err, res) => {
        if(err) {
          console.log(err);
        } else {
          console.log(res.body);
          this.getFriends();
        }
      })
  }

  getFriends() {
    console.log('user id:', this.props.user.id)
    superagent
      .get(db.url + '/friends/' + this.props.user.id)
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          console.log('got friends n such: ', res.body)

          this.setState({
            friends: this.state.friends.cloneWithRows(res.body.friends),
            requests: this.state.requests.cloneWithRows(res.body.requests)
          })
        }
      })
  }

  onPress() {
    this.props.navigator.push({
      component: FindFriends,
      title: '',
      passProps: {
        user: this.props.user,
        navigator: this.props.navigator
      }
    })
  }

  renderItem(item) {
    console.log('founda frind: ', item)
    return (
      <View style={{ backgroundColor: '#EEE', height: 80, padding: 5, flexDirection: 'row' }}>
        <Image
           style={{width: 50, height: 50, borderRadius: 5 }}
           source={{uri: item.img_url ? item.img_url : 'http://lorempixel.com/200/200' }}
         />
         <View style={{ padding: 20, width: 150 }}>
            <Text style={{ color: 'black' }}>{item.firstName} {item.lastName}</Text>
         </View>

      </View>
    );
  }

  renderReq(item) {
    console.log('founda request: ', item)
    return (
      <View style={{ backgroundColor: '#EEE', height: 80, padding: 5, flexDirection: 'row' }}>
        <Image
           style={{width: 50, height: 50, borderRadius: 5 }}
           source={{uri: item.img_url ? item.img_url : 'http://lorempixel.com/200/200' }}
         />
         <View style={{ padding: 20, width: 150 }}>
            <Text style={{ color: 'black' }}>{item.firstName} {item.lastName}</Text>
         </View>
         <View>
          <TouchableHighlight style={{ height: 70 }} onPress={this.confirmFriend.bind(null, item)}>
            <Text>Confirm Friend!</Text>
          </TouchableHighlight>
         </View>
      </View>
    );
  }

  logOut() {
    base.auth().signOut().catch((err) => {

    }).then(() => {
      this.props.navigator.push({
        component: Login,
        title: '',
        passProps: {

        }
      })
    })
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.onPress} style={{ backgroundColor: 'blue' }}>
          <Text>Find Friends!</Text>
        </TouchableHighlight>
        <View>
          <Text>Friend Requests</Text>
          <ListView
            dataSource={this.state.requests}
            renderRow={this.renderReq}
            enableEmptySections={true}
            style={{ }}
          />
        </View>
        <View>
          <Text>Friends</Text>
          <ListView
            dataSource={this.state.friends}
            renderRow={this.renderItem}
            enableEmptySections={true}
            style={{ }}
          />
        </View>
      </View>
    )
  }
}

export default Friends;
