import React, {  useState } from "react"
import { View,  Image, TouchableOpacity } from "react-native"
import { AntDesign, Feather } from "@expo/vector-icons"
import tw from "twrnc"

const images = [
  "https://images.pexels.com/photos/10348578/pexels-photo-10348578.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/10391174/pexels-photo-10391174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
]

const StoriesScreen = () => {
  const [index, setIndex] = useState(0)

  return (
    <View>
      <Image
        style={tw`h-full`}
        source={{
          uri: images[index],
        }}
      />
      <Feather
        name='play'
        color='white'
        size={40}
        style={tw`absolute top-1/2 left-1/2 -ml-5 -mt-5 `}
      />
      <View
        style={tw`absolute bottom-3 h-48 bg-opacity-50 justify-around items-center right-5 bg-green-900 px-3 rounded-full`}>
        <TouchableOpacity>
          <Feather name='send' size={25} color='white' />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name='message1' size={25} color='white' />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name='hearto' size={25} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StoriesScreen
