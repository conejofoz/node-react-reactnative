import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './pages/Login'
import NewUser from './pages/NewUser'

const Stack = createNativeStackNavigator()

function routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='NewUser' component={NewUser} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default routes