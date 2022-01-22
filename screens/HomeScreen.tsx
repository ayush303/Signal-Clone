import React, {useState,useEffect} from 'react';
import { Text, StyleSheet, Pressable, View, Image, FlatList } from 'react-native';
import {Auth, DataStore} from 'aws-amplify';
import ChatRoomItem from '../components/ChatRoomItem';
import ChatRoomsData from '../assets/SignalAssets/dummy-data/ChatRooms';
import {ChatRoom, ChatRoomUser} from '../src/models';

const chatRoom1 = ChatRoomsData[0];
const chatRoom2 = ChatRoomsData[2];
export default function HomeScreen() {

  const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {

      const userData = await Auth.currentAuthenticatedUser();
      //console.log("Athenticated user Data: ", userData);
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.user.id == userData.attributes.sub)
        .map(chatRoomUser => chatRoomUser.chatRoom);
      //console.log(chatRooms);
      setChatRoom(chatRooms);
    };
    fetchChatRooms();
  },[])

  const logout = () => {
    Auth.signOut();
  }
  return (
    <View style={styles.page}>
      
      <FlatList 
        data={ chatRoom }
        renderItem = {({ item }) => <ChatRoomItem chatRoom={item} />} 
        showsVerticalScrollIndicator={false} 
      />
      <Pressable onPress={logout} style={{ backgroundColor: 'grey', height: 50, margin: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Logout </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  }
})

