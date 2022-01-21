import * as React from 'react';
import { Text, StyleSheet, Pressable, View, Image, FlatList } from 'react-native';
import UserItems from '../components/UserItems';
import Users from '../assets/SignalAssets/dummy-data/Users';

export default function UsersScreen() {

  return (
    <View style={styles.page}>
      
      <FlatList 
        data={ Users }
        renderItem = {({ item }) => <UserItems user={item} />} 
        showsVerticalScrollIndicator={false} 
      />
      {/* <Pressable onPress={logout} style={{ backgroundColor: 'grey', height: 50, margin: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Logout </Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  }
})

