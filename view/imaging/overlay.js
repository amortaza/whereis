
import React, { useRef, useState, useEffect } from "react";
import {Image,TouchableOpacity, FlatList, ImageBackground, StyleSheet, Text, View}  from 'react-native'

export default function Overlay() {

    return (
        <View style={styles.container}> 
        <Text style={styles.text}>ONE 'N DONE</Text>
        <Text style={styles.text}>take ONE picture and be done</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>CAMERA ICON</Text>
        <Text style={styles.text}>take multiple pictures</Text>
        </View> 
    )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        flexDirection:"column",
        backgroundColor: "#555",
        opacity: 0.6,

        margin:30,
        padding:10,

        borderWidth:1,
        borderColor:"white"
    },

    text: {
        fontSize: 18,
        fontWeight: 'default',
        color: 'yellow',
    },

})