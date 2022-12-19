import {Image, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import MyImageViewer from '../imaging/MyImageViewer'

// label
// obj
export default function ResultItem(props) {
    let thumbnailUri = props.obj.thumbnailUri

    if (!thumbnailUri && props.obj.uris && props.obj.uris.length > 0) {
        thumbnailUri = props.obj.uris[0]
    }

    let img

    if (thumbnailUri) {
        img = <MyImageViewer uri={thumbnailUri}/>
    } else {
        img = <Text style={styles.no_image_text}>{"<no image>"}</Text>
    }

    return (
        
        <View style={styles.container}>
            
            <View style={styles.c1}>
                <TouchableOpacity onPress={() => {props.onModify(props.obj)}}>
                    <Text style={styles.text}>
                        {props.label}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {props.onModify(props.obj)}}>
                    {img}
                </TouchableOpacity>
            </View>
            
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor:"cyan",
      width:"100%",
      height:120,
      marginBottom: 10,

    },

    c1: {
      flex: 1,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor:"#1e1c1a",
      borderBottomWidth:1,
      borderBottomColor:"white",
    },

    image: {
        width: 120,
        height: 120,
    },

    text: {
        fontSize: 24,
        fontWeight: 'default',
        color: '#f8e0e2',
        marginRight:20,
    },

    no_image_text: {
        fontSize: 17,
        fontWeight: 'default',
        color: 'yellow',
        marginRight:8,
        marginLeft:12
    },
  })