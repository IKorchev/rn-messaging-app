import React, { useEffect, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"

import { Alert, Text, View } from "react-native"
import { Avatar, Input, Button } from "react-native-elements"
import tw from "twrnc"
import { Feather } from "@expo/vector-icons"
import { getColor } from "tailwind-rn"
import { useAuth } from "../Providers/Auth"
import { getDocumentAsync } from "expo-document-picker"
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from "@firebase/auth"

const ProfileScreen = ({ navigation }) => {
  const { user, logOut } = useAuth()
  const storage = getStorage()
  const [displayName, setDisplayName] = useState(user?.displayName)
  const [image, setImage] = useState(user.photoURL)

  const handleSave = async () => {
    if (!image && displayName.trim() !== "") {
      updateProfile(user, {
        displayName: displayName,
      })
        .then(() => Alert.alert("Success", "Profile updated!"))
        .catch((error) => {
          console.log(imageUrl)
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
          source={{ uri: image }}
        />
        <Feather
          name='edit'
          size={20}
          onPress={async () => {
            const result = await getDocumentAsync({ type: "image/*" })
            const item = await fetch(result?.uri)
            const blob = await item.blob()
            const storageRef = ref(storage, `${user.uid}/images/avatar`)
            const snapshot = await uploadBytes(storageRef, blob)
            const imageUrl = await getDownloadURL(storageRef)

            updateProfile(user, {
              photoURL: imageUrl,
            })
              .then(() => {
                Alert.alert("Success", "Profile Image updated!", [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.replace("Profile")
                    },
                  },
                ])
              })
              .catch((error) => {
                Alert.alert("Ooops", error.message)
              })
          }}
        />
      </View>
      <View style={tw`w-full px-12 mt-12 `}>
        <View
          style={tw`bg-purple-900 px-5 rounded-lg shadow-2xl justify-center justify-center py-3`}>
          <Text style={tw`text-lg text-white`}>Name:</Text>
          <Input
            onChangeText={setDisplayName}
            containerStyle={tw`px-0`}
            inputStyle={tw`text-white`}
            value={displayName}
          />
          <Button
            title='Save changes'
            containerStyle={tw``}
            buttonStyle={tw`bg-purple-100`}
            titleStyle={tw`text-black`}
            onPress={() => handleSave()}
          />
        </View>
        <View
          style={tw`bg-purple-900 px-5 rounded-lg shadow-2xl justify-center justify-center mt-5 py-3`}>
          <Text style={tw`text-lg text-white`}>Email:</Text>
          <Text style={tw`text-lg text-white`}>{user.email}</Text>
        </View>
      </View>

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
