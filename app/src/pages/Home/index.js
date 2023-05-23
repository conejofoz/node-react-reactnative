import React, {useState, useEffect} from "react";
import { Text, Image, TextInput, View, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';






export default function Home(){
    const [token, setToken] = useState('')

    const getToken = async ()=>{
        try {
            const valToken = await AsyncStorage.getItem('@token')
            setToken(valToken)
            console.log('Token:', valToken)
          } catch (e) {
            // saving error
            console.log(e)
          }
    }


    useEffect(()=>{
        getToken()
    }, [])



    return (
        <View style={styles.container}>
            <Text>Bem Vindo</Text>
            <Text>Token: {token}</Text>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

