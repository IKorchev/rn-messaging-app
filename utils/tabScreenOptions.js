import { getColor } from "tailwind-rn"
const screenOptions = {
  tabBarStyle: { backgroundColor: getColor("green-800") },
  tabBarActiveTintColor: "white",
  tabBarItemStyle: {
    fontSize: "bold",
  },
  tabBarIndicatorStyle: {
    backgroundColor: getColor("green-500"),
    height: 4,
  },
  tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
}
export default screenOptions
