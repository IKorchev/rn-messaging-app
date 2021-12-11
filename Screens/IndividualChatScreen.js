import React, { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat"
import { collection, onSnapshot, query, orderBy, getDoc, doc } from "@firebase/firestore"
import tw from "twrnc"
import { db } from "../firebase"
import { useAuth } from "../Providers/Auth"
import { getColor } from "tailwind-rn"
import { useData } from "../Providers/Data"
import { Avatar, Text } from "react-native-elements"
import { Feather } from "@expo/vector-icons"
const IndividualChatScreen = ({ route }) => {
  const [message, setMessage] = useState("")
  const { user } = useAuth()
  const { addMessage } = useData()
  const [messages, setMessages] = useState([])
  const [chatCreator, setChatCreator] = useState(null)

  useEffect(() => {
    const getDocument = async () => {
      const userDocRef = doc(db, "users", route.params.createdBy)
      const userDocSnap = await getDoc(userDocRef)
      setChatCreator(userDocSnap.data())
    }
    const ref = collection(db, "chats", route.params.id, "messages")
    getDocument()
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
      <View
        style={tw`bg-purple-800 py-1 flex-row justify-between items-center px-5 mt-1 shadow-lg rounded-full mx-1`}>
        <Text style={tw`text-lg font-bold text-white `}>{route.params.name}</Text>
        <View>
          <Text style={tw`text-white mr-2 text-center mb-2`}>Creator</Text>
          <View style={tw`flex-row items-center`}>
            <Avatar
              rounded
              avatarStyle={tw`border border-white`}
              source={{ uri: chatCreator?.photoURL }}
              size='small'
            />
            <View>
              <Text style={tw`text-sm ml-3 font-bold  text-white `}>
                {chatCreator?.displayName.split(" ")[0]}
              </Text>
              <Text style={tw`text-sm ml-3 font-bold  text-white `}>
                {chatCreator?.displayName.split(" ")[1]}
              </Text>
              {chatCreator?.phoneNumber && (
                <Text style={tw`text-sm ml-3 font-bold  text-white `}>
                  {chatCreator?.phoneNumber || ""}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <GiftedChat
        messagesContainerStyle={[{ backgroundColor: "#fff" }, tw`bg-white pb-5 px-5`]}
        messages={messages}
        onInputTextChanged={(el) => setMessage(el)}
        textInputStyle={tw`text-black ml-5`}
        onSend={(el) => addMessage(message, route.params.id)}
        user={{
          _id: user.uid,
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={tw`bg-gray-100 shadow-md mb-2 rounded-full mx-5 p-1`}
          />
        )}
        renderSend={(props) => (
          <TouchableOpacity
            style={tw`justify-center items-center h-12 w-12 rounded-full bg-white`}
            {...props}>
            <Feather name='send' size={20} color={getColor("blue-900")} />
          </TouchableOpacity>
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
