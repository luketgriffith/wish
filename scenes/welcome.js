'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text } from 'react-native';
import base from '../config';
import Home from './home';
import Friends from './friends';
import List from './list';
import SignUp from './signUp';
import styles from './styles';
import superagent from 'superagent';
import db from '../dbConfig';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }


  // componentWillReceiveProps(props) {
  //   console.log('props.user', props)
  //   if(props.user) {
  //     this.setState({
  //       user: props.user
  //     });
  //
  //     let user = { email: props.user.email };
  //     superagent
  //       .post(db.url + '/getUser')
  //       .send(user)
  //       .end((err, res) => {
  //         if(err) {
  //           console.log(err)
  //         } else {
  //           console.log('getting user...', res.body)
  //           let newUser = res.body[0];
  //           this.setState({
  //             user: newUser
  //           });
  //         }
  //       });
  //
  //   }
  // }

  render() {
    const styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
      }
    })
    let content;

    if(this.props.user) {
      content = (
        <View>
        <ScrollableTabView locked={true}>
          <Home tabLabel="Camera" user={this.props.user} navigator={this.props.navigator}/>
          <Friends tabLabel="Friends" user={this.props.user} navigator={this.props.navigator}/>
          <List tabLabel="List" user={this.props.user} navigator={this.props.navigator}/>
        </ScrollableTabView>
        </View>
      )
    } else {
       content = (<View><Text>Loading...</Text></View>)
    }

    return <View>{content}</View>;
  }
}

export default Welcome;
