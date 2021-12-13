import { LogBox } from "react-native"
import { YellowBox } from "react-native"
YellowBox.ignoreWarnings([""])
LogBox.ignoreAllLogs(true)
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import tw from "twrnc"
import AppLoading from "expo-app-loading"
import MainNavigator from "./Screens/MainNavigator"
import Auth from "./Providers/Auth"
import Data from "./Providers/Data"
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/poppins"

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <Auth>
        <Data>
          <NavigationContainer style={tw`mt-12`}>
            <MainNavigator />
          </NavigationContainer>
        </Data>
      </Auth>
    )
  }
}
export default App
