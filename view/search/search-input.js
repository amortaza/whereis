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
            {/* <Text style={styles.text}>
                Where Is?
            </Text> */}

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
      backgroundColor:"#1e1c1a",
      paddingTop: 30,
      width:"100%"
    },

    text: {
        fontSize: 44,
        fontWeight: 'bold',
        color: 'red',
    },

    input: {
        height: 85,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 40,
        width:"90%",
        backgroundColor:"#767670",
        color:"#eee",
        borderWidth:3,
        borderColor:"#aaa"
      },
  })