import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native'
import Message from '../components/Message/Message';
import {DataStore, Auth, SortDirection} from 'aws-amplify';
import {ChatRoom, Message as MessageModel} from '../src/models';
import chatRoomData from '../assets/SignalAssets/dummy-data/Chats';
import { useRoute, useNavigation } from '@react-navigation/core';
import MessageInput from '../components/MessageInput';

export default function ChatRoomScreen() {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [chatRoom, setChatRoom] = useState<ChatRoom|null>(null);

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        fetchChatRoom();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [chatRoom]);

    useEffect(() => {
        const subscription = DataStore.observe(MessageModel).subscribe(msg => {
            console.log(msg.model, msg.opType, msg.element);
            if(msg.model == MessageModel && msg.opType == "INSERT") {
                setMessages(existingMessages => [msg.element, 
                    ...existingMessages]);
            }
        });

        return () => subscription.unsubscribe();
    }, [])

    const fetchChatRoom = async () => {

        if(!route.params?.id){
            console.log("No chatRoom ID provided");
            return;
        }
        const chatRoom = await DataStore.query(ChatRoom, route.params.id);
        console.log(chatRoom);
        if(!chatRoom){
            console.log("Couldn't find an chatroom with this id");
        } else {
            setChatRoom(chatRoom);
        }
        // const fetchdedMessages = await DataStore.query(MessageModel, );
    };

    const fetchMessages = async () => {
        if(!chatRoom) {
            return;
        }
        const fetchedMessages = await DataStore.query(MessageModel, 
            message => message.chatroomID("eq", chatRoom?.id),
            {
                sort: message => message.createdAt(SortDirection.DESCENDING)
            }
            );
        setMessages(fetchedMessages);
        console.log(fetchedMessages);
    };

    navigation.setOptions({title: 'Elon Musk'})

    console.log("Displaying ChatRoom ID ",route.params?.id)

    if(!chatRoom) {
        return <ActivityIndicator />
    }

    return (
        <SafeAreaView style={styles.page} >
            <FlatList 
                data = {messages}
                renderItem={({ item }) => <Message message={ item }/>} 
                inverted
            />
            <MessageInput chatRoom= {chatRoom}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        flex: 1,
    }
})
