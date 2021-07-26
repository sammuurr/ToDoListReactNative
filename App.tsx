import React, { Component} from 'react';
import { StyleSheet, View} from 'react-native';
import MainStack from './Navigation/NavigationController'




export default class Main extends Component{

  render(){
    return (
        <MainStack/>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: "100%",
    width: "100%",
  },
})
