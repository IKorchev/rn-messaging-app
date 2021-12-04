import React, { createContext, useContext } from "react"
import { View, Text } from "react-native"
const AuthContext = createContext("")

export const useAuth = () => {
  useContext(AuthContext)
}

const Auth = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}

export default Auth
