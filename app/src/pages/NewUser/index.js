import React, { useState } from "react";
import { Text, Image, TextInput, View, StyleSheet, Button, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../../config/api'


export default function Login() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navigation = useNavigation()

    const Login = () => {
        navigation.navigate('Login')
    }

    const hadleCad = async () => {

        if (!validate()) return false

        await api.post('/users', { nome, email, senha })
            .then((response) => {
                Alert.alert("Successo", "Usuário cadastrado!")
                console.log(response.data)
                Login()
            }).catch((err) => {
                Alert.alert("Atenção", err.response.data.message)
                console.log(err.response.data)
            });

        

    }

    const validate = () => {
        if (!nome) {
            Alert.alert("Preencha o campo Nome")
            return false
        }
        if (!email) {
            Alert.alert("Preencha o campo E-mail")
            return false
        }
        if (!senha) {
            Alert.alert("Preencha o campo senha")
            return false
        }
        return true
    }


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/mercado.png')}
                    />
                </View>

                <TextInput
                    style={styles.inputForm}
                    placeholder="Nome completo..."
                    autoCorrect={false}
                    value={nome}
                    onChangeText={(event) => { setNome(event) }}
                />
                <TextInput
                    style={styles.inputForm}
                    placeholder="Usuário..."
                    autoCorrect={false}
                    value={email}
                    onChangeText={(event) => { setEmail(event) }}
                />
                <TextInput
                    style={styles.inputForm}
                    placeholder="Senha..."
                    autoCorrect={false}
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={txt => setSenha(txt)}
                />

                <TouchableOpacity style={styles.btnSubmitForm} onPress={hadleCad}>
                    <Text style={styles.txtSubmitForm}>Cadastrar</Text>
                </TouchableOpacity>

                <Text
                    style={styles.linkNewUser}
                    onPress={Login}
                >Acessar</Text>
            </View>
        </ScrollView>
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
    inputForm: {
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
    linkNewUser: {
        color: '#fff',
        fontSize: 18,
        marginTop: 15
    }
})