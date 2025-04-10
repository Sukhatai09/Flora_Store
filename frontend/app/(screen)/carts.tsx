import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Topbar from '../components/topbar';
const route = useRouter();

 

export default function FlowersScreen() {
  const handlePress = () => {
    //@ts-ignore
    route.push('/payment');
  }
  return (
    <View style={{ flex: 1 }}>
      <Topbar />
     <Text>cart</Text>

     <TouchableOpacity onPress={handlePress} className=" bg-yellow-500 p-4 rounded-full ">
        <Text> 
          pay
        </Text>
      </TouchableOpacity>
    </View>

    
  );
}
