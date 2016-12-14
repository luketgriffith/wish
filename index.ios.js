'use strict'
import React, { Component, PropTypes } from 'react';
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
 import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';
import base from './config';
import Login from './scenes/login';
import Loader from './scenes/loader';
import Welcome from './scenes/welcome';
import superagent from 'superagent';
import db from './dbConfig';
import Friends from './scenes/friends';
import FindFriends from './scenes/findFriends';
import FriendView from './scenes/friendView';
import Requests from './scenes/requests';
import Home from './scenes/home';
import List from './scenes/list';
import SignUp from './scenes/signUp';
import {Scene, Router} from 'react-native-router-flux';

class wishlist extends Component {
  render() {
      return (
        <Router>
          <Scene key="root">
            <Scene key="login" component={Login} title="Login" tabs={true} hideNavBar/>
            <Scene key="camera" component={Home} initial={true} title="Home" tabs={true} hideNavBar/>
            <Scene key="friends" component={Friends} title="Friends" />
            <Scene key="findFriends" component={FindFriends} title="Find Friends" />
            <Scene key="requests" component={Requests} title="Friend Requests"/>
            <Scene key="friendView" component={FriendView} title="" />
            <Scene key="list" component={List} title="List" />
            <Scene key="signUp" component={SignUp} title="Sign Up!" />
          </Scene>
        </Router>
      )
    }
}

AppRegistry.registerComponent('wishlist', () => wishlist);
