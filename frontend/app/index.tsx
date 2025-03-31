import { Link } from "expo-router";
import { Image, TouchableOpacity, View ,Text} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {

  const route = useRouter();

  const handlePress = () => {
    //@ts-ignore
    route.push('/(tabs)');
  }
  return (
    <View className="flex-1 items-center justify-center relative">
      <Image
        source={require("../assets/images/backgroundindex.png")}
        className="w-full h-full absolute top-0 left-0"
        resizeMode="cover"
      />
      <TouchableOpacity onPress={handlePress} className="bg-white p-4 rounded-full">
        <Text>
          Cream
        </Text>
      </TouchableOpacity>
    </View>
  );
}
