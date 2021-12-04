import React, { useState } from "react"
import { View, FlatList } from "react-native"
import { Avatar, ListItem, SearchBar } from "react-native-elements"
import { Ionicons, Entypo } from "@expo/vector-icons"
import tw from "twrnc"

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const ChatsScreen = ({ navigation }) => {
  const [text, setText] = useState("")

  return (
    <View style={tw`flex-1`}>
      <SearchBar
        containerStyle={tw`bg-gray-50`}
        inputContainerStyle={tw`bg-gray-200`}
        searchIcon={<Ionicons name='search' size={20} color='white' />}
        clearIcon={(props) => (
          <Ionicons
            props
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
        data={data}
        renderItem={(item, i) => (
          <ListItem style={tw`mt-0.5`} onPress={() => navigation.navigate("Chat")}>
            <Avatar
              size={60}
              rounded
              source={{
                uri: "https://pyxis.nymag.com/v1/imgs/630/6e0/eb215ad90cd826b9e57ff505f54c5c7228-07-avatar.rsquare.w700.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title style={tw`font-bold`}>Username</ListItem.Title>
              <ListItem.Subtitle style={tw`mt-2`}>
                This is a message from a user
              </ListItem.Subtitle>
            </ListItem.Content>
            <Entypo size={20} name='chevron-right' />
          </ListItem>
        )}
      />
    </View>
  )
}

export default ChatsScreen
