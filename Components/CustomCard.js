import { Feather } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import { FlatList, KeyboardAvoidingView, TouchableOpacity, View } from "react-native"
import { Image, Text, Input, Divider, BottomSheet } from "react-native-elements"
import { getColor } from "tailwind-rn"
import tw from "twrnc"
import f from "../utils/poppins"
import { useAuth } from "../Providers/Auth"
import { useData } from "../Providers/Data"
import UserAvatar from "./UserAvatar"
const CustomCard = ({ imageUrl, text, createdBy, likes, comments, id }) => {
  const { user } = useAuth()
  const { addComment } = useData()
  const flatlistRef = useRef()
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState("")
  const addCommentHandler = () => {
    if (comment.trim().length > 0) {
      const object = {
        text: comment,
        createdBy: user.uid,
      }
      addComment(id, object)
      setComment("")
      setVisible(false)
    }
  }

  return (
    <KeyboardAvoidingView style={tw`bg-white shadow-xl mb-5 rounded-xl overflow-hidden`}>
      <Image source={{ uri: imageUrl }} style={tw`h-72 `} resizeMode='cover' />
      <View style={tw`py-1`}>
        <View style={tw`flex-row items-center justify-between px-3 mb-1`}>
          <View>
            <UserAvatar uid={createdBy} name={true} />
          </View>
          <View style={tw`flex-row`}>
            <Text style={tw` font-bold mr-2`}>{likes} likes</Text>
            <Feather name='heart' size={20} style={tw`mr-3`} />
            <Feather name='message-circle' size={20} style={tw`mr-3`} />
            <Feather name='share' size={20} />
          </View>
        </View>
        <Divider orientation='horizontal' color={getColor("purple-100")} width={1} />
        <View style={tw`p-2`}>
          <Text>{text}</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={tw`font-bold my-2`}>See all comments</Text>
          </TouchableOpacity>
          <Input
            onChangeText={setComment}
            value={comment}
            containerStyle={tw`border border-gray-200 pb-0 rounded-md h-10`}
            placeholder='comment'
            onSubmitEditing={addCommentHandler}
            inputStyle={tw`text-sm`}
            inputContainerStyle={[{ borderBottomWidth: 0 }, tw`h-3 mt-3`]}
            rightIcon={
              <Feather
                name='send'
                size={20}
                style={tw`mt-1`}
                onPress={addCommentHandler}
              />
            }
          />
        </View>
      </View>

      {
        // OVERLAY
      }

      <BottomSheet
        isVisible={visible}
        containerStyle={tw`bg-[rgba(0,0,0,0.5)]`}
        animationType='slide'>
        <View style={tw`bg-white rounded-xl max-h-[400px] min-h-[300px]`}>
          <Text style={tw`py-3 text-lg text-center`}>Comments</Text>
          <Feather
            name='x'
            style={tw`absolute top-2 right-2`}
            size={30}
            onPress={() => setVisible(false)}
          />
          <FlatList
            ref={flatlistRef}
            data={comments}
            initialScrollIndex={comments.length - 1}
            inverted // last comments appear at the top
            renderItem={({ item }) => (
              <View
                style={tw`flex-row bg-gray-100 items-start mx-2 overflow-hidden px-2 py-1 rounded-sm mb-0.5`}>
                <UserAvatar uid={item.createdBy} />
                <View
                  style={tw`border border-gray-200  bg-white justify-center min-h-12 w-82 rounded-lg`}>
                  <Text numberOfLines={5} style={[f.poppins, tw`ml-2`]}>
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
          />

          <Input
            onChangeText={setComment}
            style={tw``}
            value={comment}
            inputContainerStyle={[
              { borderBottomWidth: 0 },
              tw`-mb-5 bg-gray-200 rounded-full`,
            ]}
            inputStyle={tw`px-5`}
            onSubmitEditing={addCommentHandler}
            rightIcon={
              <Feather
                name='send'
                onPress={addCommentHandler}
                size={25}
                color='blue'
                style={tw`bg-gray-100 p-2 px-8 rounded-full`}
              />
            }
          />
        </View>
      </BottomSheet>
    </KeyboardAvoidingView>
  )
}

export default CustomCard
