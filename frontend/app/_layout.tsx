import { Stack } from "expo-router";

export default function Layout() {
  // const pathname = usePathname();
  // const showNavbar = pathname !== "/";

  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
  </Stack>;
}
