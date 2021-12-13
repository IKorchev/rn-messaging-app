import React, { useEffect, useLayoutEffect, useState } from "react"
import { Avatar, Tooltip } from "react-native-elements"
import { useData } from "../Providers/Data"
import tw from "twrnc"
import { Text, View } from "react-native"
const UserAvatar = ({ uid, size, name }) => {
  const { getUserInfo } = useData()
  const [userInfo, setUserInfo] = useState()

  //get user info
  useEffect(async () => {
    setUserInfo(await getUserInfo(uid))
  }, [uid])

  return (
    <View style={tw`flex-row items-center`}>
      <Avatar
        size={size || 30}
        rounded
        containerStyle={tw`mr-2 border border-black`}
        source={{
          uri: userInfo?.photoURL,
        }}
      />
      {name && <Text style={tw`text-sm font-bold`}>{userInfo?.displayName}</Text>}
    </View>
  )
}

export default UserAvatar
