'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import base from '../config';
import Home from './home';
import Friends from './friends';
import List from './list';
import SignUp from './signUp';
import styles from './styles';
import superagent from 'superagent';
import db from '../dbConfig';
var ScrollableTabView = require('react-native-scrollable-tab-view');

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    }

  }
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }
  componentWillMount() {
    let user = { email: this.state.user.email };
    superagent
      .post(db.url + '/getUser')
      .send(user)
      .end((err, res) => {
        if(err) {
          console.log(err)
        } else {
          console.log('getting user...', res.body)
          let newUser = res.body[0];
          this.setState({
            user: newUser
          });
        }
      })
  }
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
        <Home tabLabel="Camera" user={this.state.user} navigator={this.props.navigator}/>
        <Friends tabLabel="Friends" user={this.state.user} navigator={this.props.navigator}/>
        <List tabLabel="List" user={this.state.user} navigator={this.props.navigator}/>
      </ScrollableTabView>
    )
  }
}

export default Welcome;
