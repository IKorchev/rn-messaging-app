import React, { useState } from "react"
import { Text, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Button, Input } from "react-native-elements"
import { getColor } from "tailwind-rn"
import { collection, addDoc } from "firebase/firestore"
import tw from "twrnc"
import { useAuth } from "../Providers/Auth"
const CreateChatScreen = () => {
  const [chatName, setChatName] = useState("")
  const { addChat } = useAuth()

  return (
    <LinearGradient
      style={tw`flex-1`}
      colors={[getColor("purple-50"), getColor("purple-100")]}>
      <Text style={tw`text-2xl font-bold text-center mt-5`}> Create Chat </Text>
      <View style={tw`p-4 h-48 rounded-xl justify-between mt-12`}>
        <Input
          placeholder='Chat name'
          onChangeText={setChatName}
          inputStyle={tw`text-xl`}
          value={chatName}
        />
        <Button
          onPress={() => addChat(chatName)}
          title='Create'
          titleStyle={tw`font-bold uppercase`}
          buttonStyle={tw`bg-purple-400 rounded-lg`}
        />
      </View>
    </LinearGradient>
  )
}

export default CreateChatScreen
