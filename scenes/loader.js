'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text, PanResponder, AlertIOS } from 'react-native';
import SimpleGesture from 'react-native-simple-gesture';
var t = require('tcomb-form-native');
import base from '../config';
import Home from './home';
import Welcome from './welcome';
import Friends from './friends';
import List from './list';
import SignUp from './signUp';
import styles from './styles';
import db from '../dbConfig';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import superagent from 'superagent';

class Loader extends Component {
  render() {
    return(
      <View><Text>Loading our amazing app...</Text></View>
    )
  }
}

export default Loader;
