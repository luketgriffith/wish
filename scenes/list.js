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
import Swipeout from 'react-native-swipeout';

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.fetchItems = this.fetchItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.onPress = this.onPress.bind(this);
    this.delete = this.delete.bind(this);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  }

  fetchItems() {
    fetch(db.url + '/myItems/' + this.props.user.id)
        .then((response) => {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then((stories) => {
        console.log('the stuff: ', stories)
          this.setState({
              items: this.state.items.cloneWithRows(stories)
          });
      });
  }

  componentWillMount() {
    this.fetchItems()
  }


  delete(item) {
    console.log('the item...', item)

    superagent
      .del(db.url + '/items/' + item.id)
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          this.fetchItems();
        }
      })
  }

  onPress(item) {
    this.props.navigator.push({
      component: SingleItem,
      title: '',
      passProps: {
        user: this.props.user,
        item: item,
        navigator: this.props.navigator
      }
    })
  }

  submitItem(text) {
    // let data = {
    //   name: text,
    //   user: this.props.user.uid
    // }
    // superagent
    //   .post(db.url + '/items')
    //   .send(data)
    //   .end((err, res) => {
    //     if(err) {
    //       console.log(err);
    //     } else {
    //       this.fetchItems();
    //     }
    //
    //   })
  }

  cancelButton() {

  }

  addItem() {
  AlertIOS.prompt(
    'Add New Item',
    null,
    [
      {
        text: 'Cancel',
        onPress: () => this.cancelButton(), style: 'cancel'
      },
      {
        text: 'Add',
        onPress: (text) => this.submitItem(text)
      },
    ],
    'plain-text'
  );
}

renderItem(item) {
  var swipeoutBtns = [
  {
    text: 'View',
    onPress: this.onPress.bind(null, item)
  },
  {
    text: 'Delete',
    backgroundColor: 'red',
    onPress: this.delete.bind(null, item)
  }
]

// Swipeout component
  return (
    <Swipeout right={swipeoutBtns}>
    <View>
      <ListItem item={item} />
    </View>
    </Swipeout>
  );
}

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.items}
          renderRow={this.renderItem}
          enableEmptySections={true}
          style={styles.listview}/>
        <Text onPress={this.addItem}>Add Item</Text>
      </View>
    )
  }
}

export default List;
