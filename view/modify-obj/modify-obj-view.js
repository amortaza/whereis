import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import AddTag from '../../component/add-tag'
import ModifyObjInput from './modify-obj-input'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

// objid
// uri
// tags
// onSave
// onCancel
// onDelete
export default function ModifyObjView(props) {

    const [type, setType] = useState(CameraType.back);
    const [tags, setTags] = useState(props.tags);
    const [objid, setObjId] = useState(props.objid || uuidv4());

    useEffect(() => {
        props.onSave(objid, tags, props.uri)
    }, [tags])

    function onTagsChange(newTags) {
        setTags(newTags)
    }

    async function onSave() {
        const photo = await mycam.takePictureAsync()
        let uri = photo.uri;

        // console.log("photo " + width + " x " + height);
        // console.log("photo " + uri);

        // let objid = props.objid || uuidv4()
        props.onSave(objid, tags, uri)
        props.onCancel()
    }

    function onDelete() {
        props.onDelete(props.objid)
    }

    let mycam;

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <ModifyObjInput inputVal={tags} onChange={onTagsChange} />
            </View>

            <View style={styles.container2}>
                <Camera style={styles.camera} type={type} ref={(cam) => {
                    mycam = cam;
                }}>
                    <View style={styles.cambuttonContainer}> 
                    {/* <TouchableOpacity style={styles.cambutton} onPress={takePicture}> */}
                        {/* <Text style={styles.camtext}>Take Picture</Text> */}
                    {/* </TouchableOpacity> */}
                    </View> 
                </Camera> 
             </View>

            <View style={styles.container3}>
                <AddTag isNew={!props.objid} onSave={onSave} onCancel={props.onCancel} onDelete={onDelete} />
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
      backgroundColor:"purple",
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
        flex: 0.59,
        justifyContent: 'center',
        backgroundColor: 'yellow',
        width:"100%"
      },

      container3: {
        flex: 0.25,
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

      camera: {
        flex: 1,
        width:"100%"
      },
      cambuttonContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
      },
      camtext: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'yellow',
      },
    })