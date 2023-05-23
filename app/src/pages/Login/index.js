import React, {useState} from "react";
import { Text, Image, TextInput, View, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../config/api'


export default function Login(){

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigation = useNavigation()
    
    const NewUser = () =>{
        navigation.navigate('NewUser')
    }

    const hadleLogin = async()=>{

        if(!validate()) return false

        await api.post('/login', { email, senha})
        .then((response)=>{
            Alert.alert("Successo", response.data.user.nome)
            console.log(response.data)
            try {
                AsyncStorage.setItem('@token', response.data.token)
              } catch (e) {
                // saving error
                console.log("Erro não salvou o token: " + e)
              }
              navigation.navigate('Home')
        }).catch((err)=>{
            Alert.alert("Atenção", err.response.data.message)
            console.log(err.response.data)
        });

        /* 
        const req = await fetch('http://192.168.1.195:8080/login',{
            method: 'POST',
            body: JSON.stringify({email, senha}),
            headers: {'Content-Type': 'application/json'}
        }).catch((error) => {console.log(error)})
        console.log(req)
        const result = await req.json()
        console.log(result)
        if(result.error){
            alert(result.message)
        } else {
            alert("Usuário: " + result.user.email)
        } */

    }

    const validate = ()=>{
        if(!email){
            Alert.alert("Preencha o campo E-mail")
            return false
        }
        if(!senha){
            Alert.alert("Preencha o campo senha")
            return false
        }
        return true
    }


    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/mercado.png')}
                />
            </View>

            <TextInput
                style={styles.inputForm}
                placeholder="Usuário..."
                autoCorrect={false}
                value={email}
                onChangeText={ (event) =>{ setEmail(event)} }
             />
            <TextInput
                style={styles.inputForm}
                placeholder="Senha..."
                autoCorrect={false}
                value={senha}
                secureTextEntry={true}
                onChangeText={txt => setSenha(txt)}
             />

             <TouchableOpacity style={styles.btnSubmitForm} onPress={hadleLogin}>
                <Text style={styles.txtSubmitForm}>Acessar</Text>
             </TouchableOpacity>

            <Text 
            style={styles.linkNewUser} 
            onPress={NewUser}
            >Cadastrar</Text>
        </View>
    )

    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#161616'
    },
    logo: {
        paddingBottom: 20,
        marginBottom: 20,
        height: 120,
        width: 120
    },
    inputForm:{
        backgroundColor: '#fff',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 18,
        borderRadius: 7,
        padding: 10,
    },
    btnSubmitForm: {
        backgroundColor: '#ebb105',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    txtSubmitForm: {
        color: '#fff',
        fontSize: 22
    }, 
    linkNewUser:{
        color: '#fff',
        fontSize: 18,
        marginTop:15
    }
})