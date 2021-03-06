import React, { useEffect, useState, Fragment } from 'react'
import { StyleSheet, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import SocketClient from 'socket.io-client';

import Logo from '../assets/logo.png'
import ItsAMatch from '../assets/itsamatch.png'
import Dislike from '../assets/dislike.png'
import Like from '../assets/like.png'

import Api from '../services/Api'

const Main = (props) => {
    const { navigation } = props
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([])
    const [matchDev, setMatchDev] = useState(null)

    useEffect(() => {
        async function loadUsers() {
            const response = await Api.get('/devs', {
                headers: { user: id }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [id])

    useEffect(() => {
        const socket = SocketClient('http://192.168.0.15:3333', {
            query: { user: id }
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })

    }, [id])

    handleLike = async () => {
        const [user, ...restUser] = users
        await Api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id }
        })

        setUsers(restUser)
    }

    handleDislike = async () => {
        const [user, ...restUser] = users
        await Api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id }
        })

        setUsers(restUser)
    }

    handleLogout = async () => {
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={Logo} style={styles.logo} />
            </TouchableOpacity>

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
                {
                    users.length > 0 &&
                    <Fragment>
                        <TouchableOpacity style={styles.button} onPress={handleDislike}>
                            <Image source={Dislike} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLike}>
                            <Image source={Like} />
                        </TouchableOpacity>
                    </Fragment>
                }

            </View>

            {
                matchDev && (
                    <View style={styles.matchContainer}>
                        <Image style={styles.matchImage} source={ItsAMatch} />
                        <Image source={matchDev.avatar} style={styles.matchAvatar} />
                        <Text style={styles.matchName}>{matchDev.name}</Text>
                        <Text style={styles.matcBio}>{matchDev.bio}</Text>
                        <TouchableOpacity onPress={() => setMatchDev(null)}>
                            <Text style={styles.closeMatch}>FHECHAR</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

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
    },
    matchContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#FFF',
        marginVertical: 5
    },
    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF'
    },
    matchImage: {
        height: 60,
        resizeMode: 'contain'
    },
    matcBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },
    closeMatch: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold'
    }
})

export default Main