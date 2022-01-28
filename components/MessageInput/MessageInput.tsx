import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { DataStore, Auth, Storage } from 'aws-amplify';
import { Message, ChatRoom } from '../../src/models';
import EmojiSelector from 'react-native-emoji-selector';
import * as ImagePicker from 'expo-image-picker';
//import { v4 as uuidv4 } from 'uuid';

const MessageInput = ({ chatRoom }) => {
    const [message, setMessage] = useState('');
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [image, setImage] = useState<string|null>(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        (async () => {
            if(Platform.OS != 'web') {
                const libraryResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const photoResponse = await ImagePicker.requestCameraPermissionsAsync(); 
                if(libraryResponse.status != 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work! ');
                }
            }
        })();
    }, []);

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
        //console.warn("");
    }

    const onPress = () => {
        if(image) {
            sendImage();
        }
        if(message)
            sendMessage();
        else
            onPlusClick();
    }

    // Image Picker
    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],

        });

        if(!result.cancelled) {
            setImage(result.uri);
        }
    };

    const sendImage = async () => {
        if(!image) {
            return;
        }
        setCount(count => count + 1);
        //console.log(count);
        const blob = await getImageBlob();
        await Storage.put("test.png", blob);
    }

    const getImageBlob = async () => {
        if(!image) {
            return null;
        }

        const response = await fetch(image);
        const blob = await response.blob();
        return blob;
    }

    return (
        <KeyboardAvoidingView style={[styles.root, {height: isEmojiPickerOpen ? "50%" : "auto"}]}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}>

            {image && (
                <View style={styles.sendImageContainer}>
                    <Image source={{uri: image}} style={{ width: 100, height: 100, borderRadius: 10 }} />
                    <Pressable onPress={() => setImage(null)} >
                        <AntDesign name="close" size={24} color="black" style={{margin: 5}} />
                    </Pressable>
                </View>
                
            )}
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
                
                <Pressable onPress={pickImage} >
                    <Feather 
                        name="image"
                        size={24}
                        color="#595959"
                        style={{marginRight: 5}}
                    />
                </Pressable>

                <Pressable onPress={takePhoto} >
                    <Feather 
                    name="camera" 
                    size={24} 
                    color='#595959' 
                    style={{marginRight:5}} 
                />
                </Pressable>
                

                <MaterialCommunityIcons name="microphone-outline" size={24} color='#595959' style={{marginRight: 5}} />
            </View>
            <Pressable onPress={onPress} style={styles.buttonContainer} >
                {message || image ? <Ionicons name="send" size={24} color="white" /> : <AntDesign name="plus" size={24} color="white" />}
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

export default MessageInput;

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
    },
    sendImageContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignSelf: "stretch",
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10,
    }
})
