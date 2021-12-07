import React, { useLayoutEffect, useState } from "react"
import { View, FlatList } from "react-native"
import { Avatar, ListItem, SearchBar, FAB } from "react-native-elements"
import { Ionicons, Entypo } from "@expo/vector-icons"
import tw from "twrnc"
import { getColor } from "tailwind-rn"
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  onSnapshot,
} from "@firebase/firestore"
import { db } from "../../firebase"

const ChatsScreen = ({ navigation }) => {
  const [text, setText] = useState("")
  const [chatRooms, setChatrooms] = useState([])
  useLayoutEffect(() => {
    const collRef = collection(db, "chats")
    const unsub = onSnapshot(collRef, (snapshot) => {
      const chatrooms = snapshot.docs.map((el) => ({
        id: el.id,
        ...el.data(),
      }))
      setChatrooms(chatrooms)
      chatRooms.forEach((room) => console.log(room.id))
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
        onChangeText={setText}
        value={text}
        style={tw`text-white`}
      />
      <FlatList
        data={chatRooms}
        keyExtractor={(item, i) => {
          return item.id
        }}
        renderItem={(item, i) => (
          <ListItem
            style={tw`mt-0.5`}
            onPress={() =>
              navigation.navigate("Chat", {
                id: item.item.id,
                name: item.item.name,
              })
            }>
            <Avatar
              size={60}
              rounded
              source={{
                uri: "https://pyxis.nymag.com/v1/imgs/630/6e0/eb215ad90cd826b9e57ff505f54c5c7228-07-avatar.rsquare.w700.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={tw`font-bold text-black`}>
                {item.item.name}
              </ListItem.Title>
              <ListItem.Subtitle style={tw`mt-2`}>
                This is a message from a user
              </ListItem.Subtitle>
            </ListItem.Content>
            <Entypo size={20} name='chevron-right' />
          </ListItem>
        )}
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
