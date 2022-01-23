import React, {useEffect, useState} from 'react';
import {View, Image, Text, Pressable, useWindowDimensions, ColorSchemeName} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {DataStore, Auth} from 'aws-amplify';
import {User, ChatRoomUser} from '../src/models';


const ChatRoomHeader = ({ id, children }) => {
    const { width } = useWindowDimensions();
    console.log(id);
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        if(!id) {
            return;
        }
        const fetchUsers = async () => {
            const fetchedUsers = (await DataStore.query(ChatRoomUser))
                .filter((chatRoomUser) => chatRoomUser.chatRoom.id == id)
                .map(chatRoomUser => chatRoomUser.user);
            //console.log(fetchedUsers);
            //setUsers(fetchedUsers);
            const authUser = await Auth.currentAuthenticatedUser();
            setUser(fetchedUsers.find(user => user.id != authUser.attributes.sub) || null);
        };
        fetchUsers();
    }, [])

    return (
    <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            width: width - 50,
            padding: 10,
            marginLeft: 'auto',
            marginRight: 25,
            alignItems: 'center',
            backgroundColor: 'black'
        }} >
        <Image source={{ uri: user?.imageUri}} 
            style={{ width: 30, height: 30, borderRadius: 30, }}
        />
        <Text style={{ color:'white', flex: 1, marginLeft: 10, fontWeight: 'bold' }}>
            {user?.name}
        </Text>
        <Feather name="camera" size={24} color="#f2f2f2" style= {{marginHorizontal: 5}} />
        <Feather name="edit-2" size={24} color="#f2f2f2" style= {{marginHorizontal: 15}} />
    </View>
    
    );
};

export default ChatRoomHeader;