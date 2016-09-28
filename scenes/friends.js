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
      })
    }
    this.onPress = this.onPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    superagent
      .get(db.url + '/friends/' + this.props.user.uid)
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          console.log(res.body)
          this.setState({
            friends: this.state.friends.cloneWithRows(res.body)
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

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.onPress} style={{ backgroundColor: 'blue' }}>
          <Text>Find Friends!</Text>
        </TouchableHighlight>
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

export default Friends;
