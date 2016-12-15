'use strict';
import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  AppRegistry,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import base from '../config';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { user: '' };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    base.auth().signOut().catch((err) => {

    }).then(() => {
      Actions.login();
    });
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
      },
      captureDiv: {
        position: 'absolute',
        bottom: 150,
        flex: 1,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent'
      },
      capture: {
        width: 70,
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 7
      }
    });

    return (
      <Container>
         <Header>
             <Title>Logo Go Here</Title>
             <Button onPress={this.logOut}>
               <Text>Log Out</Text>
             </Button>
         </Header>

         <Content>
           <View style={styles.container}>
             <Camera
               captureTarget={Camera.constants.CaptureTarget.disk}
               ref={(cam) => {
                 this.camera = cam;
               }}
               style={styles.preview}
               aspect={Camera.constants.Aspect.fill}>
                <TouchableOpacity style={styles.captureDiv} onPress={this.takePicture.bind(this)}>
                  <View style={styles.capture}></View>
                </TouchableOpacity>
             </Camera>
           </View>
         </Content>
         <Footer>
            <Button onPress={() => Actions.friends()}>Friends</Button>
            <Button onPress={() => Actions.list()}>List</Button>
         </Footer>
       </Container>
    );
  }

  takePicture() {
    this.camera.capture().catch((error) => {
      console.log('errrrrrrrr:', error)
    }).then((data) => {
      console.log('the data we got from camera: ', data);
        Actions.confirm({
          image: data.path,
          user: this.state.user
        });
      }).catch((err) => {
        console.log('SHOOOOOOT ERROR: ', err)
      })
  }
}



export default Home;
