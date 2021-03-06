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
import Requests from './requests';
import { Actions } from 'react-native-router-flux';

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

    this.renderItem = this.renderItem.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goToFriend = this.goToFriend.bind(this);
    this.viewReqs = this.viewReqs.bind(this);
  }

  componentWillMount() {
    this.getFriends();
  }

  viewReqs() {
    this.props.navigator.push({
      component: Requests,
      title: '',
      passProps: {
        user: this.props.user,
        navigator: this.props.navigator,
        requests: this.state.requests
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

  goToFriend(friend) {
    Actions.friendView({
      user: this.props.user,
      friend: friend
    });
  }


  renderItem(item) {
    console.log('founda frind: ', item)
    return (
      <View style={{ backgroundColor: '#EEE', height: 80, padding: 5, flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.goToFriend.bind(null, item)} style={{ height: 80, flexDirection: 'row' }}>
        <Image
           style={{width: 50, height: 50, borderRadius: 5 }}
           source={{uri: item.img_url ? item.img_url : 'http://lorempixel.com/200/200' }}
         />
         <View style={{ padding: 20, width: 150 }}>
            <Text style={{ color: 'black' }}>{item.firstName} {item.lastName}</Text>
         </View>
         </TouchableOpacity>
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
      <Container>
        <Header>
            <Button onPress={() => Actions.findFriends() } transparent>
              Find Friends
            </Button>

            <Title>Friends</Title>

            <Button transparent onPress={() => Actions.requests() }>
                Requests
            </Button>
        </Header>
      <View>
        <View>
          <ListView
            dataSource={this.state.friends}
            renderRow={this.renderItem}
            enableEmptySections={true}
            style={{ }}
          />
        </View>
      </View>
      </Container>
    )
  }
}

export default Friends;
