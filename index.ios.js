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
import SingleItem from './scenes/singleItem';
import Confirm from './scenes/confirm';
var CookieManager = require('react-native-cookies');
import {Scene, Router} from 'react-native-router-flux';

class wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      initHome: true,
      initLogin: false,
      error: false
    }
  }
  componentWillMount() {
      base.auth().onAuthStateChanged((user) => {
        if(user) {
          superagent
          .post(db.url + '/getUser')
          .send({ email: user.email })
          .end((err, res) => {
            if(err) {
              this.setState({ error: true })
            } else {
              let newUser = res.body[0];
              this.setState({ user: newUser });
            }
          });
        } else {
          this.setState({
            initLogin: true,
            initHome: false
          });
        }
      });
  }
  render() {


    if(!this.state.user) {
      return (
        <View>
          <Text>WishList</Text>
          <Spinner />
        </View>
      )
    } else {
      return (
        <Router>
          <Scene key="root">
            <Scene key="login" component={Login} title="Login" tabs={true} initial={this.state.initLogin} hideNavBar/>
            <Scene key="signUp" component={SignUp} title="Sign Up!" />
            <Scene key="camera" component={Home} user={this.state.user} initial={this.state.initHome} title="Home" tabs={true} hideNavBar/>
            <Scene key="friends" component={Friends} user={this.state.user} title="Friends" />
            <Scene key="findFriends" component={FindFriends} user={this.state.user} title="Find Friends" />
            <Scene key="requests" component={Requests} user={this.state.user} title="Friend Requests"/>
            <Scene key="friendView" user={this.state.user} component={FriendView} title="" />
            <Scene key="list" component={List} user={this.state.user} title="List" />
            <Scene key="singleItem" component={SingleItem} user={this.state.user}  />
            <Scene key="confirm" component={Confirm} user={this.state.user} title="Confirm" />
          </Scene>
        </Router>
      )
    }
  }
}

AppRegistry.registerComponent('wishlist', () => wishlist);
