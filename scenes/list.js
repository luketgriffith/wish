'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, ListView } from 'react-native';
import styles from './styles';
import base from '../config';
import ListItem from './listItem';

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
  }

  static propTypes = {
    user: PropTypes.object.isRequired
    // navigator: PropTypes.object.isRequired
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log('mr props...', this.props)
    base.listenTo('users/' + this.props.user.uid + '/items', {
      context: this,
      asArray: true,
      then(data) {
        console.log('list data...', data)
        if(data) {
          this.setState({
            items: this.state.items.cloneWithRows(data)
          });
        }
      }
    })
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
        onPress: (text) => this.addWidget(text)
      },
    ],
    'plain-text'
  );
}

renderItem(item) {
  console.log('wssdfadf', item)
  const onPress = () => {
    AlertIOS.alert(
      'Complete',
      null,
      [
        {text: 'Complete', onPress: () => this.complete(item)},
        {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      ]
    );
  };

  return (
    <ListItem item={item} onPress={onPress} />
  );
}

  render() {
    return (
      <View>
        <Text>List go here</Text>
        <ListView
          dataSource={this.state.items}
          renderRow={this.renderItem}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    )
  }
}

export default List;
