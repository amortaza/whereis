import React, { useRef, useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'

// inputVal
// onChange
export default function ModifyObjInput(props) {

    const [inputVal, setInputVal] = useState(props.inputVal);

    function onChangeText(newValue) {
        setInputVal(newValue)        
        props.onChange(newValue)
    }

    return (
        
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={inputVal}
                multiline={true}
                placeholder="enter tags"
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#1e1c1a',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 30,
      width:"100%"
    },

    input: {
        height: 88,
        margin: 12,
        padding: 10,
        fontSize: 25,
        width:"90%",
        backgroundColor: "#767670",
        color:"#eee",
        borderWidth:1,
        borderColor:"#eee"
},
  })