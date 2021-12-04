import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ChatScreen from "./ChatsScreen"
import StoriesScreen from "./StoriesScreen"
import GroupsScreen from "./GroupsScreen"
import screenOptions from "../utils/tabScreenOptions"

const Tab = createMaterialTopTabNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name='Chats' component={ChatScreen} />
      <Tab.Screen name='Groups' component={GroupsScreen} />
      <Tab.Screen name='Stories' component={StoriesScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator