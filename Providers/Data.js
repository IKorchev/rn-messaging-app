import React, { createContext, useContext, useEffect, useState } from "react"
import { Alert } from "react-native"
import { db } from "../firebase"
import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
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
        console.log("Message created with id:", docRef.id)
      }
    } catch (error) {
      console.log(error.message)
      Alert.alert("OOPS", "Something went wrong! Try again later")
    }
  }

  const value = {
    addChat,
    addMessage,
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default Data
