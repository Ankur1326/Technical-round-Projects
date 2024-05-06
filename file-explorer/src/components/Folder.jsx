import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const Folder = ({ explorer, addNew, toDelete }) => {
    // console.log("explorer :: ", explorer);
    const [expand, setExpand] = useState(false)
    const [showInputBox, setShowInputBox] = useState(false)
    const [name, setName] = useState("")
    const [isFolder, setIsFolder] = useState(false)


    if (explorer.isFolder) {
        return (
            <Pressable key={explorer.id} style={{ marginLeft: 20, }} >

                <Pressable onPress={() => setExpand(!expand)} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} >

                    {expand ? <AntDesign name="down" size={16} color="black" /> : <AntDesign name="right" size={16} color="black" />}
                    <View style={{ backgroundColor: "#F0F3F7", paddingHorizontal: 5, paddingVertical: 8, width: 250, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>


                        <Text  >🗂️ {explorer.name}</Text>

                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            {/* create file  */}
                            <Pressable onPress={() => { setShowInputBox(!showInputBox), setIsFolder(false) }} style={{}} >
                                <AntDesign name="addfile" size={19} color="black" />
                            </Pressable>
                            {/* create folder  */}
                            <Pressable onPress={() => { setShowInputBox(!showInputBox), setIsFolder(true) }} style={{}} >
                                <AntDesign name="addfolder" size={21} color="black" />
                            </Pressable>

                            {/* delete folder  */}
                            <Pressable onPress={() => toDelete(explorer, explorer.id)} style={{ borderLeftWidth: 0.5, paddingLeft: 7 }} >
                                <AntDesign name="delete" size={16} color="black" />
                            </Pressable>
                        </View>
                    </View>


                </Pressable>

                {
                    showInputBox && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 20, marginVertical: 4 }} >
                            <Text>{isFolder ? "🗂️" : <AntDesign name="filetext1" size={17} color="black" />}</Text>
                            <TextInput autoFocus onBlur={() => addNew(name, setName, explorer.id, isFolder, setIsFolder, showInputBox, setShowInputBox)} onChangeText={(text) => setName(text)} style={{ borderWidth: 0.5, paddingVertical: 1, paddingHorizontal: 10, width: 200, borderRadius: 2 }} placeholder='create new' />
                        </View>
                    )
                }

                <View style={{ backgroundColor: "", display: expand ? "block" : "none" }} >
                    {
                        explorer.items.map((exp) => {
                            return <Folder key={exp.id} explorer={exp} addNew={addNew} toDelete={toDelete} />
                        })
                    }
                </View>
            </Pressable>
        )
    } else { // file
        return (
            <View key={explorer.id} style={{ paddingHorizontal: 5, paddingVertical: 8, width: 200, flexDirection: 'row', alignItems: 'center', marginLeft: 37, justifyContent: 'space-between', }} >

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <AntDesign name="filetext1" size={17} color="black" />
                    <Text>{explorer.name}</Text>

                </View>
                {/* delete folder  */}
                <Pressable onPress={() => toDelete(explorer, explorer.id)} style={{}} >
                    <AntDesign name="delete" size={16} color="black" />
                </Pressable>
            </View>
        )
    }

}

export default Folder