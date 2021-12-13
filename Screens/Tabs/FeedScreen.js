import React, { useState } from "react"
import { FlatList, View } from "react-native"
import { Avatar } from "react-native-elements"
import { getColor } from "tailwind-rn"
import tw from "twrnc"
import CreatePost from "../../Components/CreatePost"
import CustomCard from "../../Components/CustomCard"
import GradientButton from "../../Components/GradientButton"
import { useAuth } from "../../Providers/Auth"
import { useData } from "../../Providers/Data"
import { usePostData } from "../../Providers/Post"

const FeedScreen = () => {
  const { user } = useAuth()
  const { getUserInfo } = useData()
  const { posts } = usePostData()
  const [visible, setVisible] = useState(false)
  const toggleOverlay = () => {
    setVisible(!visible)
  }

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
              likedBy={item.likedBy}
              id={item.id}
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
