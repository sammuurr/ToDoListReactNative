import React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { createList } from "../services/ToDoList/index"
import NavigationProps from "../Models/NavigationModel"
import { List } from 'react-native-paper';


import "reflect-metadata";



export default class AddNewList extends React.Component<NavigationProps>{
    state = {
        text: ""
    }
    componentDidMount(){
      this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => {
              if (this.state.text.trim() === "") {
                  Alert.alert("Ошибка", "Текстовое поле пустое ! ") 
              }else{
                  createList(this.state.text)

                  for (let i = 0; i < 5; i++) {
                    this.props.route.params.resetData()
                  }
                  this.props.navigation.goBack()
              }
          }}>
          <List.Icon color="#146E90" icon="check" />
          
          </TouchableOpacity>
          
      )
      })
    }

    render(){

    
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