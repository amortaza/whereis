import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'

export default function LoadingView(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.loadingMsg}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },

    text: {
        fontSize: 44,
        fontWeight: 'bold',
        color: 'red',
    },

  })