import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    text: { 
        color: 'grey'
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 3,
    },
    badgeContainer: {
        backgroundColor: '#3777f0',
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        position: 'absolute',
        left: 45,
        top: 10,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    rightContainer: {
        flex: 1,
        marginLeft: 5,
        justifyContent: 'center',
    }
});

export default styles;
