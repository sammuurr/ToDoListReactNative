import React, {useState} from "react"
import { TouchableOpacity, Alert, View, Text} from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator} from "@react-navigation/stack"
import { List } from 'react-native-paper';
import "reflect-metadata";
import GLOBAL from "../Models/GLOBAL";
import { createNewTodos, changeData} from "../Models/ToDoModel"
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';


import AddNewTodos from "../Views/AddNewTodosView"
import ToDoList from "../Views/ToDoList"


const Stack = createStackNavigator()


export default function Navigation(){

    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 450,
          }}
        >
          <Text>Swipe down to close</Text>
        </View>
      );
    
      const sheetRef = React.useRef(null);

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
                                sheetRef.current.snapTo(0)
                            }}>
                            <List.Icon color="gray" icon="arrange-send-to-back" />
                            
                            </TouchableOpacity>
                            
                          ),
                    }}
                    
                />
                
            </Stack.Navigator>
            <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={20}
        renderContent={renderContent}
      />
        </NavigationContainer>
    )
}
