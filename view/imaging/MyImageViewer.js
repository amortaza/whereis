import React, { useRef, useState, useEffect } from "react";
import {ImageBackground, StyleSheet, Text, View}  from 'react-native'

// uri
export default function MyImageViewer(props) {

    // const [tags, setTags] = useState(props.tags);

    // useEffect(() => {
        // console.log("modifying " + tags);
    // }, [tags])

    return (
        <View style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: 120, //'100%',
          height: 120, // '100%'
        }}
        >
        <ImageBackground
          source={{uri: props.uri}}
          style={{
            flex: 1
          }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
})