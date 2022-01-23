import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import {DataStore, Auth} from 'aws-amplify';
import {Message, ChatRoom} from '../../src/models';
import EmojiSelector from 'react-native-emoji-selector';

const MessageInput = ({chatRoom}) => {
    const [message, setMessage] = useState('');
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const sendMessage = async () => {
        
        const user = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new Message({
            content: message,
            userID: user.attributes.sub,
            chatroomID: chatRoom.id,
        }))

        console.log("sending: ", message);
        updateLastMessage(newMessage);
        setMessage('');
        setIsEmojiPickerOpen(false);
    }

    const updateLastMessage = async (newMessage) => {
        DataStore.save(ChatRoom.copyOf(chatRoom, updatedChatRoom => {
            updatedChatRoom.LastMessage = newMessage;
        }))
    }

    const onPlusClick = () => {
        console.warn("Plus is clicked");
    }

    const onPress = () => {
        if(message)
            sendMessage();
        else
            onPlusClick();
    }

    return (
        <KeyboardAvoidingView style={[styles.root, {height: isEmojiPickerOpen ? "50%" : "auto"}]}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}>
            <View style={styles.row}>
                <View style={styles.inputContainer} >
                    <Pressable onPress={() => setIsEmojiPickerOpen((value) => !value)}>
                        <SimpleLineIcons name="emotsmile" size={24}  colors='#595959' style={{marginHorizontal: 5}} />
                    </Pressable>
                
                <TextInput 
                    style={{flex:1, marginHorizontal:5,}} 
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Message..."
                />
                <Feather name="camera" size={24} color='#595959' style={{marginRight:5}} />
                <MaterialCommunityIcons name="microphone-outline" size={24} color='#595959' style={{marginRight: 5}} />
            </View>
            <Pressable onPress={onPress} style={styles.buttonContainer} >
                {message ? <Ionicons name="send" size={24} color="white" /> : <AntDesign name="plus" size={24} color="white" />}
            </Pressable>
            </View>
            
            {isEmojiPickerOpen && (<
                EmojiSelector onEmojiSelected={(emoji) => 
                    setMessage((currentValue) => currentValue + emoji)}
                columns={8}
            />
            )}
        </KeyboardAvoidingView>
    )
}

export default MessageInput

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },  
    row: {
        flexDirection: 'row',
        padding: 10
    },
    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        padding: 5, 
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        flexDirection: 'row',
        color: 'black',

    },
    inputText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
    buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#3777f0',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
    }
})
