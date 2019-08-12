import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Image, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import Logo from '../assets/logo.png'
import Api from '../services/Api'
import AsyncStorage from '@react-native-community/async-storage'

const Login = (props) => {
    const { navigation } = props

    const [user, setUser] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, [])

    const handleLogin = async () => {
        const response = await Api.post('/devs', { username: user })
        const { _id } = response.data
        await AsyncStorage.setItem('user', _id)
        navigation.navigate('Main', { user: _id })
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >
            <Image source={Logo} />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu usuario no Github"
                placeholderTextColor="#999"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default Login