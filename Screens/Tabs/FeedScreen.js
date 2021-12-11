import React, { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { Text, Input, Button, Image } from "react-native-elements"
import { Feather } from "@expo/vector-icons"
import { getDocumentAsync } from "expo-document-picker"
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage"
import { deleteObject, ref } from "@firebase/storage"
import tw from "twrnc"
import { useAuth } from "../../Providers/Auth"
import { db } from "../../firebase"
import { addDoc, collection, serverTimestamp } from "@firebase/firestore"

const FeedScreen = () => {
  const { user } = useAuth()
  const [image, setImage] = useState()
  const storage = getStorage()
  const [imageUrl, setImageUrl] = useState()
  const [text, setText] = useState("")

  const imageUploadHandler = async () => {
    try {
      const result = await getDocumentAsync({ type: "image/*" })
      const storageRef = ref(storage, `${user.uid}/posts/${result.name}`)
      const item = await fetch(result.uri)
      const blob = await item.blob()
      setImage(result)
      const snapshot = await uploadBytes(storageRef, blob)
      const imageUrl = await getDownloadURL(storageRef)
      setImageUrl(imageUrl)
    } catch (error) {
      console.log(error.message)
    }
  }
  const addPostHandler = async (postObject) => {
    try {
      if (imageUrl) {
        const postObject = {
          image_url: imageUrl,
          text: text,
          likes: 0,
          comments: [],
          createdBy: user.uid,
          createdAt: serverTimestamp(),
        }
        const postsRef = collection(db, "posts")
        const res = await addDoc(postsRef, postObject)
        setImageUrl(null)
        setText("")
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const removeImageHandler = async () => {
    try {
      const storageRef = ref(storage, `${user.uid}/posts/${image.name}`)
      const deletedObject = await deleteObject(storageRef)
      setImage(null)
      setImageUrl(null)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <View style={tw`flex-1 bg-purple-50`}>
      <View style={tw`mt-5 p-3 bg-white items-center mx-2 shadow-lg`}>
        {!imageUrl ? (
          <TouchableOpacity
            onPress={imageUploadHandler}
            style={tw`flex-row bg-gray-100 w-48 shadow-lg mb-5 h-10 items-center justify-evenly rounded-full`}>
            <Text style={tw`text-black font-bold`}>Choose an image</Text>
            <Feather name='image' color='black' size={25} />
          </TouchableOpacity>
        ) : (
          <View style={tw`relative`}>
            <Image source={{ uri: imageUrl }} style={tw`h-48 w-48`} />
            <TouchableOpacity
              onPress={removeImageHandler}
              style={tw`absolute top-0 right-0 h-10 w-10 m-1 bg-white items-center rounded-full justify-center`}>
              <Feather name='x' size={30} />
            </TouchableOpacity>
          </View>
        )}
        <Input
          multiline={true}
          maxLength={150}
          placeholder='Text'
          onChangeText={setText}
          value={text}
        />
        <Button
          onPress={addPostHandler}
          title='Post'
          disabled={imageUrl ? false : true}
          buttonStyle={tw`bg-black w-24`}
        />
      </View>
      <Text style={tw`text-center mt-5`} h4>
        What others are doing
      </Text>
    </View>
  )
}

export default FeedScreen
