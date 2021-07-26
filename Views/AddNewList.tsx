import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput} from 'react-native';
import GLOBAL from '../Models/GLOBAL';
import "reflect-metadata";



export default class AddNewList extends Component{
    state = {
        text: ""
    }

    render(){

      GLOBAL.screen3 = this

    
        return(
            <SafeAreaView style={styles.container}>


              <View style={styles.section}>
                <TextInput style={styles.input} placeholder="Название раздела" multiline={true} onChangeText={myText =>{ this.setState({ text:myText })}}>

                </TextInput>
              </View>

            </SafeAreaView>
        )
    }
}
    

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: "100%",
    width: "100%",
  },
  section: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  input:{
    width: "92%",
    height: "50%",
    fontSize: 24,
    backgroundColor: "white",
  }

});