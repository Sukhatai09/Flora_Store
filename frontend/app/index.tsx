import { Image, TextInput, View, Text,TouchableOpacity } from "react-native";
import { Link, useRouter,Redirect  } from "expo-router";
import "./global.css";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/flora_store";


export default function Index() {
  const route = useRouter();
  const refresh = useAuthStore((state) => state.refresh);
  const checkLoginStatus = useAuthStore((state) => state.checkLoginStatus);
  const customer = useAuthStore((state) => state.customer);
  const  login  = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  checkLoginStatus();
  if (customer) {
    return <Redirect href="/(tabs)/homepage" />;
  }
  

  const handlePress = async() => {
    try {
      await login(email, password);
      route.push("/(tabs)/allproduct");
    } catch (error) {
      console.error("Login error:", error);
    }
    
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
          <TextInput value={email} onChangeText={(text) => setEmail(text)}
            className="bg-white w-[300px] h-[50px] rounded-full pl-4"

            placeholder="username"
            placeholderTextColor="#000000"
          />
          </View>

          <View>
          <Text className="text-2xl  font-Prompt">Password :</Text>
          <TextInput value={password} onChangeText={(text) => setPassword(text)}
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
             Don’t have an account ?. <Link className="text-blue-500 " href={'/register'}>Sign Up</Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
