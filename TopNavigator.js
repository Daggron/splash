import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import App from './components/app';
import Search from './components/Search';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  return (
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={App} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;