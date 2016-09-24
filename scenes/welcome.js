'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import base from '../config';
import Home from './home';
import Friends from './friends';
import List from './list';
import SignUp from './signUp';
import styles from './styles';
var ScrollableTabView = require('react-native-scrollable-tab-view');

class Welcome extends Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
      }
    })
    return (
      <ScrollableTabView>
        <Home tabLabel="Camera" user={this.props.user}/>
        <Friends tabLabel="Friends" user={this.props.user}/>
        <List tabLabel="List" user={this.props.user}/>
      </ScrollableTabView>
    )
  }
}

export default Welcome;
