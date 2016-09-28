'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, TextInput, ListView, Image } from 'react-native';
import Welcome from './welcome';
import superagent from 'superagent';
import db from '../dbConfig';

class FindFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      friends: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }

    this.onPress = this.onPress.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  onPress() {
    this.props.navigator.push({
      component: Welcome,
      title: '',
      passProps: {
        user: this.props.user,
        navigator: this.props.navigator
      }
    })
  }

  onSearch() {
    console.log('props:', this.props.user)
    let data = {
      term: this.state.text,
      user: this.props.user.id
    };

    console.log('the data...', data);

    superagent
      .post(db.url + '/findFriends')
      .send(data)
      .end((err, res) => {
        if(err) {
          console.log('errrrr', err)
        } else {
          console.log('found friends', res.body)
          this.setState({
              friends: this.state.friends.cloneWithRows(res.body)
          });
        }
      })
  }

  addFriend(friend) {
    console.log('the friend...', friend);
    let data = {
      user: this.props.user.uid,
      friend: friend
    }
    superagent
      .post(db.url + '/addFriend')
      .send(data)
      .end((err, res) => {
        if(err) {
          console.log('errr')
        } else {
          console.log(res.body)
        }
      })
  }

  renderItem(item) {
    return (
      <View style={{ backgroundColor: '#EEE', height: 80, padding: 5, flexDirection: 'row' }}>
        <Image
           style={{width: 50, height: 50, borderRadius: 5 }}
           source={{uri: item.img_url }}
         />
         <View style={{ padding: 20, width: 150 }}>
            <Text style={{ color: 'black' }}>{item.firstName} {item.lastName}</Text>
         </View>

         <View style={{ backgroundColor: 'black', height: 40 }}>
          <TouchableOpacity onPress={this.addFriend.bind(null, item)}>
            <Text style={{ color: 'white' }}>Add Friend</Text>
          </TouchableOpacity>
         </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ paddingTop: 50 }}>
        <Text>Find Friends</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
          />

        <TouchableOpacity onPress={this.onSearch}>
          <Text>Search!</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.onPress}>
          <Text>Back</Text>
        </TouchableOpacity>
        <View>
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

export default FindFriends;
