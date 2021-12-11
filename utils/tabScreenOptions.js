import tw from "twrnc"
import { getColor } from "tailwind-rn"
const screenOptions = {
  tabBarStyle: [{}, tw`shadow-lg bg-purple-700`],
  tabBarActiveTintColor: "white",
  tabBarItemStyle: {
    fontSize: "bold",
  },
  tabBarIndicatorStyle: {
    backgroundColor: getColor("red-800"),
    height: 4,
  },
  tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
}
export default screenOptions
