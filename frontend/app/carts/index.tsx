import { View, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';

const route = useRouter();

  const handlePress = () => {
    //@ts-ignore
    route.push('/paymennt');
  }

export default function FlowersScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
     <Text>cart</Text>

     <Link href="/paymennt" className=" bg-yellow-500 p-4 rounded-full ">
        <Text> 
          pay
        </Text>
      </Link>
    </View>

    
  );
}
