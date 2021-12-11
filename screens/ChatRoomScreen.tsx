import React from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Message from '../components/Message/Message';
import chatRoomData from '../assets/SignalAssets/dummy-data/Chats';
import { useRoute, useNavigation } from '@react-navigation/core';
import MessageInput from '../components/MessageInput';

export default function ChatRoomScreen() {
    const route = useRoute();
    const navigation = useNavigation();

    navigation.setOptions({title: 'Elon Musk'})

    console.log("Displaying ChatRoom ID ",route.params?.id)

    return (
        <SafeAreaView style={styles.page} >
            <FlatList 
                data = {chatRoomData.messages}
                renderItem={({ item }) => <Message message={ item }/>} 
                inverted
            />
            <MessageInput />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
})
