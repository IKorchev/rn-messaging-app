import React, { useState } from "react"
import { FlatList, View, Text, ScrollView, ImageBackground } from "react-native"
import { Avatar } from "react-native-elements"
import { getColor } from "tailwind-rn"
import tw from "twrnc"
import CreatePost from "../../Components/CreatePost"
import CustomCard from "../../Components/CustomCard"
import GradientButton from "../../Components/GradientButton"
import { useAuth } from "../../Providers/Auth"
import { useData } from "../../Providers/Data"
import { usePostData } from "../../Providers/Post"
import f from "../../utils/poppins"
const FeedScreen = () => {
  const { user } = useAuth()
  const { posts } = usePostData()
  const { allUsers } = useData()
  const [visible, setVisible] = useState(false)
  const toggleOverlay = () => {
    setVisible(!visible)
  }

  return (
    <ScrollView nestedScrollEnabled={true} style={tw`flex-1 bg-white`}>
      <View
        style={tw`flex-row items-center justify-between bg-white p-1 mx-5 rounded-full shadow-xl my-2`}>
        <Avatar
          containerStyle={tw`border border-black`}
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
        contentContainerStyle={tw`bg-gray-100 px-3 h-32 items-center min-w-full`}
        data={allUsers}
        scrollEnabled={true}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            item.id !== user.uid && (
              <ImageBackground
                source={{ uri: item.photoURL }}
                style={tw`w-24 h-30 mx-1 rounded-lg overflow-hidden`}>
                <View
                  style={tw`bg-[rgba(0,0,0,0.5)] h-full w-full items-center justify-end`}>
                  <Text
                    style={[f.poppins_bold, tw`text-center text-white`]}
                    numberOfLines={2}>
                    {item.displayName}
                  </Text>
                </View>
              </ImageBackground>
            )
          )
        }}
      />
      <FlatList
        data={posts}
        contentContainerStyle={tw`px-5 mt-5 `}
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
    </ScrollView>
  )
}

export default FeedScreen
