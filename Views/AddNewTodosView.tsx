import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import GroupList from "../Models/GroupList"
import Todos from "../Models/Todos"
import { plainToClassFromExist } from 'class-transformer';

import { List } from 'react-native-paper';
import { setText, setParentList, setIsEdit} from '../Redux/features/AddNewTodos';
import {setIsEdits} from '../Redux/features/ToDoList';
import "reflect-metadata";
import { store } from '../Redux/store';
import NavigationProps from "../Models/NavigationModel"
import { createNewTodos, changeData} from "../services/ToDoList/index"
import { build } from '../environment';


const typeArrayGroupList:GroupList[]  = []

export default class AddNewTodos extends Component<NavigationProps>{
    state = {
        myData: typeArrayGroupList,
        number: 0,
        text: "",
        isEdit: true,
        todos: Todos
    }
    
    
      componentDidMount = async() => {
        this.props.navigation.setOptions({

          headerRight: () => (<TouchableOpacity onPress={() => {
            if (store.getState().addNewTodos.value.trim() === "") {

              if (store.getState().addNewTodos.isEdit) {
                  Alert.alert("Ошибка", "Текстовое поле пустое ! ")
              }else{
                  Alert.alert("Ошибка", "Измените изначальную заметку ! ")
              }
              
          }else{
              if (store.getState().addNewTodos.isEdit) {
                  createNewTodos(store.getState().addNewTodos.parentList, store.getState().addNewTodos.value)
              }else{
                  changeData(store.getState().toDoList.element!.list_id, store.getState().toDoList.element!.id, false, store.getState().addNewTodos.value)
              }
              store.dispatch(setIsEdit(true))
              store.dispatch(setIsEdits(true))

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

    
        const response = await fetch(build.apiServerUrl + "/candidate/quseinovsamur/list");
        const data = await response.json();
        const serlizationData =  plainToClassFromExist( typeArrayGroupList ,data);
       
        store.dispatch(setParentList(serlizationData[0].id))
        store.dispatch(setIsEdit(store.getState().toDoList.isEdit))
        

        this.setState({
          myData: serlizationData,
          number: serlizationData[0].id,

        })
      }

    

    render(){

      const changeList = (number: number) => {
        store.dispatch(setParentList(number))

        this.setState({
          number: number
        })
        console.log(store.getState().toDoList.element)

      }
      
    
      

    
        return(
            <SafeAreaView style={styles.container}>


              <View style={styles.section}>
                <TextInput style={styles.input} placeholder="Название задачи" multiline={true} onChangeText={text =>{console.log(store.getState().toDoList.element); store.dispatch(setText(text))}}>
                  {
                    !store.getState().toDoList.isEdit ? store.getState().toDoList.element!.text : ""
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
                          right={props => <List.Icon color={store.getState().addNewTodos.parentList == list.id ? "#3A76F4" : "gray"} icon={store.getState().addNewTodos.parentList == list.id ? "circle-slice-8" : "checkbox-blank-circle-outline"} />}
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