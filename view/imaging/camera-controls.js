import {StyleSheet, Text, View, TouchableOpacity, TextInput, ProgressViewIOSComponent} from 'react-native'

// onDone
// onOneAndDone
export default function CameraControls(props) {
    return (
        <View style={styles.container}>
            {/* <View style={styles.container_horiz}> */}
                <TouchableOpacity style={styles.buttonDone} onPress={props.onDone}>
                    <Text style={styles.text_done}>DONE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOne} onPress={props.onOneAndDone}>
                    <Text style={styles.text_one}>ONE 'N DONE</Text>
                </TouchableOpacity>
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.2,
      flexDirection: "row",
      paddingLeft:20,
      paddingRight:20,

      backgroundColor:"#444",
      alignItems: 'center',
      justifyContent: 'center',
      width:"100%",
      borderTopColor:"white",
      borderTopWidth:1

    },

    buttonDone: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#767670",
        paddingTop: 10,
        borderRadius: 50,
        height:50,

      },

      buttonOne: {
        flex: 1.5,
        alignSelf: 'center',
        alignItems: 'center',
        paddingTop: 8,
        borderRadius: 50,
        height:50,

        backgroundColor: "#41ab91",
        borderWidth:3,
        borderColor: "#b1fbf1",

        opacity:0.8
      },

      text_one: {
        fontSize: 18,
        fontWeight: 'default',
        color: '#fff',
      },

      text_done: {
        fontSize: 18,
        fontWeight: 'default',
        color: '#eee',
      },
  })