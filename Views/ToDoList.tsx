import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Image, TouchableOpacity, Alert, TouchableWithoutFeedback} from 'react-native';
import { List, FAB, Portal, Provider } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import {build} from '../environment'


import "reflect-metadata";
import {deleteTodos, changeData, deleteList} from "../services/ToDoList/index"
import BottomSheet from 'reanimated-bottom-sheet';


import GroupList from "../Models/GroupList"
import Todos from "../Models/Todos"
import NavigationProps from '../Models/NavigationModel';
import {setIsEdits, setElement, setGroupListData} from "../Redux/features/ToDoList"
import { store } from '../Redux/store';


var typeArrayGroupList:GroupList[]  = []

export default class ToDoList extends React.Component<NavigationProps> {


  reloadListAndData = () => {
    fetch(build.apiServerUrl + "/candidate/quseinovsamur/list", {
      method: 'GET',
  })
    .then(response => response.json())
    .then(json => {this.setState({ myData:json }); store.dispatch(setGroupListData(json))})
    .catch(error => console.log('error', error))

    this.setState({
      renderContent: () => (
        < View
          style={{
            backgroundColor: '#F5F5F5',
            padding: 16,
            height: 450,       
          }}>
  
        {
            store.getState().toDoList.groupListData.map((list: GroupList, pos: number) => {
                return <TouchableOpacity key={list.id} onPress={() => {
                  this.sheetRef.current.snapTo(1)
                    Alert.alert("Подтвердите удаление","Вы действительно хотите удалить ? Данные нельзя будет восстановить", [
                        {
                            text: "Нет",
                            style: "cancel",
                        },
                        {
                            text: "Да",
                            onPress: () => {
                                deleteList(store.getState().toDoList.groupListData[pos].id)
                                for (let i = 0; i < 4; i++) {
                                  this.reloadListAndData()
                                }
                            },
                            style: "cancel",
                        }
                    ])
                }}>
                    <List.Item key={list.id + 100}  title={list.title} right={
                        props => <List.Icon color="#AB6C94" icon="trash-can-outline" />}>
  
                    </List.Item>
                </TouchableOpacity>
            })
    
        }
        <TouchableOpacity  onPress={() => {
          this.sheetRef.current.snapTo(1)
            this.props.navigation.navigate("AddNewList" ,{
              resetData: () => {
                this.reloadListAndData()
              }
            })
        }}>
            <List.Item  title="Новая категория" titleStyle={{ color:"gray" }} right={
                props => <List.Icon color="gray" icon="plus" />}>
  
            </List.Item>
        </TouchableOpacity>
  
        </View>)
    })

  } 

  state = {
    myData: typeArrayGroupList,
    element: Todos,
    isEdit: false,
    isStartEnabled: false,
    renderContent: () => (
      < View
        style={{
          backgroundColor: '#F5F5F5',
          padding: 16,
          height: 450,       
        }}>

      {
          store.getState().toDoList.groupListData.map((list: GroupList, pos: number) => {
              return <TouchableOpacity key={list.id} onPress={() => {
                this.sheetRef.current.snapTo(1)
                  Alert.alert("Подтвердите удаление","Вы действительно хотите удалить ? Данные нельзя будет восстановить", [
                      {
                          text: "Нет",
                          style: "cancel",
                      },
                      {
                          text: "Да",
                          onPress: () => {
                              deleteList(store.getState().toDoList.groupListData[pos].id)
                              for (let i = 0; i < 4; i++) {
                                this.reloadListAndData()
                              }
                          },
                          style: "cancel",
                      }
                  ])
              }}>
                  <List.Item key={list.id + 100}  title={list.title} right={
                      props => <List.Icon color="#AB6C94" icon="trash-can-outline" />}>

                  </List.Item>
              </TouchableOpacity>
          })
  
      }
      <TouchableOpacity  onPress={() => {
        this.sheetRef.current.snapTo(1)
          this.props.navigation.navigate("AddNewList" ,{
            resetData: () => {
              this.reloadListAndData()
            }
          })
      }}>
          <List.Item  title="Новая категория" titleStyle={{ color:"gray" }} right={
              props => <List.Icon color="gray" icon="plus" />}>

          </List.Item>
      </TouchableOpacity>

      </View>),
      renderFaceContent: () => (
        <View>
        </View>
      )


  }


  componentDidMount =() => {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {

            this.setState({
              isStartEnabled: true
            })
            this.sheetRef.current.snapTo(0)
        }}>
        <List.Icon color="gray" icon="arrange-send-to-back" />
        
        </TouchableOpacity>
    )
    })

    fetch(build.apiServerUrl + "/candidate/quseinovsamur/list", {
        method: 'GET',
    })
      .then(response => response.json())
      .then(json => {this.setState({ myData:json }); store.dispatch(setGroupListData(json))})
      .catch(error => console.log('error', error))
    
  }


    sheetRef:React.MutableRefObject<null> = React.createRef()

  render(){


    const reloadData = () => {
      fetch(build.apiServerUrl + "/candidate/quseinovsamur/list", {
        method: 'GET'
    })
      .then(response => response.json())
      .then(json => {this.setState({ myData:json }); store.dispatch(setGroupListData(json))})
      .catch(error => console.log('error', error))
    }
    



    return (
      <SafeAreaView style={styles.container}>

        
        {!this.state.isStartEnabled ? <ScrollView style={styles.scrol}
        >
          
          <View style={styles.container}>

            {
              this.state.myData.map((list, pos: number) => {
                var accordionArray: Todos[] = []

                return <List.Section key={list.id + 100} title={list.title} style={styles.section} titleStyle={{
                  textTransform: "uppercase"
                }}>
                  {

                    (list?.todos ?? []).map((todos: Todos, poss: number) =>{

                      if (!todos.checked){
                        return <Swipeout style={styles.swipe} key={todos.id + 200} right={[
                          {
                            component: <View style={{width: "100%", flex: 1, alignItems:"center", justifyContent:'center'}}><Image source={require('../assets/icons8-remove-24.png')} style={styles.button} /></View>,
                            backgroundColor: "#FAFAFA",
                            onPress: () => {
                              deleteTodos(store.getState().toDoList.groupListData[pos].id, store.getState().toDoList.groupListData[pos].todos[poss].id)
                              
                              for (let i = 0; i < 4; i++) {
                                reloadData()
                              }
                              
                            }
                          }
                        ]} left={[{
                          component: <List.Icon icon="pencil-outline" />,
                          backgroundColor: "#FAFAFA",
                          onPress: () => {
                            
                            store.dispatch(setElement(todos))
                            store.dispatch(setIsEdits(false))

                            this.props.navigation.navigate('NewTodosScreen', {
                              resetData: () => {
                                reloadData()
                              }
                            })

                          }
                        }]}>
                        <TouchableOpacity key={todos.id + 300} onPress={ () => {
                          changeData(todos.list_id, todos.id, true)

                          for (let i = 0; i < 4; i++) {
                                reloadData()
                          }
                        }}>
                          <List.Item
                            title={todos.text}
                            key={todos.id + 400}
                            left={props => <List.Icon {...props} icon="checkbox-blank-circle-outline" />}
                          />
                        </TouchableOpacity>
                        </Swipeout>
                      }else{
                        accordionArray[accordionArray.length] = todos
                      }
                    })
                  }
                  
                    <List.Accordion title="Завершенные" id="1" titleStyle={
                      {
                        color: "black"
                      }
                    } style={
                      {
                        backgroundColor: "white",
                      }
                    }>
                      {
                        accordionArray.map((todos, poss) => {
                          return <Swipeout autoClose={true} style={styles.swipe} key={todos.id + 500} right={[
                            {
                              component: <View style={{width: "100%", flex: 1, alignItems:"center", justifyContent:'center'}}><Image source={require('../assets/icons8-remove-24.png')} style={styles.button} /></View>,
                              backgroundColor: "#FAFAFA",
                              onPress: async() => {
                                deleteTodos(store.getState().toDoList.groupListData[pos].id, store.getState().toDoList.groupListData[pos].todos[poss].id)
                                
                                for (let i = 0; i < 4; i++) {
                                reloadData()
                              }
                              }
                            }
                          ]} left={[{
                            component: <List.Icon icon="pencil-outline" />,
                            backgroundColor: "#FAFAFA",
                            onPress: () => {
                              
                              store.dispatch(setElement(todos))
                              store.dispatch(setIsEdits(false))
                              
                              this.props.navigation.navigate('NewTodosScreen', {
                                resetData: () => {
                                  reloadData()
                                }
                              })
  
                            }
                          }]}>
                          <TouchableOpacity key={todos.id + 600} onPress={() => {
                            changeData(todos.list_id, todos.id, false)

                            for (let i = 0; i < 4; i++) {
                                reloadData()
                              }
                          }}>
                            
                              
                          <List.Item
                            titleStyle={{
                              textDecorationLine: "line-through",
                              color: "gray",
                            }}
                            title={todos.text}
                            key={todos.id + 700}
                            left={props => <List.Icon color="#146E90" icon="check" />}
                          />
                        </TouchableOpacity>
                        </Swipeout>
                        })
                      }
                    </List.Accordion>
              </List.Section>
              })
            }

          </View>
        </ScrollView> : 
        <TouchableWithoutFeedback style={{ width:"100%", height:"100%" }} onPress={() => {
          this.sheetRef.current.snapTo(1)
        }}>
          <View style={{ width:"100%", height:"100%" }}></View>
        </TouchableWithoutFeedback>
        }

      <Provider>
        <Portal>
          <FAB
            icon='plus'
            onPress={() => {
              this.setState({
                isEdit: true
              })
              this.props.navigation.navigate('NewTodosScreen', {
                resetData: () => {
                  reloadData()
                }
              })
            }}
            style={{
              position: 'absolute',
              margin: 16,
              right: 10,
              bottom: 25,
              backgroundColor: "#3A76F4"
            }}
          />
        </Portal>
    </Provider>


        <StatusBar hidden={false}/>


        <BottomSheet
            ref={this.sheetRef}
            initialSnap={0}
            snapPoints={[this.state.isStartEnabled ? "40%" : 0, 0, 0]}
            borderRadius={20}
            enabledGestureInteraction={true}
            renderContent={this.state.isStartEnabled ? this.state.renderContent : this.state.renderFaceContent}
            onOpenStart= {() => {
              this.setState({
                isStartEnabled: true
              })
            }}
            onCloseEnd= {() => {
              this.setState({
                isStartEnabled: false
              })
            }}
        >
          <View style={styles.container} ></View>
        </BottomSheet>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: "100%",
    width: "100%",
  },
  scrol:{
    width: "100%",
    height: "100%"
  },
  section: {
    width: '90%'
  },
  swipe: {
    backgroundColor: "white"
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
  }

});