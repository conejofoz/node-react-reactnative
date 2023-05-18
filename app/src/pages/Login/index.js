import React from "react";
import { Text, View, StyleSheet } from 'react-native'


export default function Login(){
    return (
        <View style={styles.principal}>
            <Text>Página de Login</Text>
        </View>
    )

    
}



const styles = StyleSheet.create({
    principal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})