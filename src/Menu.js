import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { color } from 'react-native-reanimated';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { getHeaderTitle } from '@react-navigation/elements';
import Splash from './Splash';
import Home from './Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToDo from './ToDo';
import Done from './Done';
import Task from './Task';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({

                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'To-Do') {
                            iconName = 'clipboard-list';
                            size = focused ? 25 : 20;
                        } else if (route.name === 'Done') {
                            iconName = 'clipboard-check-outline';
                            size = focused ? 25 : 20;
                        }

                     return   <MaterialCommunityIcons name={iconName} color={color} size={size} />
                    },
                })
            }

        >
            <Tab.Screen 
            style={styles.Todo}
            options={
               {
                title: 'TO DO',
               }
            }
            name={'To-Do'} component={ToDo}
               
            />
            <Tab.Screen name={'Done'} component={Done} />
        </Tab.Navigator>
    );
}


// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const Drawer = createDrawerNavigator();
// const Tab = createMaterialTopTabNavigator();
const RootStack = createNativeStackNavigator();
const Menu = () => {

    return (

        <RootStack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                alignItems:"center"
            }}
            barStyle={{}}
            activeColor="#f0edf6"
            inactiveColor="#3e2465"

        >
            <RootStack.Screen
                name="Splash"
                component={Splash}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="My Task"
                
                component={HomeScreen}
                options={{
                    gestureEnabled: false,
                    headerBackVisible: false,
                    headerTitleAlign: "center"
                }}

            />
            <RootStack.Screen
                name="Task"
                
                component={Task}
                options={{
                    gestureEnabled: false,
                    headerBackVisible: false,
                    headerTitleAlign: "center"
                }}

            />


        </RootStack.Navigator>
    );
}
const styles = StyleSheet.create({
    Todo: {
        
        
    }
})
export default Menu