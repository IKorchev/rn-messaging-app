import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { useAuth } from "../Providers/Auth"
const LoginScreen = () => {
  const { loginWithGoogle } = useAuth()
  return (
    <View>
      <Button title='login with google' onPress={loginWithGoogle} />
    </View>
  )
}

export default LoginScreen
