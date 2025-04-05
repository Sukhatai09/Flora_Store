import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import { View } from "react-native";

export default function RootLayout() {
  useFonts({
    prompt: require("../assets/fonts/Prompt-Light.ttf"),
    "prompt-bold": require("..//assets/fonts/Prompt-Bold.ttf"),
    "prompt-regular": require("../assets/fonts/Prompt-Medium.ttf"),
  });
  return (
    <View className="flex-1">
 
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
