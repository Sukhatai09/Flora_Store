import { Image, TextInput, View, Text,TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import "./global.css";

export default function Index() {
  const route = useRouter();

  const handlePress = () => {
    //@ts-ignore
    route.push("/allproduct");
  };
  return (
    <View className="flex-1 items-center justify-center relative">
      <Image
        source={require("../assets/images/backgroundindex.png")}
        className="w-full h-full absolute top-0 left-0"
        resizeMode="cover"
      />
      <View className="mt-96">
        <View className="mb-14 gap-5">
          <View>
          <Text className="text-2xl  font-Prompt">Email :</Text>
          <TextInput 
            className="bg-white w-[300px] h-[50px] rounded-full pl-4"

            placeholder="username"
            placeholderTextColor="#000000"
          />
          </View>

          <View>
          <Text className="text-2xl  font-Prompt">Password :</Text>
          <TextInput 
            className="bg-white w-[300px] h-[50px] rounded-full pl-4 mt-2"
            placeholder="password"
            secureTextEntry={true}
            placeholderTextColor="#000000"
          />
          </View>
          
        </View>
        <View>
          <TouchableOpacity className="bg-[#FF85A1] w-[300px] h-[50px] rounded-full items-center justify-center" onPress={handlePress}>
            <Text className="text-xl font-bold text-white">
              Login
            </Text>
          </TouchableOpacity>
          <Text className="mt-4 text-lg font-bold text-[#000000] text-center">
             Don’t have an account ?. <Link className="text-blue-500 " href={'/'}>Sign Up</Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
