
import React, { useRef, useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import AddTag from './add-tag'
import ModifyObjInput from './modify-obj-input'
import Gallery from '../imaging/gallery'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

// objid
// uris
// tags
// onSave
// onCancel
// onDelete
export default function ModifyObjView(props) {

    const [tags, setTags] = useState(props.tags);
    const [objid, setObjId] = useState(props.objid || uuidv4());
    const [uris, setUris] = useState(props.uris);

    useEffect(() => {
        if (!objid) {
            console.log("in modify-obj-view preventing onSave for empty objid");
            return
        }

        props.onSave(objid, tags, uris)
    }, [tags, uris])

    function onTagsChange(newTags) {
        setTags(newTags)
    }

    function onURIsChange(objid, newUris) {
        setUris(newUris)
    }

    async function onSave() {
        props.onSave(objid, tags, uris)
        props.onCancel()
    }

    function onDelete() {
        props.onDelete(objid)
    }    

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <ModifyObjInput inputVal={tags} onChange={onTagsChange} />
            </View>

            <View style={styles.container2}>
                <Gallery objid={objid} uris={uris} onURIsUpdated={onURIsChange}/>
             </View>

            <View style={styles.container3}>
                <AddTag isNew={!objid} onSave={onSave} onCancel={props.onCancel} onDelete={onDelete} />
            </View>

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
      width:"100%"
    },

    container1: {
        flex: 0.25,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"blue",
        width:"100%"
      },

      container2: {
        flex: 0.65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width:"100%",
        height:"100%",
      },

      container3: {
        flex: 0.15,
        justifyContent: 'center',
        backgroundColor: '#444',
        width:"100%"
      },

      text: {
        fontSize: 35,
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
      },
    })


