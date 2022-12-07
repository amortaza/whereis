import {StyleSheet, Text, View, TouchableOpacity, TextInput, ProgressViewIOSComponent} from 'react-native'

// isNew
// onSave
// onCancel
// onDelete
export default function AddTag(props) {
    return (
        <View style={styles.container_vert}>
            <View style={styles.container_horiz}>
                <TouchableOpacity style={styles.buttonDelete} onLongPress={props.onDelete}>
                    <Text style={styles.delete_text}>DELETE ITEM</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={props.onCancel}>
                    <Text style={styles.text}>BACK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_vert: {
      flex: 1,
      flexDirection: "column",
    //   backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      width:"100%",

    },

    container_horiz: {
      flex: 1,
      flexDirection: "row",
    //   backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
      width:"100%",
      padding:20
    },

    button: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#767670",
        paddingTop: 10,
        borderRadius: 50,
        height:50,
      },

    buttonDelete: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#b90000",
        paddingTop: 8,
        borderRadius: 50,
        height:50,
        borderWidth: 3,
        borderColor:"yellow",
      },

      delete_text: {
        fontSize: 18,
        fontWeight: 'default',
        color: 'yellow',
      },

      text: {
        fontSize: 18,
        fontWeight: 'default',
        color: '#eee',
      },
  })