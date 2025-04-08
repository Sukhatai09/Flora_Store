import { Stack, usePathname } from "expo-router";
import { useMemo } from "react";

export default function Layout() {
  const pathname = usePathname();
  
  const showNavbar = useMemo(() => pathname !== "/", [pathname]);

  return <Stack screenOptions={{ headerShown: !showNavbar }}>
    <Stack.Screen name="index" />
  </Stack>;
}
