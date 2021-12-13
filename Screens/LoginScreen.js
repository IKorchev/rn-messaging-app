import React from "react"
import { ImageBackground, View, Image, TouchableOpacity, Text } from "react-native"
import { Button } from "react-native-elements"
import BGImage from "../assets/Background.png"
import GoogleBtn from "../assets/google_btn.png"
import { useAuth } from "../Providers/Auth"
import tw from "twrnc"
import f from "../utils/poppins"
const LoginScreen = () => {
  const { loginWithGoogle } = useAuth()

  return (
    <ImageBackground source={BGImage} width={100} height={600} style={tw`h-full `}>
      <View style={tw`flex-1 items-center justify-center px-8 -mt-48`}>
        <Text style={[f.poppins, tw`text-3xl text-white mt-6`]}>Welcome to the new</Text>
        <Text style={[f.poppins_bold, tw`text-4xl text-center text-pink-100 mt-8`]}>
          Social Media App
        </Text>
        <View style={tw` mt-48`}>
          <Text style={[f.poppins_bold, tw`text-3xl text-white`]}>Get started</Text>
          <TouchableOpacity onPress={loginWithGoogle} style={tw`mt-5`}>
            <Image source={GoogleBtn} style={tw`w-48 h-12`} resizeMode='cover' />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

export default LoginScreen
