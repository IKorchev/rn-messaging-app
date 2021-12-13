import React from "react"
import { Header } from "react-native-elements"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import tw from "twrnc"
import { getColor } from "tailwind-rn"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { useAuth } from "../Providers/Auth"
import f from "../utils/poppins"
const mainScreenOptions = () => {
  const { logOut } = useAuth()
  return {
    header: ({ route, navigation }) => {
      const placement = route.name === "Home" ? "left" : "center"

      return (
        route.name !== "Login" && (
          <Header
            backgroundColor='none'
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [getColor("pink-500"), getColor("purple-800")],
              start: {
                x: 1,
                y: 5,
              },
            }}
            placement={placement}
            leftComponent={() =>
              //only show back button if not on home page
              route.name !== "Home" && (
                <TouchableOpacity
                  style={tw`flex-row items-center mt-3`}
                  onPress={navigation.goBack}>
                  <MaterialCommunityIcons name='chevron-left' size={30} color='white' />
                </TouchableOpacity>
              )
            }
            centerComponent={{
              //use the actual chat name pulled from db
              text: route.name !== "Chat" ? route.name : route.params.name,
              style: [f.poppins_bold, tw`text-xl text-white mt-3`],
            }}
            rightComponent={() => (
              <View style={tw`flex-row`}>
                {route.name !== "Profile" && (
                  <Pressable
                    onPress={() => navigation.navigate("Profile")}
                    style={({ pressed }) =>
                      tw`p-2 rounded-full mt-1 ${pressed ? "bg-purple-800" : ""}`
                    }>
                    <MaterialCommunityIcons name='account-cog' size={26} color='white' />
                  </Pressable>
                )}
                <Pressable
                  onPress={logOut}
                  style={({ pressed }) =>
                    tw`p-2 rounded-full mt-1 ${pressed ? "bg-purple-800" : ""}`
                  }>
                  <MaterialCommunityIcons name='logout' size={26} color='white' />
                </Pressable>
              </View>
            )}
          />
        )
      )
    },
  }
}

export default mainScreenOptions
