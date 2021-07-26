import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, TextInput} from 'react-native';
import GroupList from "../Models/GroupList"
import Todos from "../Models/Todos"
import { plainToClassFromExist } from 'class-transformer';
import { useNavigation } from '@react-navigation/native'
import { List } from 'react-native-paper';
import GLOBAL from '../Models/GLOBAL';
import "reflect-metadata";



export default class AddNewTodos extends Component{
    state = {
        myData: [GroupList],
        number: 0,
        text: "",
        isEdit: true,
        todos: Todos
    }
    
    
      componentDidMount = async() => {
    
        const response = await fetch("http://mobile-dev.oblakogroup.ru/candidate/quseinovsamur/list");
        const data = await response.json();
        const serlizationData =  plainToClassFromExist([GroupList] ,data);
       
        this.setState({
          myData: serlizationData,
          number: serlizationData[0].id,
          isEdit: GLOBAL.screen2.state.isEdit,
          todos: GLOBAL.screen2.state.element
        })
      }


    render(){

      GLOBAL.screen1 = this


      const changeList = (number: number) => {
        this.setState({
          number: number
        })
      }
    
      

    
        return(
            <SafeAreaView style={styles.container}>


              <View style={styles.section}>
                <TextInput style={styles.input} placeholder="Название задачи" multiline={true} onChangeText={myText =>{ this.setState({ text:myText })}}>
                  {
                    !GLOBAL.screen2.state.isEdit ? GLOBAL.screen2.state.element.text : ""
                  }
                </TextInput>
              </View>

              <ScrollView style={styles.scrol}>
                <View style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%"
                }}>
                  {
                    
                    this.state.myData.map((list, pos) => {
                    return (
                      <TouchableOpacity key={pos + 100} onPress={() => changeList(list.id)}>
                        <List.Item
                          title={list.title}
                          key={pos}
                          right={props => <List.Icon color={this.state.number == list.id ? "#3A76F4" : "gray"} icon={this.state.number == list.id ? "circle-slice-8" : "checkbox-blank-circle-outline"} />}
                        />
                      </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </ScrollView>
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
  scrol:{
    height: "80%",
    width: "100%",
    backgroundColor: "white"
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