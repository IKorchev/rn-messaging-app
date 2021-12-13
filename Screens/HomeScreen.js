import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ChatScreen from "../Screens/Tabs/ChatsScreen"
import Feed from "./Tabs/FeedScreen"
import screenOptions from "../utils/tabScreenOptions"
import PostContextProvider from "../Providers/Post"

const Tab = createMaterialTopTabNavigator()

const FeedScreen = () => (
  <PostContextProvider>
    <Feed />
  </PostContextProvider>
)

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name='Feed' component={FeedScreen} />
      <Tab.Screen name='Chats' component={ChatScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
