import {FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import ResultItem from './result-item'
import React, { useRef, useState, useEffect } from "react";

// objs
// onModify
export default function SearchResults(props) {

    // const [objs, setObjs] = useState({}); 

    // useEffect( () => {
    //     setObjs( props.objs )
    // }, [props.objs])

    function tagsToLabel(tags) {
        let label = "";
        let arr = tags.split(" ")

        if (arr.length > 0) {
            label += " " + arr[0]
        }
        if (arr.length > 1) {
            label += " " + arr[1]
        }
        if (arr.length > 2) {
            label += " " + arr[2]
        }

        return label
    }

    let objlist = Object.keys( props.objs ).map((key) => {
        let obj = props.objs[key]
        return obj;
    })

    objlist = objlist.sort((a,b) => {
        if (a.tags.toLowerCase() > b.tags.toLowerCase()) return 1;
        if (a.tags.toLowerCase() < b.tags.toLowerCase()) return -1;
        return 0;
    })

    if (objlist.length > 25) {
        objlist = objlist.slice(0, 25);
    }


    const renderItem = ({item}) => (
        <ResultItem key={item.objid} label={tagsToLabel(item.tags)} obj={item} onModify={props.onModify} />
    );


    return (
        (objlist.length == 0 ?
            <View style={styles.info_container}>
                <Text style={styles.info_text}>use "NEW ITEM" to add items.</Text>
                <Text style={styles.info_text}>"delete" buttons are activated by long-press!</Text>
                <Text style={styles.info_text}>search results are limited to 25 items</Text>
            </View>

          :
            <FlatList
                data={objlist}
                renderItem={renderItem}
                keyExtractor={obj => obj.objid}
            />

        )
    )
}

const styles = StyleSheet.create({

    info_container: {
      flex: 1,
      justifyContent: 'center',
    //   borderColor:"white",
    //   borderWidth:2
    },

    info_text: {
        textAlign:"center",
        // borderColor:"white",
        // borderWidth:2,
        fontSize: 18,
        fontWeight: 'default',
        color: '#ccc',
        marginBottom:50
      },
})