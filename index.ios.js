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
    // this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    console.log('HERE WE GO')
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
          navigator: this.refs.nav
        }
      })
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
    this.refs.nav.popToTop(0)
  }

  render() {
    let wat;
    if(this.state.userStatus === "success" && this.state.user) {

      wat = (
        <NavigatorIOS
          ref='nav'
          initialRoute={{
            component: Home,
            passProps: {
              user: this.state.user
              // navigator: this.refs.nav
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
      wat = <Content><Spinner color="red"/></Content>
    }

    return (
      <View style={{ flex: 1 }}>
      {wat}
      <TouchableOpacity onPress={this.logOut} style={{position: 'absolute', right: 5, top: 10, backgroundColor: '#fff', flex: 0 }}>
        <Text>Log Out</Text>
      </TouchableOpacity>

      <Footer>
        <FooterTab>
            <Button onPress={this.goFriends.bind(this)}>
                Friends
            </Button>
        </FooterTab>

        <FooterTab>
          <Button onPress={this.goCamera.bind(this)}>

            Camera

          </Button>
        </FooterTab>

        <FooterTab>
          <Button onPress={this.goList.bind(this)}>

              List

          </Button>
        </FooterTab>
      </Footer>
      </View>
    );
  }
}

AppRegistry.registerComponent('wishlist', () => wishlist);
