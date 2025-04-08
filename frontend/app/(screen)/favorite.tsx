import { View, Text } from 'react-native';
import Topbar from '../components/topbar';


export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Topbar /> */}
      <Topbar />
      <Text>หน้าถูกใจ</Text>
    </View>
  );
}