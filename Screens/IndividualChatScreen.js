import { Ionicons } from "@expo/vector-icons"
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore"
import React, { useEffect, useState, useRef } from "react"
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native"
import { Input, Chip } from "react-native-elements"
import tw from "twrnc"
import { db } from "../firebase"
import { useAuth } from "../Providers/Auth"
const IndividualChatScreen = ({ route }) => {
  const scrollView = useRef()
  const [message, setMessage] = useState("")
  const { addMessage, user } = useAuth()
  const [messages, setMessages] = useState([])
  useEffect(() => {
    scrollView?.current?.scrollToEnd({ animated: false })
    const ref = collection(db, "chats", route.params.id, "messages")
    const q = query(ref, orderBy("createdAt", "asc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot) {
        const docData = snapshot.docs.map((el) => ({
          id: el.id,
          ...el.data(),
        }))
        setMessages(docData)
        scrollView?.current?.scrollToEnd({ animated: false })
      }
    })

    return unsubscribe
  }, [])
  return (
    <View style={tw`bg-purple-100 flex-1`}>
      <ScrollView // TODO: Fix scroll when keyboard opens
        style={tw`flex-1 justify-flex-end `}
        ref={scrollView}
        onContentSizeChange={() => scrollView?.current?.scrollToEnd({ animated: false })}>
        {messages.map((el) => {
          const isSender = el.uid === user.uid
          return (
            <Chip
              ViewComponent={KeyboardAvoidingView}
              key={el.id}
              containerStyle={tw`my-3 px-5`}
              buttonStyle={tw` ${
                !isSender ? "bg-blue-500 ml-auto" : "bg-purple-400 mr-auto"
              }`}
              title={el.message}
            />
          )
        })}
      </ScrollView>

      <View style={tw`absolute bottom-0 left-0 bg-white w-full`}>
        <View style={tw`flex-row mr-12 items-center`}>
          <Input
            inputContainerStyle={tw`px-2 flex-1`}
            inputStyle={tw`text-xl`}
            onChangeText={setMessage}
            onSubmitEditing={() => {
              addMessage(message, route.params.id)
              setMessage("")
            }}
            placeholder='Message'
            value={message}
          />
          <TouchableOpacity style={tw`items-center justify-center w-12`}>
            <Ionicons
              name='send'
              onPress={() => {
                addMessage(message, route.params.id)
                setMessage("")
              }}
              size={20}
              ITS
              SO
              GOOD
              Kreygasm
              ITS
              SO
              GOOD
              Kreygasm
              color='black'
              style={tw``}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`h-18`} />
    </View>
  )
}

export default IndividualChatScreen
