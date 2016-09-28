'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, ListView, Image } from 'react-native';
import FindFriends from './findFriends';
import superagent from 'superagent';
import db from '../dbConfig';

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
  }

  componentWillMount() {
    this.getFriends();
  }

  confirmFriend(friend) {
    console.log('tha friend: ', friend)
    let data = {
      id: friend.id
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
    superagent
      .get(db.url + '/friends/' + this.props.user.uid)
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          console.log(res.body)
          let confirmed = [];
          let requests = [];
          res.body.forEach((friend) => {
            if(friend.confirmed === 1) {
              confirmed.push(friend)
            } else {
              requests.push(friend)
            }
          })
          this.setState({
            friends: this.state.friends.cloneWithRows(confirmed),
            requests: this.state.requests.cloneWithRows(requests)
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
           source={{uri: item.img_url }}
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
           source={{uri: item.img_url }}
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
