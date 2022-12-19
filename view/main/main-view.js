import {StyleSheet, Text, View, TouchableOpacity, TextInput, ProgressViewIOSComponent} from 'react-native'
import SearchInput from '../search/search-input'
import SearchResults from '../search/search-results'
import MainAddNew from './main-add-new'

// objs
// onSearchInputChange
// onClearSearch
// searchValue
// onModify
export default function MainView(props) {
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <SearchInput searchValue={props.searchValue} onChange={props.onSearchInputChange} />
            </View>

            <View style={styles.container2}>
                <SearchResults objs={props.objs} onModify={props.onModify} />
            </View>

            <View style={styles.container3}>
                <MainAddNew onAddNew={props.onAddNew} onClear={props.onClearSearch}/> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width:"100%"
    },
    container1: {
      flex: 0.22,
      width:"100%"
    },
    container2: {
      flex: 0.85,
      width:"100%",
      backgroundColor:"#1e1c1a"
    },
    container3: {
      flex: 0.16,
      width:"100%",
      backgroundColor:"#444",
      borderTopWidth:1,
      borderTopColor:"white",
    },
  })