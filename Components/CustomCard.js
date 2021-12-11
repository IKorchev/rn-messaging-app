import { Feather } from "@expo/vector-icons"
import { serverTimestamp } from "@firebase/firestore"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native"
import { Image, Text, Input, Overlay, Avatar, Divider } from "react-native-elements"
import { getColor } from "tailwind-rn"
import tw from "twrnc"
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
      flatlistRef.current.scrollToIndex({ index: comments.length - 1, animated: true })
      addComment(id, object)
      setComment("")
    }
  }

  useLayoutEffect(() => {}, [])
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

      <Overlay
        overlayStyle={tw`w-96 h-[500px]`}
        visible={visible}
        animationType='slide'
        onBackdropPress={() => setVisible(false)}>
        <Feather
          name='x'
          style={tw`absolute top-2 right-2`}
          size={30}
          onPress={() => setVisible(false)}
        />
        <Text style={tw`py-2 w-32`}>Comments</Text>
        <FlatList
          ref={flatlistRef}
          data={comments}
          ItemSeparatorComponent={() => (
            <Divider color={getColor("gray-300")} width={2} />
          )}
          initialScrollIndex={comments.length - 1}
          inverted // last comments appear at the top
          renderItem={({ item }) => (
            <View style={tw`flex-row bg-gray-100 overflow-hidden p-2`}>
              <UserAvatar uid={item.createdBy} />
              <Text numberOfLines={5}>{item.text}</Text>
            </View>
          )}
        />
        <Input
          onChangeText={setComment}
          style={tw``}
          value={comment}
          onSubmitEditing={addCommentHandler}
          rightIcon={<Feather name='send' onPress={addCommentHandler} size={15} />}
        />
      </Overlay>
    </KeyboardAvoidingView>
  )
}

export default CustomCard
