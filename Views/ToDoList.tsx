import { StatusBar } from 'expo-status-bar';
import React, { Component} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Image, TouchableOpacity, Alert} from 'react-native';
import { List, FAB, Portal, Provider } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import { plainToClassFromExist} from 'class-transformer';
import "reflect-metadata";
import {Todos, GroupList, changeData, deleteTodos} from "../Models/ToDoModel"
import { useNavigation } from '@react-navigation/native'



export default function(props: any) {
  const navigation = useNavigation();

  return <ToDoList {...props} navigation={navigation} />;
}

class ToDoList extends Component{

  state = {
    myData: [GroupList]
  }


  componentDidMount = async() => {

    const response = await fetch("http://mobile-dev.oblakogroup.ru/candidate/quseinovsamur/list");
    const data = await response.json();
    const serlizationData =  plainToClassFromExist([GroupList] ,data);
   
    this.setState({
      myData: serlizationData
    })
  }

  render(){

    var editBtn = [
      {
        component: <List.Icon icon="pencil-outline" />,
        backgroundColor: "#FAFAFA",
        onPress: () => {
          Alert.alert("Ошибка", "Внимание! Данное функция находится в процессе разработки !")
        }
      }
    ]
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrol}>
          
          <View style={styles.container}>

            {
              this.state.myData.map((list, pos) => {

                var accordionArray: Todos[] = []

                return <List.Section key={pos} title={list.title} style={styles.section} titleStyle={{
                  textTransform: "uppercase"
                }}>
                  {

                    (list?.todos ?? []).map((todos, poss) =>{

                      if (!todos.checked){
                        return <Swipeout style={styles.swipe} key={poss + 23} right={[
                          {
                            component: <View style={{width: "100%", flex: 1, alignItems:"center", justifyContent:'center'}}><Image source={require('../assets/icons8-remove-24.png')} style={styles.button} /></View>,
                            backgroundColor: "#FAFAFA",
                            onPress: () => {
                              deleteTodos(this.state.myData[pos].id, this.state.myData[pos].todos[poss].id)
                              
                              for (let i = 0; i < 5; i++) {
                                this.componentDidMount()
                              }
                              

                              
                            }
                          }
                        ]} left={editBtn}>
                        <TouchableOpacity key={poss + 100} onPress={ async () => {
                          
                          var flag = await changeData(todos.list_id, todos.id, true)

                            for (let i = 0; i < 5; i++) {
                              this.componentDidMount()
                            }
                        }}>
                          <List.Item
                            title={todos.text}
                            key={poss}
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
                          return <Swipeout autoClose={true} style={styles.swipe} key={poss + 23} right={[
                            {
                              component: <View style={{width: "100%", flex: 1, alignItems:"center", justifyContent:'center'}}><Image source={require('../assets/icons8-remove-24.png')} style={styles.button} /></View>,
                              backgroundColor: "#FAFAFA",
                              onPress: async() => {
                                deleteTodos(this.state.myData[pos].id, this.state.myData[pos].todos[poss].id)
                                
                                for (let i = 0; i < 5; i++) {
                                  this.componentDidMount()
                                }
                              }
                            }
                          ]} left={editBtn}>
                          <TouchableOpacity key={poss + 100} onPress={async () => {
                            var flag = await changeData(todos.list_id, todos.id, false)


                            for (let i = 0; i < 5; i++) {
                              this.componentDidMount()
                            }
                          }}>
                            
                              
                          <List.Item
                            titleStyle={{
                              textDecorationLine: "line-through",
                              color: "gray",
                            }}
                            title={todos.text}
                            key={poss}
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
        </ScrollView>

      <Provider>
        <Portal>
          <FAB
            icon='plus'
            onPress={() => {
              navigation.navigate("NewTodosScreen")
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