import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ChatScreen from "../Screens/Tabs/ChatsScreen"
import StoriesScreen from "../Screens/Tabs/StoriesScreen"
import FeedScreen from "./Tabs/FeedScreen"
import screenOptions from "../utils/tabScreenOptions"
import Data from "../Providers/Data"
const Tab = createMaterialTopTabNavigator()
const TabNavigator = () => {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name='Feed' component={FeedScreen} />
        <Tab.Screen name='Chats' component={ChatScreen} />
        <Tab.Screen name='Stories' component={StoriesScreen} />
      </Tab.Navigator>
  )
}

export default TabNavigator
