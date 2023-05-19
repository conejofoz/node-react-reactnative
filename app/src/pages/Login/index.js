import React from "react";
import { Text, View, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'


export default function Login(){
    const navigation = useNavigation()
    
    const NewUser = () =>{
        navigation.navigate('NewUser')
    }
    return (
        <View style={styles.principal}>
            <Text>Página de Login</Text>
            <Button title="Cadastrar" onPress={NewUser}/>
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