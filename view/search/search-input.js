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

            <TouchableOpacity style={styles.button} onPress={() => {
                    setSearchValue("")
                    props.onChange("")
                }}>
                <Text style={styles.text}>CLEAR</Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 30,
      width:"100%",

      backgroundColor:"#444"
    },

    input: {
        flex: 0.74,
        height: 55,
        marginLeft: 12,        
        marginTop: 12,        
        marginBottom: 12,        
        marginRight: 6,        
        padding: 10,
        fontSize: 24,
        width:"90%",
        backgroundColor:"#767670",
        color:"#eee",

        borderWidth: 1,
        borderColor:"#eee"
      },

      button: {
        flex: 0.24,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#767670",
        padding: 4,
        borderRadius: 50
      },

      text: {
        fontSize: 15,
        fontWeight: 'default',
        color: '#eee',
      },

  })