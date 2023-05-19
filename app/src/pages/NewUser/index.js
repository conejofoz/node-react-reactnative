import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'


export default function NewUser(){

    const navigation = useNavigation()

    const Login = ()=>{
        navigation.navigate('Login')
    }
    return (
        <View style={styles.principal}>
            <Text>Novo Usuário</Text>
            <Text onPress={Login}>Voltar</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    principal:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})