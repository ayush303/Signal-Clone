import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {DataStore, Auth} from 'aws-amplify';
import {User} from '../../src/models';

const blue = '#3777f0';
const grey = '#f2f2f2';
const myID = 'u1';
const Message = ({ message }) => {
    const [user,setUser] = useState<User|undefined>();
    const [isMe, setIsMe] = useState<boolean>(false);

    useEffect(() => {
        DataStore.query(User, message.userID).then(setUser);
    }, []);

    useEffect(() => {
        const checkIfMe = async () => {
            if(!user) return;
            const authUser = await Auth.currentAuthenticatedUser();
            setIsMe(user.id == authUser.attributes.sub)
        };
        checkIfMe();
    }, [user]);

    if(!user) {
        return <ActivityIndicator />
    }

    return (
        <View style={[styles.container, isMe ? styles.containerLeft : styles.containerRight ]} >
            <Text style={{ color: isMe ? 'black' : 'white' }} >
                {message.content}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3777f0',
        padding: 10,
        margin: 10,
        borderRadius: 15,
        maxWidth: '75%',
    },
    text: {
        color: 'white',
    },
    containerLeft: {
        backgroundColor: grey,
        marginLeft: 'auto',
        marginRight: 10,
    },
    containerRight: {
        backgroundColor: blue,
        marginLeft: 10,
        marginRight: 'auto',
    }
})

export default Message;
