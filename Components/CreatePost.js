import React, { useState } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Input, Image, Overlay } from "react-native-elements"
import { Feather } from "@expo/vector-icons"
import { getDocumentAsync } from "expo-document-picker"
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage"
import { deleteObject, ref } from "@firebase/storage"
import { useAuth } from "../Providers/Auth"
import { getColor } from "tailwind-rn"
import GradientButton from "./GradientButton"
import { useData } from "../Providers/Data"
import tw from "twrnc"

const CreatePost = ({ visible, toggleVisible }) => {
  const storage = getStorage()
  const { user } = useAuth()
  const { addPost } = useData()
  const [image, setImage] = useState()
  const [imageUrl, setImageUrl] = useState(null)
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
  const addPostHandler = async () => {
    if (!imageUrl) {
      Alert.alert("Oops", "Add an image")
      return
    }
    const postObject = {
      image_url: imageUrl,
      text: text,
    }
    addPost(postObject)
    setImageUrl(null)
    setText("")
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
    <View>
      <Overlay
        overlayStyle={tw`py-5 rounded-xl`}
        isVisible={visible}
        backdropStyle={tw`bg-[rgba(0,0,0,0.86)]`}
        onBackdropPress={toggleVisible}>
        {!imageUrl ? (
          <TouchableOpacity
            onPress={imageUploadHandler}
            style={tw`flex-row bg-gray-900 w-full w-92 shadow-lg h-12 items-center justify-center rounded-xl`}>
            <Feather name='image' color='white' size={25} />
            <Text style={tw`text-white text-lg font-bold ml-2`}>Choose an image</Text>
          </TouchableOpacity>
        ) : (
          <View style={tw`relative`}>
            <Image
              resizeMode='cover'
              source={{ uri: imageUrl }}
              style={tw`h-60 w-92 rounded-lg`}
            />
            <TouchableOpacity
              onPress={removeImageHandler}
              style={tw`absolute top-0 right-0 h-10 w-10 m-2 bg-purple-100 items-center rounded-full justify-center`}>
              <Feather name='x' size={30} color={getColor("purple-900")} />
            </TouchableOpacity>
          </View>
        )}
        <Input
          containerStyle={tw`bg-gray-200 rounded-xl w-92 px-5 my-2`}
          inputContainerStyle={[{ borderBottomWidth: 0 }, tw`py-0 my-0`]}
          inputStyle={tw`py-0 my-0`}
          multiline={true}
          maxLength={150}
          placeholder='Enter text'
          onChangeText={setText}
          value={text}
        />
        <GradientButton
          onPress={addPostHandler}
          colors={[getColor("purple-500"), getColor("red-500")]}
          title='POST'
          titleStyles={tw`text-white text-xl`}
          containerStyles={tw`shadow-2xl shadow-purple-900 mx-auto`}
          buttonStyles={tw`bg-purple-800 rounded-full py-1`}
        />
      </Overlay>
    </View>
  )
}

export default CreatePost
