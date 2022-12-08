import {StyleSheet, Text, View, TouchableOpacity, TextInput, ProgressViewIOSComponent} from 'react-native'

// onAddNew
// onClear
export default function MainAddNew(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={props.onAddNew}>
                <Text style={styles.text}>NEW ITEM</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={props.onClear}>
                <Text style={styles.text}>CLEAR</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
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
        padding: 6,
        borderRadius: 50
      },

      text: {
        fontSize: 18,
        fontWeight: 'default',
        color: '#eee',
      },
  })