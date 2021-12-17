import { Feather } from "@expo/vector-icons"
import React from "react"
import { View, Text, FlatList } from "react-native"
import { BottomSheet, Input } from "react-native-elements"
import tw from "twrnc"
const CustomBottomSheet = ({
  visible,
  setVisible,
  data,
  flatlistRef,
  renderItem,
  setComment,
  comment,
  title,
  addCommentHandler,
  inverted = true,
}) => {
  return (
    <BottomSheet
      isVisible={visible}
      containerStyle={tw`bg-[rgba(0,0,0,0.5)]`}
      animationType='slide'>
      <View style={tw`bg-white rounded-xl max-h-96 py-1 min-h-[200px]`}>
        <Text style={tw`py-3 text-lg text-center`}>{title}</Text>
        <Feather
          name='x'
          style={tw`absolute top-2 right-2`}
          size={30}
          onPress={() => setVisible(false)}
        />
        <FlatList
          ref={flatlistRef}
          data={data}
          ListEmptyComponent={
            <View style={tw`flex-1 items-center justify-center`}>
              <Text style={tw`text-center`}>
                {title === "Comments" ? "No comments yet" : "No likes yet"}
              </Text>
            </View>
          }
          initialScrollIndex={data.length - 1}
          inverted={inverted} // last comments appear at the top
          renderItem={renderItem}
        />

        {title === "Comments" && (
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
        )}
      </View>
    </BottomSheet>
  )
}

export default CustomBottomSheet
