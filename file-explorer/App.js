import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import FileExplorer from './src/components/FileExplorer';
import data from "./src/data/data.js"
import Folder from './src/components/Folder.jsx';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [explorerData, setExplorerData] = useState(data)

  const findElementAndAddNewData = (folderId, explorerData, name, isFolder) => {

    if (explorerData.id === folderId) {
      explorerData.items.unshift({
        id: new Date().getTime().toString(),
        name: name,
        isFolder: isFolder,
        items: []
      })
    }

    explorerData.items.map((exp) => {
      return findElementAndAddNewData(folderId, exp, name, isFolder)
    })
  }

  const addNew = (name, setName, folderId, isFolder, setIsFolder, showInputBox, setShowInputBox) => {
    setShowInputBox(false);

    if (name !== "") {
      findElementAndAddNewData(folderId, explorerData, name, isFolder)
      setName("")
    }
  }

  const toDelete = (explorer, id) => {
    // console.log("itemId :", itemId);
    console.log(explorer);
    console.log(id);

    if (explorer.id === id) {
      return null
    }
    explorer.items.map((item) => {
      if (item.isFolder) {
        return toDelete(item, id)
      }
    })

  }

  return (
    <SafeAreaView style={{ marginTop: 20, flex: 1 }} >
      <StatusBar style="auto" />
      <View style={{ flex: 1, marginLeft: 10, borderLeftWidth: 1, }}>
        <View style={{ flexDirection: 'row', gap: 10, backgroundColor: "#DDDDDD", paddingHorizontal: 2, paddingVertical: 1 }} >
          <AntDesign name="down" size={16} color="black" />
          <Text style={{}} >FILE--EXPLORER</Text>

        </View>
        {/* <FileExplorer /> */}
        <Folder explorer={explorerData} addNew={addNew} toDelete={toDelete} />
      </View>
    </SafeAreaView>
  );
}


