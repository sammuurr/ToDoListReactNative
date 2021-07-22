import React, {useState} from "react"
import { TouchableOpacity, Alert} from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator} from "@react-navigation/stack"
import { List } from 'react-native-paper';
import "reflect-metadata";


import AddNewTodos, {  } from "../Views/AddNewTodosView"
import ToDoList from "../Views/ToDoList"



const Stack = createStackNavigator()


export default function Navigation(){

    const [inputText, setText] = useState("")
    const [idNumber, setIdNumber] = useState(0)


    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ToDoList">
                <Stack.Screen
                    name="NewTodosScreen"
                    component={AddNewTodos}
                    initialParams={
                        {
                             setTextValue: setText,
                             setIdNumber: setIdNumber
                        }
                    }
                    options={{
                        title: "",
                        headerRight: () => (<TouchableOpacity onPress={() => {
                            Alert.alert("Ошибка", "Внимание! Данное функция находится в процессе разработки !")
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
                                Alert.alert("Ошибка", "Внимание! Данное функция находится в процессе разработки !")
                            }}>
                            <List.Icon color="gray" icon="arrange-send-to-back" />
                            </TouchableOpacity>
                          ),
                    }}
                    
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
