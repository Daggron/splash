import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Wallpaper from './Wallpaper';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Wallpaper" component={Wallpaper}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator;