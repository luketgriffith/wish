'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, TextInput, ListView } from 'react-native';
import Welcome from './welcome';
import superagent from 'superagent';
import db from '../dbConfig';

class FindFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Search By Name',
      friends: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }

    this.onPress = this.onPress.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
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

    let data = {
      term: this.state.text
    };

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

  renderItem(item) {
    return (
      <View>
        <Text>{item.firstName}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
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
          <ListView
            dataSource={this.state.friends}
            renderRow={this.renderItem}
            enableEmptySections={true}
          />
      </View>
    )
  }
}

export default FindFriends;
