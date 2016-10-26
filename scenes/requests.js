'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, ListView, Image, Dimensions } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import FindFriends from './findFriends';
import superagent from 'superagent';
import db from '../dbConfig';
import base from '../config';
import Login from './login';
import FriendView from './friendView';

class Requests extends Component {
  constructor(props) {
    super(props)

    this.renderReq = this.renderReq.bind(this);
    this.confirmFriend = this.confirmFriend.bind(this);
    this.back = this.back.bind(this);
  }

  renderReq(item) {
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

  back() {
    this.props.navigator.pop(0);
  }

  confirmFriend(friend) {
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

  render() {
    let reqs;
    if(this.props.requests.length) {
      reqs = (
        <ListView
          dataSource={this.props.requests}
          renderRow={this.renderReq}
          enableEmptySections={true}
          style={{ }}
        />
      )
    } else {
      reqs = <Text>No Friend Requests Right Now!</Text>
    }
    return (
      <Container>
          <Header>
              <Button onPress={this.back} transparent>
                <Icon name='ios-arrow-back' />
              </Button>

              <Title>Friend Requests</Title>

          </Header>
        <View>
          {reqs}
        </View>
      </Container>
    )
  }


}

export default Requests;
