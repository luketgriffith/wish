
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
        <StatusBar
          backgroundColor="white"
          barStyle="light-content"
        />

        <NavigatorIOS
          initialRoute={{
            component: Login,
            title: 'Login',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('wishlist', () => wishlist);
