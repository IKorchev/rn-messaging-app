import React from "react"
import LoginScreen from "./LoginScreen"
import HomeScreen from "./HomeScreen"
import mainScreenOptions from "../utils/mainScreenOptions"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import IndividualChatScreen from "./Chat"
import ProfileScreen from "./ProfileScreen"
import CreateChatScreen from "./CreateChatScreen"
import { useAuth } from "../Providers/Auth"
const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  const { user } = useAuth()
  return (
    <Stack.Navigator screenOptions={mainScreenOptions}>
      {!user ? (
        <Stack.Screen name='Login' component={LoginScreen} />
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Chat' component={IndividualChatScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name='Create' component={CreateChatScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  )
}

export default MainNavigator
