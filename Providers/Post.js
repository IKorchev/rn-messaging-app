import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import React, { createContext, useContext, useEffect, useState } from "react"
import { Alert } from "react-native"
import { db } from "../firebase"
import { useAuth } from "./Auth"

const PostContext = createContext({})
export const usePostData = () => {
  return useContext(PostContext)
}

const PostContextProvider = ({ children }) => {
  const { user } = useAuth()
  const [likedPosts, setLikedPosts] = useState([])
  const [posts, setPosts] = useState([])
  const ref = collection(db, "posts")
  const q = query(ref, orderBy("createdAt", "desc"))

  useEffect(
    () =>
      onSnapshot(q, (el) => {
        if (el) {
          const docs = el.docs.map((el) => ({ ...el.data(), id: el.id }))
          setPosts(docs)
        }
      }),
    []
  )
  useEffect(() => {
    if (user) {
      const postsRef = collection(db, "posts")
      const q = query(postsRef, where("likedBy", "array-contains", user.uid))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const arr = snapshot.docs.map((el) => el.id)
        setLikedPosts(arr)
      })
      return unsubscribe
    }
  }, [user, db])

  const addPost = async (postObject) => {
    if (!postObject) {
      Alert.alert("Ooops", "Something went wrong. Please try again!")
      return
    }
    try {
      const dbObject = {
        ...postObject,
        likedBy: [],
        comments: [],
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      }
      const postsRef = collection(db, "posts")
      const res = await addDoc(postsRef, dbObject)
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
    } catch (error) {
      console.log(error)
    }
  }

  const likePost = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId)
      const result = await updateDoc(postRef, {
        likedBy: arrayUnion(user.uid),
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  const unlikePost = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId)
      const result = await updateDoc(postRef, {
        likedBy: arrayRemove(user.uid),
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const isPostLiked = (postId) => {
    return likedPosts.includes(postId)
  }

  const value = {
    posts,
    addPost,
    isPostLiked,
    unlikePost,
    likePost,
    addComment,
  }
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

export default PostContextProvider
