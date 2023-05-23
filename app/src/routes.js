import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './pages/Login'
import NewUser from './pages/NewUser'
import Home from './pages/Home'

const Stack = createNativeStackNavigator()

function routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
                <Stack.Screen name='NewUser' component={NewUser} options={{headerShown: false}} />
                <Stack.Screen name='Home' component={Home} options={{headerShown: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default routes