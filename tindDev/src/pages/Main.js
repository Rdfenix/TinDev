import React, { useEffect, useState } from 'react'
import { StyleSheet, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'

import Logo from '../assets/logo.png'
import Dislike from '../assets/dislike.png'
import Like from '../assets/like.png'

import Api from '../services/Api'

const Main = (props) => {
    const { navigation } = props
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await Api.get('/devs', {
                headers: { user: id }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [id])

    handleLike = async (id) => {
        await Api.post(`/devs/${id}/likes`, null, {
            headers: { user: id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    handleDislike = async (id) => {
        await Api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.cardsContainer}>
                {
                    users.length > 0 ?
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                        :
                        <Text style={styles.empty}>Is Empty :(</Text>
                }
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Image source={Dislike} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={Like} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    footer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18
    },
    avatar: {
        flex: 1,
        height: 300,
    },
    logo: {
        marginTop: 30
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default Main