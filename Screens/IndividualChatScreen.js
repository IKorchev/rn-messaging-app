import React, { useEffect, useState, useRef } from "react"
import { View } from "react-native"
import { Bubble, GiftedChat } from "react-native-gifted-chat"
import { collection, onSnapshot, query, orderBy, getDoc } from "@firebase/firestore"
import tw from "twrnc"
import { db } from "../firebase"
import { useAuth } from "../Providers/Auth"
import { getColor } from "tailwind-rn"

const IndividualChatScreen = ({ route }) => {
  const [message, setMessage] = useState("")
  const { addMessage, user } = useAuth()
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
    <View style={tw`bg-purple-100 flex-1`}>
      <GiftedChat
        messagesContainerStyle={{ backgroundColor: "#fff" }}
        messages={messages}
        onInputTextChanged={(el) => setMessage(el)}
        onSend={(el) => addMessage(message, route.params.id)}
        user={{
          _id: user.uid,
        }}
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
