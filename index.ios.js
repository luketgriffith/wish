
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  NavigatorIOS
} from 'react-native';

import Login from './scenes/login'

class wishlist extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Login />
      </View>
    );
  }
}

AppRegistry.registerComponent('wishlist', () => wishlist);
