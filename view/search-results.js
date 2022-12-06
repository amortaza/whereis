import {FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import ResultItem from '../component/result-item'
import React, { useRef, useState, useEffect } from "react";

// objs
/*
    { objid:
        {
            tags: string
            imgids: [ base64, ... ]
        }
    }
*/

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
        
        // return (
        //     <ResultItem key={obj.objid} label={tagsToLabel(obj.tags)} obj={obj} onModify={props.onModify} />
        // )

        return obj;
    })

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Thisrd Item',
        },
      ];
      
      const renderItem = ({item}) => (
        // console.log(obj)
        // <ResultItem key={obj.objid} label={tagsToLabel(obj.tags)} obj={obj} onModify={props.onModify} />
        <ResultItem key={item.objid} label={tagsToLabel(item.tags)} obj={item} onModify={props.onModify} />
        // <Text style={{color:"white"}}>{item.objid}</Text>
    );

    return (
        // <View style={styles.container}>
        //     {objlist}
        // </View>

        <FlatList
        data={objlist}
        // data={DATA}
        renderItem={renderItem}
        keyExtractor={obj => obj.id}
        />
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 3.3,
      flexDirection: "column",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor:"#1e1c1a",
      width:"100%",
      padding:15
    },

    text: {
        fontSize: 44,
        fontWeight: 'bold',
        color: 'red',
    },

  })