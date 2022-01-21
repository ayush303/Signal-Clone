import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';

export default function UserItems({ user }) {
    
    const navigation = useNavigation();
    const onPress = () => {
        // When we click on user Create a chatroom with him
    }
    return (
        <Pressable onPress={onPress}  style={styles.container}>
            <Image source={{uri: user.imageUri}} style={styles.image} />

            
            <View style={styles.rightContainer}>
                <View style={styles.row}>
                    <Text style={styles.name}> {user.name} </Text>
                </View>
            </View>
        </Pressable>
    )
}
