import React, {useState} from "react"
import { TouchableOpacity, Alert, View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator} from "@react-navigation/stack"
import { List } from 'react-native-paper';
import "reflect-metadata";
import GLOBAL from "../Models/GLOBAL";
import { createNewTodos, changeData, createList, deleteList} from "../services/ToDoList/index"
import BottomSheet from 'reanimated-bottom-sheet';
import GroupList from "../Models/GroupList"


import AddNewTodos from "../Views/AddNewTodosView"
import ToDoList from "../Views/ToDoList"
import AddNewList from "../Views/AddNewList"


const Stack = createStackNavigator()


export default function Navigation(){



    const renderContent = () => (
        < View
          style={{
            backgroundColor: '#F5F5F5',
            padding: 16,
            height: 450,       
          }}>

        {
            GLOBAL.screen2.state.myData.map((list: GroupList, pos: number) => {
                return <TouchableOpacity key={pos + 100} onPress={() => {
                    Alert.alert("Подтвердите удаление","Вы действительно хотите удалить ? Данные нельзя будет восстановить", [
                        {
                            text: "Нет",
                            style: "cancel",
                        },
                        {
                            text: "Да",
                            onPress: () => {
                                deleteList(GLOBAL.screen2.state.myData[pos].id)
                            },
                            style: "cancel",
                        }
                    ])
                }}>
                    <List.Item key={pos} title={list.title} right={
                        props => <List.Icon color="#AB6C94" icon="trash-can-outline" />}>

                    </List.Item>
                </TouchableOpacity>
            })
    
        }
        <TouchableOpacity  onPress={() => {
            GLOBAL.screen2.props.navigation.navigate("AddNewList")
        }}>
            <List.Item  title="Новая категория" titleStyle={{ color:"gray" }} right={
                props => <List.Icon color="gray" icon="plus" />}>

            </List.Item>
        </TouchableOpacity>

        </View>
      );
      const renderFaceContent = () => (
        < View>
        </View>
      );
    
    const sheetRef = React.useRef(null);
    const [isStartEnabled, setStartValue] = useState(false)

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ToDoList">
                <Stack.Screen
                    name="NewTodosScreen"
                    component={AddNewTodos}
                    options={{
                        title: "",
                        headerRight: () => (<TouchableOpacity onPress={() => {
                            if (GLOBAL.screen1.state.text.trim() === "") {

                                if (GLOBAL.screen1.state.isEdit) {
                                    Alert.alert("Ошибка", "Текстовое поле пустое ! ")
                                }else{
                                    Alert.alert("Ошибка", "Измените изначальную заметку ! ")
                                }
                                
                            }else{
                                if (GLOBAL.screen1.state.isEdit) {
                                    createNewTodos(GLOBAL.screen1.state.number, GLOBAL.screen1.state.text)
                                }else{
                                    changeData(GLOBAL.screen1.state.todos.list_id, GLOBAL.screen1.state.todos.id, false, GLOBAL.screen1.state.text)
                                }

                                GLOBAL.screen1.props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: "NewTodosScreen" }],
                                });
                                
                                GLOBAL.screen1.props.navigation.goBack()
                            }
                        }}>
                            <List.Icon color="#146E90" icon="check" />
                        </TouchableOpacity>
                          ),
                        headerBackTitle: " ",
                        headerBackImage: () => (
                            <List.Icon color="gray" icon="arrow-left" />
                            
                          ),
                      }}
                />
                <Stack.Screen
                    name="ToDoList"
                    component={ToDoList}
                    options={{
                        title: "Задачи",
                        headerStyle:{
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                //Alert.alert("Ошибка", "Внимание! Данное функция находится в процессе разработки !")
                                setStartValue(true)
                                sheetRef.current.snapTo(0)
                            }}>
                            <List.Icon color="gray" icon="arrange-send-to-back" />
                            
                            </TouchableOpacity>
                            
                          ),
                    }}
                    
                />
                <Stack.Screen
                    name="AddNewList"
                    component={AddNewList}
                    options={{
                        title: "",
                        headerStyle:{
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => {
                                if (GLOBAL.screen3.state.text.trim() === "") {
                                    Alert.alert("Ошибка", "Текстовое поле пустое ! ") 
                                }else{
                                    createList(GLOBAL.screen3.state.text)
                                    GLOBAL.screen3.props.navigation.reset({
                                        index: 0,
                                        routes: [{ name: "AddNewList" }],
                                    });
                                    
                                    GLOBAL.screen3.props.navigation.goBack()
                                }
                            }}>
                            <List.Icon color="#146E90" icon="check" />
                            
                            </TouchableOpacity>
                            
                          ),
                    }}
                    
                />
                
            </Stack.Navigator>
            
    <BottomSheet
        ref={sheetRef}
        initialSnap={0}
        snapPoints={[isStartEnabled ? "40%" : 0, 0, 0]}
        borderRadius={20}
        renderContent={isStartEnabled ? renderContent : renderFaceContent}
        
        
      />
        </NavigationContainer>
    )
}
