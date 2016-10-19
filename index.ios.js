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
import base from './config';
import Login from './scenes/login';
import Loader from './scenes/loader';
import Welcome from './scenes/welcome';
import superagent from 'superagent';
import db from './dbConfig';
import Friends from './scenes/friends';
import Home from './scenes/home';
import List from './scenes/list';

class wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userStatus: 'onLoad',
      user: ''
    }

    this.logOut = this.logOut.bind(this);
    this.goHome = this.goHome.bind(this);
  }


  componentWillMount() {
    console.log('here we go')
    base.auth().onAuthStateChanged((user) => {
      if(user) {
        console.log('still logged in...', user)

        this.setState({
          userStatus: 'pending'
        });

        superagent
          .post(db.url + '/getUser')
          .send({ email: user.email })
          .end((err, res) => {
            if(err) {
              console.log(err)
            } else {
              let newUser = res.body[0];
              console.log(newUser)
              this.setState({
                userStatus: 'success',
                user: newUser
              })

            }
          });
      } else {
        this.setState({
          userStatus: 'fail'
        });
      }
    });

  }

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

  goHome() {
    this.refs.nav.push({
      component: Login,
      title: '',
      passProps: {

      }
    })
  }

  goFriends() {
    this.refs.nav.push({
      component: Friends,
      title: '',
      passProps: {
        user: this.state.user,
        navigator: this.refs.nav
      }
    })
  }

  goList() {
    this.refs.nav.push({
      component: List,
      title: '',
      passProps: {
        user: this.state.user,
        navigator: this.refs.nav
      }
    })
  }

  goCamera() {
    this.refs.nav.push({
      component: Home,
      title: '',
      passProps: {
        user: this.state.user,
        navigator: this.refs.nav
      }
    })
  }

  render() {
    console.log(this.state)
    let wat;
    if(this.state.userStatus === "success" && this.state.user) {
      console.log('meow')
      wat = (
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component: Home,
            passProps: {
              user: this.state.user,
              navigator: this.refs.nav
            },
            title: 'Turnt'
          }}
          navigationBarHidden={true}
          style={{ 'flex': 1 }}
          barTintColor='#ed1c40'
          titleTextColor='white'
          tintColor='white'
        />
      )
    } else if(this.state.userStatus === 'fail') {
      wat = (
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
    } else {
      wat = <Loader />
    }

    return (
      <View style={{ flex: 1 }}>
      {wat}
      <TouchableOpacity onPress={this.logOut} style={{position: 'absolute', right: 5, top: 5, backgroundColor: '#fff', flex: 0 }}>
        <Text>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.goFriends.bind(this)} style={{position: 'absolute', left: 5, bottom: 5, backgroundColor: '#fff', flex: 0 }}>
        <Text>Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.goCamera.bind(this)} style={{position: 'absolute', left: 200, bottom: 5, backgroundColor: '#fff', flex: 0 }}>
        <Text>Camera</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={this.goList.bind(this)} style={{position: 'absolute', right: 5, bottom: 5, backgroundColor: '#fff', flex: 0 }}>
        <Text>List</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('wishlist', () => wishlist);
