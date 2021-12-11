import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput,Pressable } from 'react-native';
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const MessageInput = () => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        console.log("sending: ", message);
        setMessage('');
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
        <View style={styles.root}>
            <View style={styles.inputContainer} >
                <SimpleLineIcons name="emotsmile" size={24}  colors='#595959' style={{marginHorizontal: 5}} />
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
    )
}

export default MessageInput

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        padding: 10,
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
