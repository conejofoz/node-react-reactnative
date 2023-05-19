import React from "react";
import { Text, Image, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'


export default function Login(){
    const navigation = useNavigation()
    
    const NewUser = () =>{
        navigation.navigate('NewUser')
    }

    const acessar = ()=>{
        alert('Login')
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require('../../../assets/logotipo.png')}
                />
            </View>

            <TextInput
                style={styles.inputForm}
                placeholder="Usuário..."
                autoCorrect={false}
                onChange={()=>{}}
             />
            <TextInput
                style={styles.inputForm}
                placeholder="Senha..."
                autoCorrect={false}
                onChange={()=>{}}
             />

             <TouchableOpacity style={styles.btnSubmitForm} onPress={acessar}>
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
        paddingBottom: 20
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