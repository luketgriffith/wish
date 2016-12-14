'use strict';

import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Text, PanResponder, TextInput, ListView, Image } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import Welcome from './welcome';
import superagent from 'superagent';
import db from '../dbConfig';

class FindFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Search by name!',
      friends: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      pending: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      users: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }

    this.onSearch = this.onSearch.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderPending = this.renderPending.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
    this.back = this.back.bind(this);
  }


  back() {
    this.props.navigator.pop(0);
  }

  onSearch() {
    let data = {
      term: this.state.text.toLowerCase(),
      user: this.props.user.id
    };

    superagent
      .post(db.url + '/findFriends')
      .send(data)
      .end((err, res) => {
        if(err) {
          console.log('errrrr', err)
        } else {
          console.log('resssssss', res.body)
          this.setState({
              friends: this.state.friends.cloneWithRows(res.body.friends),
              pending: this.state.pending.cloneWithRows(res.body.pending),
              users: this.state.users.cloneWithRows(res.body.users)
          });
        }
      });
  }

  addFriend(friend) {
    let data = {
      user: this.props.user,
      friend: friend.id
    }

    superagent
      .post(db.url + '/addFriend')
      .send(data)
      .end((err, res) => {
        if(err) {
          console.log('errr')
        } else {
          this.onSearch();
        }
      });
  }

  renderFriends(item) {
    console.log('friend...', item)
    return (
      <View style={{ backgroundColor: '#EEE', height: 60, padding: 5, flexDirection: 'row', alignItems: 'center', margin: 3 }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 10 }}
          source={{ uri: item.img_url }}
        />
         <View style={{ padding: 20, width: 150 }}>
            <Text style={{ color: 'black' }}>{item.firstName} {item.lastName}</Text>
         </View>

         <View style={{ backgroundColor: 'blue', height: 40, flex: .25, flexDirection: 'row', alignItems: 'center',  padding: 5 }}>
            <Icon name='ios-home' />
         </View>
      </View>
    );
  }

  renderPending(item) {
    console.log('pending...', item)
    return (
      <View style={{ backgroundColor: '#EEE', height: 60, padding: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
         <Image
           style={{width: 50, height: 50, borderRadius: 10 }}
           source={{ uri: item.img_url }}
         />
         <View style={{ padding: 20, width: 150 }}>
            <Text style={{ color: 'black' }}>{item.firstName} {item.lastName}</Text>
         </View>

         <View style={{ backgroundColor: 'blue', height: 40, flex: .25, flexDirection: 'row', alignItems: 'center',  padding: 5  }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Pending!</Text>
         </View>
      </View>
    );
  }

  renderItem(item) {
    console.log('item..', item)
    return (
      <View style={{ backgroundColor: '#EEE', height: 60, padding: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 10 }}
          source={{ uri: item.img_url }}
        />
         <View style={{ padding: 20, width: 150 }}>
            <Text style={{ color: 'black' }}>{item.firstName} {item.lastName}</Text>
         </View>

         <View style={{ backgroundColor: 'green', height: 40, flex: .25, flexDirection: 'row', alignItems: 'center', padding: 5 }}>
          <TouchableOpacity onPress={this.addFriend.bind(null, item)}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Add Friend</Text>
          </TouchableOpacity>
         </View>
      </View>
    );
  }



  render() {
    return (
      <Container>
      <Header>
          <Button onPress={this.back} transparent>
            <Icon name='ios-arrow-back' />
          </Button>

          <Title>Find Friends</Title>

      </Header>
      <View style={{ paddingTop: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: .75, borderRadius: 10, margin: 10 }}
            onFocus={() => this.setState({ text: '' })}
            onChangeText={(text) => this.setState({ text: text })}
            value={this.state.text}
            />

          <Button onPress={this.onSearch} style={{ flex: .25, margin: 10 }}>
            Search!
          </Button>
        </View>

        <View style={{ paddingTop: 20, paddingBottom: 10 }}>
          <View>
            <ListView
              dataSource={this.state.friends}
              renderRow={this.renderFriends}
              enableEmptySections={true}
              style={{ }}
            />
          </View>

          <View>
            <ListView
            dataSource={this.state.pending}
            renderRow={this.renderPending}
            enableEmptySections={true}
            style={{ }}
            />
          </View>

          <View>
            <ListView
              dataSource={this.state.users}
              renderRow={this.renderItem}
              enableEmptySections={true}
              style={{ }}
            />
          </View>
        </View>

      </View>
      </Container>
    )
  }
}

export default FindFriends;
