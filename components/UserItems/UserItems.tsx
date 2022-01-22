import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { DataStore, Auth } from 'aws-amplify';
import { ChatRoom, User, ChatRoomUser } from '../../src/models';

export default function UserItems({ user }) {
    
    const navigation = useNavigation();
    const onPress = async () => {

        // TODO if there is already a chat between these 2 users
        // then redirect to the existing chatRoom user
        // otherwise, create a new chatRoom with these users 
        

        // When we click on user Create a chatroom with him
        const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}));

        // connnect authenticated user with the chatroom //
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const dbUser = await DataStore.query(User, authenticatedUser.attributes.sub);  
        //console.log(dbUser); 

        await DataStore.save(new ChatRoomUser({
            user: dbUser,
            chatRoom: newChatRoom
        }));

        // connnect clicked user with the chatroom //
        await DataStore.save(new ChatRoomUser({
            user,
            chatRoom: newChatRoom
        }));

        navigation.navigate('ChatRoom', { id: newChatRoom.id });
    }
    return (
        <Pressable onPress={onPress}  style={styles.container}>
            <Image source={{uri: user.imageUri}} style={styles.image} />

            
            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}> {user.name} </Text>
                </View>
            </View>
        </Pressable>
    )
}
