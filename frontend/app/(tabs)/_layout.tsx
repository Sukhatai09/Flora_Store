import { Stack, Tabs } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
      <Stack.Screen name="allproduct" options={{ headerShown: false, title: "Product" }} />
      <Stack.Screen name="user" options={{ headerShown: false, title: "profile" }} />
    </Stack>
  );
}
