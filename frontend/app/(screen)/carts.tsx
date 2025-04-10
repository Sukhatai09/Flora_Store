import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Topbar from '../components/topbar';

export default function FlowersScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/(screen)/pay');
  };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <Text>cart</Text>

      <TouchableOpacity onPress={handlePress} style={{ backgroundColor: '#facc15', padding: 16, borderRadius: 999 }}>
        <Text>pay</Text>
      </TouchableOpacity>
    </View>
  );
}
