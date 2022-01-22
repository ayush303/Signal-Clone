import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, Pressable, View, Image, FlatList } from 'react-native';
import {DataStore} from '@aws-amplify/datastore';
import UserItems from '../components/UserItems';
import { User } from '../src/models';

export default function UsersScreen() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  },[]);

  // useEffect(() => {
  //   // query users
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   };
  //   fetchUsers();
  // }, [])

  return (
    <View style={styles.page}>
      
      <FlatList 
        data={ users }
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

