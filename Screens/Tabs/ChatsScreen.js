import React, { useLayoutEffect, useState } from "react"
import { View, FlatList } from "react-native"
import { SearchBar, FAB } from "react-native-elements"
import { Ionicons } from "@expo/vector-icons"
import tw from "twrnc"
import { getColor } from "tailwind-rn"
import { collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import ChatRow from "./ChatRow"

const ChatsScreen = ({ navigation }) => {
  const [text, setText] = useState("")
  const [chatRooms, setChatrooms] = useState([])
  const [filter, setFilter] = useState("")
  useLayoutEffect(() => {
    const collRef = collection(db, "chats")
    const unsub = onSnapshot(collRef, (snapshot) => {
      const chatrooms = snapshot.docs.map((el) => ({
        id: el.id,
        ...el.data(),
      }))
      setChatrooms(chatrooms)
    })
    return unsub
  }, [])

  return (
    <View style={tw`flex-1 bg-purple-200`}>
      <SearchBar
        containerStyle={tw`bg-gray-50`}
        inputContainerStyle={tw`bg-gray-200`}
        searchIcon={<Ionicons name='search' size={20} color={getColor("purple-500")} />}
        clearIcon={(props) => (
          <Ionicons
            {...props}
            onPress={() => setText("")}
            name='close'
            size={20}
            color='white'
          />
        )}
        lightTheme={true}
        onChangeText={setFilter}
        placeholder={"Search name"}
        value={filter}
        style={tw`text-white`}
      />
      <FlatList
        data={chatRooms.filter((el) => {
          return el.name.toLowerCase().includes(filter.toLowerCase()) ? true : false
        })}
        keyExtractor={(item, i) => {
          return item.id
        }}
        renderItem={(item, i) => <ChatRow item={item} navigation={navigation} />}
      />
      <View style={tw`absolute bottom-5 right-5`}>
        <FAB
          icon={<Ionicons name='add' size={26} color='white' />}
          style={tw`items-center`}
          onPress={() => {
            navigation.navigate("Create")
          }}
        />
      </View>
    </View>
  )
}

export default ChatsScreen
