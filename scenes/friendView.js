'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, ListView, AlertIOS, Image } from 'react-native';
import styles from './styles';
import base from '../config';
import ListItem from './listItem';
import SingleItem from './singleItem';
import fetch from 'isomorphic-fetch';
import superagent from 'superagent';
import db from '../dbConfig';
import FriendItem from './friendItem';


class FriendView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    this.getList = this.getList.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {
    this.getList();
  }

  getList() {
    let data = {
      user: this.props.user.id,
      friend: this.props.friend
    }

    superagent
      .post(db.url + '/getList')
      .send(data)
      .end((err, res) => {
        if(err) {
          console.log('errrrrr:', err)
        } else {
          this.setState({
            items: this.state.items.cloneWithRows(res.body)
          })
        }
      })
  }

  onPress(item) {
    this.props.navigator.push({
      component: FriendItem,
      title: '',
      passProps: {
        friend: this.props.friend,
        item: item,
        user: this.props.user,
        navigator: this.props.navigator
      }
    })
  }

  renderItem(item) {
    return (
      <ListItem item={item} onPress={() => this.onPress(item)} />
    );
  }

  render() {
    let image;
    if(this.props.friend && this.props.friend.img_url) {
      image = <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: this.props.friend.img_url }}
      />
    } else {
      image = null;
    }
    return(
      <View style={{ padding: 10, paddingTop: 25, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {image}
            <View style={{ height: 100, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text>{this.props.friend.firstName} {this.props.friend.lastName}</Text>
            </View>
          </View>
        <ListView
          dataSource={this.state.items}
          renderRow={this.renderItem}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    )
  }
}

export default FriendView;
