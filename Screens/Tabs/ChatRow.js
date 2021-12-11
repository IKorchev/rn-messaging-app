import React, { useLayoutEffect, useState } from "react"
import { ListItem } from "react-native-elements"
import Blockies from "../../utils/blockies"
import { Entypo } from "@expo/vector-icons"
import tw from "twrnc"
import { collection, limit, onSnapshot, orderBy, query } from "@firebase/firestore"
import { db } from "../../firebase"

const ChatRow = ({ item, navigation }) => {
  const [lastMessage, setLastMessage] = useState("")
  useLayoutEffect(() => {
    const ref = collection(db, "chats", item.item.id, "messages")
    const q = query(ref, orderBy("createdAt", "desc"), limit(1))
    const unsub = onSnapshot(q, (snap) => {
      if (snap) {
        const messages = snap.docs.map((el) => el?.data()?.message)
        setLastMessage(messages[0])
      }
    })
    return unsub
  }, [])

  return (
    <ListItem
      style={tw`mt-0.5`}
      onPress={() =>
        navigation.navigate("Chat", {
          id: item.item.id,
          name: item.item.name,
          createdBy: item.item.createdBy,
        })
      }>
      <Blockies
        blockies={item.item.id} //string content to generate icon
        size={180} // blocky icon size
        style={tw`w-12 h-12`}
      />
      <ListItem.Content>
        <ListItem.Title style={tw`font-bold text-black`}>{item.item.name}</ListItem.Title>
        <ListItem.Subtitle style={tw`mt-2`}>
          {lastMessage || "Say hello!"}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Entypo size={20} name='chevron-right' />
    </ListItem>
  )
}

export default ChatRow
