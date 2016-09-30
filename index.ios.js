
import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  NavigatorIOS,
  TouchableOpacity
} from 'react-native';
import base from './config';
import Login from './scenes/login'

class wishlist extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  // static propTypes = {
  //   navigator: PropTypes.object.isRequired,
  // }
  //
  logOut() {
    base.auth().signOut().catch((err) => {

    }).then(() => {
      this.refs.nav.push({
        component: Login,
        title: '',
        passProps: {

        }
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
      <TouchableOpacity onPress={this.logOut} style={{position: 'absolute', right: 5, bottom: 5, backgroundColor: '#fff', flex: 0 }}>
        <Text>Log Out</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('wishlist', () => wishlist);
