import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Menu from './Menu';
import  {Store}  from './redux/store';
import { Provider } from 'react-redux'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Menu />
      </NavigationContainer>
    </Provider>

  );
}