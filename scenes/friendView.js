'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, ListView, AlertIOS } from 'react-native';
import styles from './styles';
import base from '../config';
import ListItem from './listItem';
import SingleItem from './singleItem';
import fetch from 'isomorphic-fetch';
import superagent from 'superagent';
import db from '../dbConfig';

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

  renderItem(item) {
    return (
      <ListItem item={item} onPress={() => this.onPress(item)} />
    );
  }

  render() {
    return(
      <View style={{ padding: 100 }}>
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
