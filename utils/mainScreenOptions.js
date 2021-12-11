import React from "react"
import { Header } from "react-native-elements"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import tw from "twrnc"
import { getColor } from "tailwind-rn"
import { Pressable, Text, TouchableOpacity } from "react-native"
const mainScreenOptions = () => {
  return {
    header: ({ route, navigation }) => {
      const placement = route.name === "Home" ? "left" : "center"

      return (
        <Header
          backgroundColor='none'
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [getColor("purple-200"), getColor("purple-600")],
          }}
          placement={placement}
          leftComponent={() =>
            route.name !== "Home" && (
              <TouchableOpacity
                style={tw`flex-row items-center mt-3`}
                onPress={navigation.goBack}>
                <MaterialCommunityIcons name='chevron-left' size={30} color='white' />
                <Text style={tw`text-xl text-white`}>Back</Text>
              </TouchableOpacity>
            )
          }
          centerComponent={{
            text: route.name,
            style: tw`text-xl text-white mt-3`,
          }}
          rightComponent={() =>
            route.name !== "Profile" && (
              <Pressable
                onPress={() => navigation.navigate("Profile")}
                style={({ pressed }) =>
                  tw`p-2 rounded-full mt-1 ${pressed ? "bg-purple-800" : ""}`
                }>
                <MaterialCommunityIcons name='account-cog' size={26} color='white' />
              </Pressable>
            )
          }
        />
      )
    },
  }
}

export default mainScreenOptions
