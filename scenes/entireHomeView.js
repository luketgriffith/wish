import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  NavigatorIOS,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';

import Camera from './home';
import Login from './login';
import db from '../dbConfig';

class EntireHomeView extends Component {
  render() {
    console.log('rendering home...')
    let route;
    if(this.props.user) {
      route = (
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component: Camera,
            title: ''
          }}
          navigationBarHidden={true}
          style={{ 'flex': 1 }}
          barTintColor='#ed1c40'
          titleTextColor='white'
          tintColor='white'
        />
      )
    } else {
      route = (
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component: Login,
            title: 'Login or Sign Up!'
          }}
          navigationBarHidden={true}
          style={{ 'flex': 1 }}
          barTintColor='#ed1c40'
          titleTextColor='white'
          tintColor='white'
        />
      )
    }

    return (
      <View style={{ flex: 1 }}>

        {route}

      </View>
    )
  }
}

export default EntireHomeView;
