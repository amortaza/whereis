
import React, { useRef, useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import AddTag from './add-tag'
import ModifyObjInput from './modify-obj-input'
import Gallery from '../imaging/gallery'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { WhiteBalance } from "expo-camera";

// objid
// uris
// tags
// thumbnailUri
// onSave
// onCancel
// onDelete
export default function ModifyObjView(props) {

    const [tags, setTags] = useState(props.tags);
    const [objid, setObjId] = useState(props.objid || uuidv4());
    const [uris, setUris] = useState(props.uris);
    const [thumbnailUri, setThumbnailUri] = useState(props.thumbnailUri);
    const [page, setPage] = useState("main"); // main, camera

    useEffect(() => {
        if (!objid) {
            // console.log("in modify-obj-view preventing onSave for empty objid");
            return
        }

        // console.log("calling papa with thumbnail " + thumbnailUri);
        props.onSave(objid, tags, uris, thumbnailUri)
    }, [tags, uris, thumbnailUri])

    function onTagsChange(newTags) {
        setTags(newTags)
    }

    function onURIsChange(objid, newUris) {
        setUris(newUris)
    }

    function makeThumbnail(objid, thumbnailUri) {
        // console.log("modifyobj - makethumbnail");
        setThumbnailUri(thumbnailUri)
    }

    async function onSave() {
        props.onSave(objid, tags, uris, thumbnailUri)
        props.onCancel()
    }

    function onDelete() {
        props.onDelete(objid)
    } 
    
    function onCameraStatusChange(status) {
        if (status) {
            setPage("camera")
        } else {
            setPage("main")
        }
    }

    let controls = null
    let cameraFlex = 0.65

    if (page == "main") {
        controls = (
            <View style={styles.container3}>
                <AddTag isNew={!objid} onSave={onSave} onCancel={props.onCancel} onDelete={onDelete} />
            </View>
        )

    } else {
        cameraFlex = 0.77 // 78
    }

    return (
        <View style={styles.container}>            

            <View style={styles.container1}>
                <ModifyObjInput inputVal={tags} onChange={onTagsChange} />
            </View>

            <View style={{...styles.container2, flex: cameraFlex}}>
                <Gallery objid={objid} uris={uris} thumbnailUri={thumbnailUri} makeThumbnail={makeThumbnail} onURIsUpdated={onURIsChange} onCameraStatusChange={onCameraStatusChange}/>
            </View>

            {controls}
            
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
        // cameraFlex overwrites this -> flex: .65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width:"100%",
        height:"100%",
      },

      container3: {
        flex: 0.13, // 13
        justifyContent: 'center',
        backgroundColor: '#444',
        width:"100%",
        borderTopColor:"white",
        borderTopWidth:1
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


