import React, { createContext, useContext } from "react"
import { Alert } from "react-native"
import { db } from "../firebase"
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  arrayUnion,
  updateDoc,
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
        console.log("Message created with id:", docRef.id)
      }
    } catch (error) {
      console.log(error.message)
      Alert.alert("OOPS", "Something went wrong! Try again later")
    }
  }
  const addPost = async (postObject) => {
    if (!postObject) {
      Alert.alert("Ooops", "Something went wrong. Please make sure you upload an image.")
      return
    }
    try {
      const dbObject = {
        ...postObject,
        likes: 0,
        comments: [],
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      }
      const postsRef = collection(db, "posts")
      const res = await addDoc(postsRef, dbObject)
      console.log(res.id)
    } catch (error) {
      console.log(error.message)
    }
  }
  const addComment = async (postId, object) => {
    try {
      const postRef = doc(db, "posts", postId)
      const snap = await updateDoc(postRef, {
        comments: arrayUnion(object),
      })
      console.log(snap)
    } catch (error) {
      console.log(error)
    }
  }
  const getUserInfo = async (uid) => {
    try {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      return docSnap.data()
    } catch (error) {
      console.log(error.message)
    }
  }
  const value = {
    addChat,
    addMessage,
    addPost,
    addComment,
    getUserInfo,
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default Data
