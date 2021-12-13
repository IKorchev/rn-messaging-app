import { Feather, Ionicons } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native"
import { Image, Text, Input, Divider, BottomSheet } from "react-native-elements"
import { getColor } from "tailwind-rn"
import tw from "twrnc"
import f from "../utils/poppins"
import { useAuth } from "../Providers/Auth"
import UserAvatar from "./UserAvatar"
import { usePostData } from "../Providers/Post"
import CustomBottomSheet from "./CustomBottomSheet"

const CustomCard = ({ imageUrl, text, createdBy, likedBy, comments, id }) => {
  const { user } = useAuth()
  const { addComment, likePost, isPostLiked, unlikePost } = usePostData()
  const flatlistRef = useRef()
  const [commentsSheetVisible, setCommentsSheetVisible] = useState(false)
  const [likesSheetVisible, setLikesSheetVisible] = useState(false)
  const [comment, setComment] = useState("")
  const liked = isPostLiked(id)

  const createLikesString = (num) => {
    return num === 0 ? "0 likes" : num === 1 ? "1 like" : num > 1 && `${num} likes`
  }
  const likesString = createLikesString(likedBy?.length)

  const addCommentHandler = () => {
    if (comment.trim().length > 0) {
      const object = {
        text: comment,
        createdBy: user.uid,
      }
      addComment(id, object)
      setComment("")
    }
  }

  return (
    <KeyboardAvoidingView style={tw`bg-white shadow-xl mb-5 rounded-xl overflow-hidden`}>
      <Image
        source={{ uri: imageUrl }}
        style={tw`h-72 `}
        resizeMode='cover'
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={tw`py-1`}>
        <View style={tw`flex-row items-center justify-between px-3 mb-1`}>
          <View>
            <UserAvatar uid={createdBy} name={true} />
          </View>
          <View style={tw`flex-row`}>
            <Text onPress={() => setLikesSheetVisible(true)} style={tw` font-bold mr-2`}>
              {likesString}
            </Text>
            <Ionicons
              onPress={() => {
                !liked ? likePost(id) : unlikePost(id)
              }}
              name={`${liked ? "heart" : "heart-outline"}`}
              size={20}
              style={tw`mr-3`}
            />
            <Feather name='message-circle' size={20} style={tw`mr-3`} />
            <Feather name='share' size={20} />
          </View>
        </View>
        <Divider orientation='horizontal' color={getColor("purple-100")} width={1} />
        <View style={tw`p-2`}>
          <Text>{text}</Text>
          <TouchableOpacity onPress={() => setCommentsSheetVisible(true)}>
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

      {/* BOTTOM SHEET FOR COMMENTS  */}

      <CustomBottomSheet
        visible={commentsSheetVisible}
        setVisible={setCommentsSheetVisible}
        addCommentHandler={addCommentHandler}
        setComment={setComment}
        comment={comment}
        title='Comments'
        data={comments}
        flatlistRef={flatlistRef}
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

      {/* BOTTOM SHEET FOR LIKES  */}
      <CustomBottomSheet
        visible={likesSheetVisible}
        setVisible={setLikesSheetVisible}
        title='Liked by'
        inverted={false}
        data={likedBy}
        flatlistRef={flatlistRef}
        renderItem={({ item }) => (
          <View
            style={tw`flex-row bg-gray-100 items-start  mx-2 overflow-hidden px-2 py-1 rounded-sm mb-0.5`}>
            <UserAvatar uid={item} name={true} />
          </View>
        )}
      />
    </KeyboardAvoidingView>
  )
}

export default CustomCard
