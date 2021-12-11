import React, { createContext, useContext, useEffect, useState } from "react"
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env"
import * as Google from "expo-google-app-auth"
import { Alert } from "react-native"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore"
import { GoogleAuthProvider, signInWithCredential, signOut } from "@firebase/auth"
const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

const config = {
  iosClientId: IOS_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  scopes: ["profile", "email"],
}

const Auth = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        } else {
          setUser(null)
        }
      }),
    []
  )

  const addChat = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        name: name,
        createdBy: user.providerData[0].displayName,
      })
    } catch (error) {
      Alert.alert("OOPS", "Something went wrong! Try again later")
    }
  }

  const loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync(config)
      if (result.type === "cancel") {
        Alert.alert("OOPS", "Something went wrong, try again later")
      }
      const { idToken, accessToken, user } = result
      const credential = GoogleAuthProvider.credential(idToken, accessToken)
      const newuser = await signInWithCredential(auth, credential)
      const { displayName, photoURL, createdAt, phoneNumber } = newuser.user
      const userObject = {
        displayName,
        photoURL,
        phoneNumber,
      }
      const docSnap = await setDoc(doc(db, "users", newuser.user.uid), userObject)
      console.log(docSnap.id)
    } catch (error) {
      console.log(error.message)
    }
  }
  const logOut = () => {
    signOut(auth)
  }

  const value = {
    user,
    loginWithGoogle,
    logOut,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default Auth
