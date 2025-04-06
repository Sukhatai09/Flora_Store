import { View } from 'react-native';
import { Slot, usePathname } from 'expo-router';
import Topbar from './components/topbar';
import Buttonbar from './components/buttonbar';


export default function Layout() {
  const pathname = usePathname();
  const showNavbar = pathname !== '/';

  return (
    <View className="flex-1 ">
      {showNavbar && <Topbar />}
      <View className="flex-1">
        <Slot />
      </View>
      {showNavbar && <Buttonbar />}
    </View>
  );
}
