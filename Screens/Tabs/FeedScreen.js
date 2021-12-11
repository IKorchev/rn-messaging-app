import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { Avatar, Text, Card } from "react-native-elements"
import { getColor } from "tailwind-rn"

import tw from "twrnc"

import CreatePost from "../../Components/CreatePost"
import CustomCard from "../../Components/CustomCard"
import GradientButton from "../../Components/GradientButton"
import { db } from "../../firebase"
import { useAuth } from "../../Providers/Auth"
import { useData } from "../../Providers/Data"
const FeedScreen = ({ navigation }) => {
  const { user } = useAuth()
  const { getUserInfo } = useData()
  const [posts, setPosts] = useState([])
  const ref = collection(db, "posts")
  const q = query(ref, orderBy("createdAt", "desc"))
  const [visible, setVisible] = useState(false)
  const toggleOverlay = () => {
    setVisible(!visible)
  }
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

  return (
    <View style={tw`flex-1 bg-white`}>
      <View
        style={tw`flex-row items-center justify-between bg-white p-1 mx-5 rounded-full shadow-xl my-2`}>
        <Avatar
          containerStyle={tw`border border-black`}
          onPress={async () => console.log(await getUserInfo(user.uid))}
          source={{ uri: user.photoURL }}
          size={50}
          rounded
        />
        <GradientButton
          title='Create post'
          iconName='plus-square'
          buttonStyles={tw`rounded-full`}
          titleStyles={tw`ml-2`}
          colors={[getColor("red-500"), getColor("purple-600")]}
          onPress={toggleOverlay}
        />
      </View>
      <CreatePost visible={visible} toggleVisible={toggleOverlay} />
      <FlatList
        data={posts}
        contentContainerStyle={tw`px-5 `}
        keyExtractor={(el, i) => i}
        renderItem={({ item }) => {
          return (
            <CustomCard
              id={item.id}
              likes={item.likes}
              imageUrl={item.image_url}
              text={item.text}
              createdBy={item.createdBy}
              comments={item.comments}
            />
          )
        }}
      />
    </View>
  )
}

export default FeedScreen
