import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { Button } from "react-native-elements"
import { getColor } from "tailwind-rn"
import tw from "twrnc"

const GradientButton = (props) => {
  const {
    iconName,
    title,
    colors,
    textColor,
    iconPosition,
    buttonStyles,
    containerStyles,
    titleStyles,
  } = props
  return (
    <Button
      {...props}
      ViewComponent={LinearGradient}
      linearGradientProps={{
        colors: colors || [getColor("purple-600"), getColor("red-400")],
        start: {
          x: 1,
          y: 0,
        },
      }}
      icon={() => {
        return <Feather name={iconName} color={textColor || "white"} size={30} />
      }}
      iconPosition={iconPosition || "left"}
      titleStyle={[tw`text-${textColor || "white"}`, titleStyles]}
      containerStyle={[tw`w-48`, containerStyles]}
      buttonStyle={[tw`bg-purple-500 rounded-lg `, buttonStyles]}
      title={title}
    />
  )
}

export default GradientButton
