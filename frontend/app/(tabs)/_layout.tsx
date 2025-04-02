import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false, title: "Home" }} />
      <Tabs.Screen name="allproduct" options={{ headerShown: false, title: "Product" }} />
      <Tabs.Screen name="user" options={{ headerShown: false, title: "profile" }} />
    </Tabs>
  );
}
