import { LogBox } from "react-native"
LogBox.ignoreAllLogs() //Ignore all log notifications
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import tw from "twrnc"

import MainNavigator from "./Screens/MainNavigator"
import Auth from "./Providers/Auth"
const App = () => {
  return (
    <Auth>
      <NavigationContainer style={tw`mt-12`}>
        <MainNavigator />
      </NavigationContainer>
    </Auth>
  )
}
export default App
