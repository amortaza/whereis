
import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState, useEffect } from "react";
import {Image,TouchableOpacity, FlatList, ImageBackground, StyleSheet, Text, View}  from 'react-native'
// todo on delete delete the actual image files

// objid
// uris
// thumbnailUri
// onURIsUpdated(objid, uris)
// makeThumbnail(objid, uri)
export default function Gallery(props) {

    const [uris, setUris] = useState(props.uris);
    const [thumbnailUri, setThumbnailUri] = useState(props.thumbnailUri);
    const [showCamera, setShowCamera] = useState(false);
    const [type, setType] = useState(CameraType.back);

    let mycam;

    useEffect(() => {
        // console.log("******** gallery onURIsUpdated " + JSON.stringify(uris));
        props.onURIsUpdated( props.objid, uris )
    }, [uris])

    useEffect(() => {
        // console.log("******** gallery makeThumbnail " + JSON.stringify(thumbnailUri));
        props.makeThumbnail( props.objid, thumbnailUri )
    }, [thumbnailUri])

    useEffect(() => {
        if (uris.length == 0) setShowCamera(true)
    }, [uris])

    useEffect(() => {
        // console.log("uris changed and thumbnail is " + thumbnailUri);
        if (uris.length != 0 && !thumbnailUri) {
            console.log("useeffect uris -> set thumbnail to " + uris[0]);
            setThumbnailUri(uris[0])
        }
    }, [uris])

    async function deleteImage(uri) {
        let newuris = uris.filter((test) => {
            return test != uri;
        })

        setUris(newuris)

        if (newuris.length == 0) {
            // console.log("image deleted clearing thumbnail");
            setThumbnailUri("")
        }

        if (newuris.length > 0 && thumbnailUri == uri) {
            // console.log("image deleted SETTING thumbnail");
            setThumbnailUri(newuris[0])
        }

        // FileSystem.deleteAsync(uri, {idempotent: true})
        
        // let RNFS = require("react-native-fs")
        // let exists = await RNFS.exists(uri)
        // if (exists) {
        //     console.log("exists!");
        //     await RNFS.unlink(uri)
        // } else {
        //     console.log("does not exist");
        // }
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

    const renderButton = (uri) => {
        // console.log("comparing 1 " + uri);
        // console.log("comparing 2 " + thumbnailUri);
        
        if (uri == thumbnailUri) {
            // console.log("should be disabled");
            return (<TouchableOpacity disabled={true} style={{...styles.image_display_button, opacity:0.34 }}>
                <Text style={styles.image_display_text}>THUMBNAIL</Text>
            </TouchableOpacity>
            )
        } 

        // console.log("should be enabled");
        
        return (
            <TouchableOpacity style={styles.image_display_button} onPress={() => {setThumbnailUri(uri)}}>
                <Text style={styles.image_display_text}>THUMBNAIL</Text>
            </TouchableOpacity>
        )        
    };

    // todo keep uri image proportions
    const renderItem = ({item}) => (
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

                    {renderButton(item)}

                </View>
            </ImageBackground>
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
        <>
            <View style={styles.ace}>
                <View style={styles.new_image_container}>
                    <TouchableOpacity style={styles.button_add_pic} onPress={() => {setShowCamera(true)}}>
                        <Text style={styles.text}>ADD PICTURE</Text>
                    </TouchableOpacity>

                </View>
                <FlatList style={styles.flatlist}
                    data={uris}
                    renderItem={renderItem}
                    keyExtractor={uri => uri}
                />
            </View>
        </>
        )
    )
}

const styles = StyleSheet.create({
    ace: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",  
        height:"100%"
        // borderWidth:10,
        // borderColor:"yellow"
      },  
    flatlist: {
        flex: 1,
    },  

    new_image_container: {
        flex: 0.2,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },  

      button_add_pic: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',        
        paddingTop: 7,
        borderRadius: 50,
        width:200,
        height:50,
        marginBottom: 20,
        backgroundColor: "#41ab91",
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
        flex: 0.39,
        flexDirection: "column",
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        // borderColor:"yellow",
        // borderWidth:2,
        marginRight:10,
        // marginBottom:20,
        gap:10
        // width:"50%",  
      },  
      image_delete_button: {
        flex: 0.5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: "#b90000",
        paddingTop: 4,
        borderRadius: 50,
        width:100,
        borderColor:"yellow",
        borderWidth:2,
        marginBottom:20,
        opacity:0.81
      },

      image_display_button: {
        flex: 0.5,
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 4,
        borderRadius: 50,
        width:130,
        borderWidth:2,
        marginBottom:20,
        backgroundColor: "#41ab91",
        borderWidth:3,
        borderColor: "#b1fbf1",
        opacity:0.95
      },

      image_display_text: {
        fontSize: 15,
        fontWeight: 'default',
        color: '#fff',
      },
      image_delete_text: {
        fontSize: 15,
        fontWeight: 'default',
        color: 'yellow',
      },

    })