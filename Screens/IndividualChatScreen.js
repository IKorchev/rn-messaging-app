import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { Input } from "react-native-elements"
import tw from "twrnc"

const IndividualChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState("")
  const sendMessage = () => {
    console.log(message)
    setMessage("")
  }
  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: true,
      headerBackTitleVisible: true,
      headerLeft: () => <Ionicons name="heart-dislike" style={tw`ml-5`} size={20} />
    })
  }, [])

  return (
    <View>
      <View style={tw`absolute bottom-0 w-full`}>
        <Text>Hello</Text>
        <Input
          containerStyle={tw`p-0 bg-gray-200`}
          inputContainerStyle={tw`bg-gray-200 px-5`}
          inputStyle={tw`text-xl`}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
          rightIcon={
            <Ionicons
              name='send'
              onPress={sendMessage}
              size={20}
              color='black'
              style={tw`mr-1`}
            />
          }
          placeholder='Message'
          value={message}
        />
      </View>
    </View>
  )
}

export default IndividualChatScreen
