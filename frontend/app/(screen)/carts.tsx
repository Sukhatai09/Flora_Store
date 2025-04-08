import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Topbar from '../components/topbar';
const route = useRouter();

  const handlePress = () => {
    //@ts-ignore
    route.push('/payment');
  }

export default function FlowersScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Topbar />
     <Text>cart</Text>

     <Link href="/payment" className=" bg-yellow-500 p-4 rounded-full ">
        <Text> 
          pay
        </Text>
      </Link>
    </View>

    
  );
}
