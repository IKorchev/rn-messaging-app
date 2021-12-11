import React, { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat"
import { collection, onSnapshot, query, orderBy, getDoc, doc } from "@firebase/firestore"
import tw from "twrnc"
import { db } from "../firebase"
import { useAuth } from "../Providers/Auth"
import { getColor } from "tailwind-rn"
import { useData } from "../Providers/Data"
import { Text } from "react-native-elements"
import GradientButton from "../Components/GradientButton"

const IndividualChatScreen = ({ route }) => {
  const [message, setMessage] = useState("")
  const { user } = useAuth()
  const { addMessage } = useData()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const ref = collection(db, "chats", route.params.id, "messages")
    const q = query(ref, orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot) {
        if (!snapshot.metadata.hasPendingWrites) {
          const docData = snapshot.docs.map((el) => {
            const obj = el.data()
            return {
              _id: el.id,
              createdAt: obj.createdAt.toDate(),
              user: obj.userInfo,
              text: obj.message,
            }
          })
          setMessages(docData)
        }
      }
    })

    return unsubscribe
  }, [])

  return (
    <View style={tw`bg-white flex-1`}>
      <GiftedChat
        messagesContainerStyle={[{ backgroundColor: "#fff" }, tw`bg-white pb-5 px-5`]}
        messages={messages}
        onInputTextChanged={(el) => setMessage(el)}
        textInputStyle={tw`text-black ml-5`}
        user={{
          _id: user.uid,
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={tw`bg-gray-100 shadow-md mb-2 rounded-full mx-3 p-1`}
          />
        )}
        renderSend={(props) => (
          <GradientButton
            title='Send'
            containerStyles={tw`mt-0 w-24 my-auto p-0 shadow-none`}
            buttonStyles={tw`rounded-full p-0 h-12`}
            titleStyles={tw`ml-0 text-lg`}
            colors={[getColor("red-500"), getColor("purple-600")]}
            onPress={() => addMessage(message, route.params.id)}
          />
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: getColor("purple-900"),
                marginBottom: 20,
              },
              left: {
                flexDirection: "row",
                backgroundColor: getColor("purple-100"),
                color: "#fff",
                marginBottom: 5,
              },
            }}
          />
        )}
      />
    </View>
  )
}

export default IndividualChatScreen
