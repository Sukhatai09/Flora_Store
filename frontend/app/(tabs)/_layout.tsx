import { Tabs, usePathname, Redirect } from "expo-router";
import TabBar from "../components/TabBar";

const TabsLayout = () => {

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