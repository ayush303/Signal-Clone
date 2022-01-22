import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import {DataStore, Auth} from 'aws-amplify';
import { ChatRoomUser, User } from '../../src/models';

export default function ChatRoomItem({ chatRoom }) {
    //const [users, setUsers] = useState<User[]>([]); // all the users in this chatroomID
    const [user, setUser] = useState<User|null>(null); // to display user
    console.log(chatRoom);
    const navigation = useNavigation();
    //console.log("Current ChatRoom: \n",chatRoom);
    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = (await DataStore.query(ChatRoomUser))
                .filter((chatRoomUser) => chatRoomUser.chatRoom.id == chatRoom.id)
                .map(chatRoomUser => chatRoomUser.user);
            //console.log(fetchedUsers);
            //setUsers(fetchedUsers);
            const authUser = await Auth.currentAuthenticatedUser();
            setUser(fetchedUsers.find(user => user.id != authUser.attributes.sub) || null);
        };
        fetchUsers();
    }, [])
    const onPress = () => {
        console.log('pressed on', user.name);
        navigation.navigate('ChatRoom', { id: chatRoom.id });
    }

    if(!user) {
        return <ActivityIndicator />
    }
    return (
        <Pressable onPress={onPress}  style={styles.container}>
            <Image source={{uri: user.imageUri}} style={styles.image} />

            { !!chatRoom.newMessages && 
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText} > {chatRoom.newMessages} </Text>
                </View> }
            
            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}> {user.name} </Text>
                    <Text style={styles.text}> {chatRoom.lastMessage?.createdAt} </Text>
                </View>
                <Text numberOfLines={1} style={styles.text}>
                    {chatRoom.lastMessage?.content}
                </Text>
            </View>
        </Pressable>
    )
}
