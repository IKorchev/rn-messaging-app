import React from "react"
import { View, Text } from "react-native"
import LoginScreen from "./LoginScreen"
import HomeScreen from "./HomeScreen"
import mainScreenOptions from "../utils/mainScreenOptions"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import IndividualChatScreen from "./IndividualChatScreen"

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  const user = "null"
  return (
    <Stack.Navigator screenOptions={mainScreenOptions}>
      {!user ? (
        <Stack.Screen name='Login' component={LoginScreen} />
      ) : (
        <Stack.Group>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Chat' component={IndividualChatScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default MainNavigator
