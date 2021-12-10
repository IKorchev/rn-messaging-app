import React, { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"

import { Alert, Text, View } from "react-native"
import { Avatar, Icon, Input, Button } from "react-native-elements"
import tw from "twrnc"
import { Feather } from "@expo/vector-icons"
import { getColor } from "tailwind-rn"
import { useAuth } from "../Providers/Auth"
import * as DocumentPicker from "expo-document-picker"
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from "@firebase/auth"
import { collection, getDocs, query, where } from "@firebase/firestore"
import { db } from "../firebase"

const ProfileScreen = () => {
  const { user, logOut } = useAuth()
  const storage = getStorage()
  const [displayName, setDisplayName] = useState(user.displayName)
  const [image, setImage] = useState(null)
  const [docIds, setDocIds] = useState([])

  const handleSave = async () => {
    if (!image && displayName.trim() !== "") {
      updateProfile(user, {
        displayName: displayName,
      })
        .then(() => Alert.alert("Success", "Profile updated!"))
        .catch((error) => Alert.alert("Ooops", error.message))
    }
    if (image && displayName.trim() !== "") {
      const storageRef = ref(storage, `${user.uid}/images/avatar`)
      const snapshot = await uploadBytes(storageRef, image)
      const imageUrl = await getDownloadURL(storageRef)

      updateProfile(user, {
        displayName: displayName,
        photoURL: imageUrl,
      })
        .then(() => {
          Alert.alert("Success", "Your profile has been updated!")
        })
        .catch((error) => {
          Alert.alert("Ooops", error.message)
        })
    }
  }
  return (
    <LinearGradient
      style={tw`flex-1 items-center pt-5`}
      colors={[getColor("purple-600"), getColor("purple-900")]}>
      <View style={tw`flex-row ml-6`}>
        <Avatar
          containerStyle={tw`border border-white`}
          size={100}
          rounded
          source={{ uri: user?.photoURL }}
        />
        <Feather
          name='edit'
          size={20}
          onPress={async () => {
            const result = await DocumentPicker.getDocumentAsync({ type: "image/*" })
            const item = await fetch(result.uri)
            const blob = await item.blob()
            setImage(blob)
          }}
        />
      </View>
      <View style={tw`w-full px-12 mt-12`}>
        <Text style={tw`text-lg text-white`}>Display Name:</Text>
        <View style={tw`flex-row  `}>
          <Input
            onChangeText={setDisplayName}
            containerStyle={tw`px-0 border-0`}
            inputStyle={tw`text-white`}
            value={displayName}
          />
        </View>
        <View style={tw`w-full mt-1`}>
          <Text style={tw`text-lg text-white`}>Email:</Text>
          <Text style={tw`text-lg text-white`}>{user.email}</Text>
        </View>
      </View>

      <Button
        title='Save changes'
        containerStyle={tw`mt-12`}
        buttonStyle={tw`bg-purple-100`}
        titleStyle={tw`text-black`}
        onPress={() => handleSave()}
      />
      <Button
        title='Sign out'
        containerStyle={tw`mt-12`}
        buttonStyle={tw`bg-purple-100`}
        titleStyle={tw`text-black`}
        onPress={logOut}
      />
    </LinearGradient>
  )
}

export default ProfileScreen
