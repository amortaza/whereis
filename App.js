import React, { useRef, useState, useEffect } from "react";
import {StatusBar} from 'expo-status-bar'
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainView from './view/main-view'
import LoadingView from './view/loading-view'
import ModifyObjView from './view/modify-obj/modify-obj-view'
import { Camera, CameraType } from 'expo-camera';

export default function App() {

    const [loadingDb, setLoadingDb] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState("loading...");
    const [page, setPage] = useState("main"); // "new"
    const [searchValue, setSearchValue] = useState(""); 
    const [obj, setObj] = useState(null); 

    const [permission, requestPermission] = Camera.useCameraPermissions();

    /*
    { objid:
        {
            tags: string
            uri
        }
    }
    */
    const [objs, setObjs] = useState({"84375":{objid:"84375", tags:"wow", uri:"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FWhereIs-6cff6290-a731-47eb-9c0f-36783c20a433/Camera/1476052f-9fd3-4d4a-a145-d717aa8b0861.jpg"}});
    const [filteredObjs, setFilteredObjs] = useState({});

    useEffect(() => {
        loadData();        
    }, []);

    useEffect(() => {
        if (!searchValue) {
            setFilteredObjs({...objs})
        } else {
            let filtered = filter(objs, searchValue)
            setFilteredObjs(filtered)
        }
    }, [objs, searchValue]);

    function filter(objs, tags) {
        let res = {}
        tags = tags.toLowerCase().split(" ")

        for(let k in objs) {
            let obj = objs[k]

            if (tagmatch(obj.tags.toLowerCase().split(" "), tags)) {
                res[k] = obj
            }
        }

        return res

        function tagmatch(objtags, tags) {
            for(let i=0;i<tags.length;i++) {
                let tag = tags[i]

                if (!objtags.includes(tag)) {
                    var found = false;
                    for(let j=0;j<objtags.length;j++) {
                        let ot = objtags[j];
                        if (ot.indexOf(tag) > -1) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) return false;
                } 
            }

            return true
        }
    }

    function onSearchInputChange(newValue) {
        // console.log("setting search value " + newValue);
        setSearchValue(newValue)
    }

    function onSave(objid, tags, uri) {
        let newobjs = {...objs }

        if (objid in newobjs && newobjs[objid].uri && !uri ) {
            uri = newobjs[objid].uri
        }
        
        newobjs[objid]= {objid: objid, tags: tags, uri: uri} 

        setObjs( newobjs)
        // console.log("objs is " + JSON.stringify(newobjs))
        // setPage("main")
    }

    function onDelete(objid) {
        let newobjs = { ...objs }
        delete newobjs[objid]

        setObjs( newobjs)
        // console.log("objs is " + JSON.stringify(newobjs))
        setPage("main")
    }

    function onModify(obj) {
        setObj(obj)
        setPage("modify")
        // console.log("modifying " + JSON.stringify(obj));
    }

    function onCancel() {
        setPage("main")
    }


    let loadData = async () => {
        try {
            let db = await AsyncStorage.getItem('_db_');
            if (db !== null) {
                setObjs( db )     
                setLoadingMsg("loaded")    
            } else {
                setLoadingMsg("welcome!") 
            }

            setTimeout(() => {
                setLoadingDb(false)
            }, 3000)                   
        } catch (error) {
            setLoadingMsg("error " + error)
        }
    };

    let rendered;

    if (loadingDb) {
        rendered = <LoadingView loadingMsg={loadingMsg} />
    } else {
        if (page == "main") {
            rendered = <MainView onModify={onModify} objs={filteredObjs} searchValue={searchValue} onSearchInputChange={onSearchInputChange} onAddNew={() => {
                setPage("new")
            }}

            onClearSearch={() => {
                setSearchValue("")
            }}
            />

        } else if (page == "new") {

            rendered = <ModifyObjView tags={searchValue} onSave={onSave}  onCancel={onCancel} onDelete={onDelete} />

        }else if (page == "modify") {

            rendered = <ModifyObjView objid={obj.objid} tags={obj.tags} onSave={onSave}  onCancel={onCancel} onDelete={onDelete} />
        }
    }

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
          <View style={styles.camcontainer}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }
    
    return (
        <>
        {rendered}
        </>
    )
}

const styles = StyleSheet.create({

      camcontainer: {
        flex: 1,
        justifyContent: 'center',
      },
    })