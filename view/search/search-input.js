import React, { useRef, useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput, ProgressViewIOSComponent} from 'react-native'

// onChange
// searchValue
export default function SearchInput(props) {

    const [searchValue, setSearchValue] = useState(props.searchValue);

    useEffect(() => {
        setSearchValue(props.searchValue)
    }, [props.searchValue])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={props.onChange}
                value={searchValue}
                placeholder="where is?"
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 30,
      width:"100%",

      backgroundColor:"#444"
    },

    input: {
        height: 55,
        margin: 12,        
        padding: 10,
        fontSize: 24,
        width:"90%",
        backgroundColor:"#767670",
        color:"#eee",

        borderWidth: 1,
        borderColor:"#eee"
      },
  })