import {Image, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import MyImageViewer from '../imaging/MyImageViewer'

// label
// obj
export default function ResultItem(props) {
    return (
        
        <View style={styles.container}>
            
            <View style={styles.c1}>
            
                <Text style={styles.text}>
                    {props.label}
                </Text>
                <TouchableOpacity onPress={() => {props.onModify(props.obj)}}>
                    {/* <Image
                        style={styles.image}
                        source={require('./pic1.jpg')}
                    /> */}
                    <MyImageViewer uri={props.obj.thumbnailUri || props.obj.uris[0]}/>
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
  })