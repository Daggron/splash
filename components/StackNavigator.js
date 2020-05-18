import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Wallpaper from './Wallpaper';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Wallpaper" component={Wallpaper} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;