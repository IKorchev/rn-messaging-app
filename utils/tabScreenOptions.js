
import { getColor } from "tailwind-rn"
const screenOptions = {
  tabBarStyle: { backgroundColor: getColor("purple-600") },
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
