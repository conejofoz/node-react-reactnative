import React from "react";
import { Text, View, StyleSheet } from 'react-native'


const App = () =>{
    return (
        <View style={styles.principal}>
            <Text>Usuários</Text>
        </View>
    )

    
}

export default App

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})