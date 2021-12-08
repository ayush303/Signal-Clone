import * as React from 'react';
import { Text, StyleSheet, View, Image, FlatList } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import ChatRoomsData from '../assets/SignalAssets/dummy-data/ChatRooms';

const chatRoom1 = ChatRoomsData[0];
const chatRoom2 = ChatRoomsData[2];
export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      
      <FlatList 
        data={ ChatRoomsData }
        renderItem = {({ item }) => <ChatRoomItem chatRoom={item} />} 
        showsVerticalScrollIndicator={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  }
})

