
import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState, useEffect } from "react";
import {Image,TouchableOpacity, FlatList, ImageBackground, StyleSheet, Text, View}  from 'react-native'
// todo on delete delete the actual image files

// objid
// uris
// onURIsUpdated
export default function Gallery(props) {

    const [urisplus, setUrisPlus] = useState([]);
    const [uris, setUris] = useState(props.uris);
    const [showCamera, setShowCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);

    let mycam;

    // useEffect(() => {
    //     setUris( [...props.uris] )
    // }, [props.uris])

    useEffect(() => {
        let plus = [...uris]
        plus.unshift("new")

        setUrisPlus(plus)

        console.log("***** gallery uris is " + JSON.stringify(uris));
    }, [uris])

    useEffect(() => {
        console.log("******** gallery onURIsUpdated " + JSON.stringify(uris));
        props.onURIsUpdated( props.objid, uris )
    }, [uris])

    useEffect(() => {
        if (uris.length == 0) setShowCamera(true)
    }, [uris])

    // todo delete file
    function deleteImage(uri) {
        let newuris = uris.filter((test) => {
            return test != uri;
        })

        setUris(newuris)
    }

    async function onTakePicture() {
        if (!mycam) {
            // todo do a proper alert
            console.log("mycam was null, cannot take picture");
            return
        }

        const photo = await mycam.takePictureAsync()
        let uri = photo.uri;

        setUris( [uri, ...uris])
        setShowCamera(false)
    }

    // todo keep uri image proportions
    const renderItem = ({item}) => (
        (item == "new" ? 
            <View style={styles.new_image_container}>
                <TouchableOpacity style={styles.button_add_pic} onPress={() => {setShowCamera(true)}}>
                    <Text style={styles.text}>ADD PICTURE</Text>
                </TouchableOpacity>

            </View>
            
            :
            <ImageBackground
            source={{uri: item}}
            style={{
                flex: 1,
                width:300,
                height:300,
                borderWidth:3,
                borderColor: "#ddd",
                justifyContent: "flex-end",
                alignItems: 'flex-end',
            }}> 
                <View style={styles.image_delete_container}>
                    <TouchableOpacity style={styles.image_delete_button} onLongPress={() => {deleteImage(item)}}>
                        <Text style={styles.image_delete_text}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )        
    );

    return (
        (showCamera ?
            <Camera style={styles.camera} type={type} ref={(cam) => {mycam = cam;}}>
                <View style={styles.cambuttonContainer}> 
                        <TouchableOpacity style={styles.cambutton} onPress={() => {
                            onTakePicture()                            
                        }}> 
                        {/* <Text style={styles.camtext}>Take Picture</Text>  */}
                        <Image source={require('../../assets/camera.png')} />
                        </TouchableOpacity> 
                    </View> 
            </Camera>  
        :
        <FlatList
            data={urisplus}
            renderItem={renderItem}
            keyExtractor={uri => uri}
        />)
    )
}

const styles = StyleSheet.create({
    new_image_container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",  
        // borderWidth:10,
        // borderColor:"yellow"
      },  
      button_add_pic: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#41ab91",
        paddingTop: 7,
        borderRadius: 50,
        width:200,
        height:50,
        marginBottom: 20,
        borderWidth:3,
        borderColor: "#b1fbf1"
      },
      text: {
        fontSize: 18,
        fontWeight: 'default',
        color: '#eee',
      },
      camera: {
        flex: 1,
        width:"100%"
      },
      cambuttonContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent:"flex-end",
        padding:40
      },
      camtext: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'yellow',
      },


    image_delete_container: {
        flex: 0.22,
        flexDirection: "column",
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        // borderColor:"yellow",
        // borderWidth:2,
        marginRight:10,
        marginBottom:20,
        // width:"50%",  
      },  
      image_delete_button: {
        flex: 0.5,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#b90000",
        paddingTop: 4,
        borderRadius: 50,
        width:100,
        borderColor:"yellow",
        borderWidth:2,
      },

      image_delete_text: {
        fontSize: 15,
        fontWeight: 'default',
        color: 'yellow',
      },

    })