import React, {useState} from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator} from "@react-navigation/stack"
import { List } from 'react-native-paper';
import "reflect-metadata";


import AddNewTodos from "../Views/AddNewTodosView"
import ToDoList from "../Views/ToDoList"
import AddNewList from "../Views/AddNewList"


import {store} from '../Redux/store';
import { Provider } from 'react-redux';



const Stack = createStackNavigator()


export default function Navigation(){


   
    
    const [isStartEnabled, setStartValue] = useState(false)

    return(
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="ToDoList">
                    <Stack.Screen
                        name="NewTodosScreen"
                        component={AddNewTodos}
                        options={{
                            title: "",
                            headerBackTitle: " ",
                            headerBackImage: () => (
                                <List.Icon color="gray" icon="arrow-left" />
                                
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="ToDoList"
                        component={ToDoList}              
                    />
                    <Stack.Screen
                        name="AddNewList"
                        component={AddNewList}
                        options={{
                            title: "",
                            headerStyle:{
                            },
                        }}
                        
                    />
                    
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
