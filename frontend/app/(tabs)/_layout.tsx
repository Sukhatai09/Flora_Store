import { Tabs, usePathname, Redirect } from "expo-router";
import TabBar from "../components/TabBar";
import { useAuthStore } from "@/store/flora_store";

const TabsLayout = () => {
  const user = useAuthStore((state) => state.customer);
  if (!user) {
    return <Redirect href="/" />;
  }
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="homepage" />
      <Tabs.Screen name="allproduct" />
      <Tabs.Screen name="user" />
    </Tabs>
  );
};

export default TabsLayout;