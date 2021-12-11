import React, { useState } from "react"
import { Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Button, Input } from "react-native-elements"
import { getColor } from "tailwind-rn"
import tw from "twrnc"
import { useData } from "../Providers/Data"
const CreateChatScreen = () => {
  const [chatName, setChatName] = useState("")
  const { addChat } = useData()

  return (
    <View style={tw`flex-1 bg-white`}>
      <Text style={tw`text-2xl font-bold text-center mt-5`}> Create Chat </Text>
      <View style={tw`p-4 h-48 rounded-xl mt-12`}>
        <Input
          placeholder='Chat name'
          onChangeText={setChatName}
          inputStyle={tw`text-xl`}
          value={chatName}
        />
        <Button
          onPress={() => {
            addChat(chatName)
            setChatName("")
          }}
          title='Create'
          containerStyle={tw`shadow-2xl shadow-purple-900 `}
          titleStyle={tw`font-bold uppercase`}
          buttonStyle={tw`bg-purple-900 rounded-lg `}
        />
      </View>
    </View>
  )
}

export default CreateChatScreen
