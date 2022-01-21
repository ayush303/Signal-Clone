import * as React from 'react';
import { Text, StyleSheet, Pressable, View, Image, FlatList } from 'react-native';
import {Auth} from 'aws-amplify';
import ChatRoomItem from '../components/ChatRoomItem';
import ChatRoomsData from '../assets/SignalAssets/dummy-data/ChatRooms';

const chatRoom1 = ChatRoomsData[0];
const chatRoom2 = ChatRoomsData[2];
export default function HomeScreen() {

  const logout = () => {
    Auth.signOut();
  }
  return (
    <View style={styles.page}>
      
      <FlatList 
        data={ ChatRoomsData }
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

