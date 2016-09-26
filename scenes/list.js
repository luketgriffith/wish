'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, ListView, AlertIOS } from 'react-native';
import styles from './styles';
import base from '../config';
import ListItem from './listItem';
import SingleItem from './singleItem';
import fetch from 'isomorphic-fetch';

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    this.addItem = this.addItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired
  }

  componentWillMount() {
    fetch('http://localhost:3333/items')
        .then((response) => {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then((stories) => {
          this.setState({
              items: this.state.items.cloneWithRows(stories)
          });
      });
  }

  componentDidMount() {
    // base.listenTo('users/' + this.props.user.uid + '/items', {
    //   context: this,
    //   asArray: true,
    //   then(data) {
    //     console.log('list data...', data)
    //     if(data) {
    //       this.setState({
    //         items: this.state.items.cloneWithRows(data)
    //       });
    //     }
    //   }
    // })
  }

  onPress(item) {
    console.log('touched it: ', item)
    this.props.navigator.push({
      component: SingleItem,
      title: '',
      passProps: {
        user: this.props.user,
        item: item
      }
    })
  }

  submitItem(text) {
    console.log('the text: ', text)
    // base.push('users/' + this.props.user.uid + '/items', {
    //   data: { name: text },
    //   then(err) {
    //     if(!err) {
    //
    //     }
    //   }
    // })
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
  // const onPress = () => {
  //   AlertIOS.alert(
  //     'Complete',
  //     null,
  //     [
  //       {text: 'Complete', onPress: () => this.complete(item)},
  //       {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
  //     ]
  //   );
  // };

  return (
    <ListItem item={item} onPress={() => this.onPress(item)} />
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
