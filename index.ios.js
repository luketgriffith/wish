
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
      <NavigatorIOS
        navigationBarHidden={true}
        initialRoute={{
          component: Login,
          title: 'Login or Sign Up!',
        }}
        style={{ 'flex': 1 }}
        barTintColor='#ed1c40'
        titleTextColor='white'
        tintColor='white'
      />
      </View>
    );
  }
}

AppRegistry.registerComponent('wishlist', () => wishlist);
