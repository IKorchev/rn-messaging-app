import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import tw from "twrnc"

import MainNavigator from "./Screens/MainNavigator"

const App = () => {
  const user = "null"

  return (
    <NavigationContainer style={tw`mt-12`}>
      <MainNavigator />
    </NavigationContainer>
  )
}
export default App
