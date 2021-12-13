import tw from "twrnc"
import { getColor } from "tailwind-rn"
import f from "../utils/poppins"
const screenOptions = {
  tabBarStyle: [{}, tw`shadow-2xl shadow-blue-900  bg-purple-50`],
  tabBarActiveTintColor: "white",
  tabBarItemStyle: {
    fontSize: "bold",
  },
  tabBarIndicatorStyle: {
    backgroundColor: getColor("purple-700"),
    height: 4,
  },
  tabBarLabelStyle: [{ fontSize: 15 }, tw`font-bold text-black`],
}
export default screenOptions
