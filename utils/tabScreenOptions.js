import tw from "twrnc"
import { getColor } from "tailwind-rn"
const screenOptions = {
  tabBarStyle: [{}, tw`shadow-2xl shadow-blue-900  bg-purple-500`],
  tabBarActiveTintColor: "white",
  tabBarItemStyle: {
    fontSize: "bold",
  },
  tabBarIndicatorStyle: {
    backgroundColor: getColor("yellow-100"),
    height: 4,
  },
  tabBarLabelStyle: [{ fontSize: 15 }, tw`font-bold`],
}
export default screenOptions
