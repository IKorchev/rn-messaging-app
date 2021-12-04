import React from "react"
import { Header, Avatar, Icon } from "react-native-elements"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import tw from "twrnc"
import { getColor } from "tailwind-rn"
import { Pressable, Text, TouchableOpacity } from "react-native"
const mainScreenOptions = () => {
  return {
    header: ({ route, navigation }) => {
      const placement = route.name !== "Chat" ? "left" : "center"

      const title = route.name !== "Chat" ? "Home" : route?.params?.username || "Chat"
      return (
        <Header
          placement={placement}
          backgroundColor={getColor("green-800")}
          leftComponent={() =>
            route.name == "Chat" ? (
              <TouchableOpacity
                style={tw`flex-row items-center mt-3`}
                onPress={navigation.goBack}>
                <MaterialCommunityIcons name='chevron-left' size={30} color='white' />
                <Text style={tw`text-xl text-white`}>Back</Text>
              </TouchableOpacity>
            ) : null
          }
          centerComponent={{ text: title, style: tw`text-xl text-white mt-3` }}
          rightComponent={() => (
            <Pressable
              onPress={() => navigation.navigate("Login")}
              style={({ pressed }) =>
                tw`p-2 rounded-full mt-1 ${pressed ? "bg-green-600" : ""}`
              }>
              <MaterialCommunityIcons name='account-cog' size={26} color='white' />
            </Pressable>
          )}
        />
      )
    },
  }
}

export default mainScreenOptions
