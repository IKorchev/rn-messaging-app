import React, { createContext, useContext, useEffect, useState } from "react"
import { Alert } from "react-native"
import { db } from "../firebase"
import {
  doc,
  where,
  query,
  addDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore"
import { useAuth } from "./Auth"
const DataContext = createContext({})

export const useData = () => {
  return useContext(DataContext)
}

const Data = ({ children }) => {
  const { user } = useAuth()

  const addChat = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        name: name,
        createdBy: user.uid,
      })
      Alert.alert("Chat created", `Successfully created chat: ${name}`)
    } catch (error) {
      Alert.alert("OOPS", "Something went wrong! Try again later")
    }
  }
  const addMessage = async (message, chatId) => {
    try {
      if (message.trim() !== "") {
        const docRef = await addDoc(collection(db, "chats", chatId, "messages"), {
          message: message,
          createdBy: user.uid,
          createdAt: serverTimestamp(),
          userInfo: {
            _id: user.uid,
            name: user.displayName,
            avatar: user.photoURL,
          },
        })
      }
    } catch (error) {
      console.log(error.message)
      Alert.alert("OOPS", "Something went wrong! Try again later")
    }
  }

  const getUserInfo = async (uid) => {
    try {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      return docSnap.data()
    } catch (error) {
      console.log("getUserInfo" + error.message)
    }
  }
  const value = {
    addChat,
    addMessage,
    getUserInfo,
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default Data
