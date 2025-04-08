import {
  Image,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import "./global.css";

export default function Register() {
  const route = useRouter();

  const handlePress = () => {
    //@ts-ignore
    route.push("/allproduct");
  };
  return (
    <ScrollView className="bg-[#FAEBC3] ">
      <View className="flex-1 items-center justify-center relative ">
        <Image
          source={require("../assets/images/backgroundindex.png")}
          className="w-full h-full absolute top-0 left-0"
          resizeMode="cover"
        />
        <FlatList className="mt-[600]"
          data={[
            { key: "Name :", placeholder: "username" },
            { key: "Email :", placeholder: "email", secureTextEntry: true },
            { key: "Password :", placeholder: "password", secureTextEntry: true },
            { key: "Confirm Password :", placeholder: "confirm password", secureTextEntry: true },
            { key: "Phone Number:", placeholder: "phone number" },
          ]}
          renderItem={({ item }) => (
            <View className="mb-4">
              <Text className="text-2xl font-Prompt">{item.key}</Text>
              <TextInput
          className="bg-white w-[300px] h-[50px] rounded-full pl-4 mt-2"
          placeholder={item.placeholder}
          secureTextEntry={item.secureTextEntry || false}
          placeholderTextColor="#000000"
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <View>
          <TouchableOpacity
            className="bg-[#FF85A1] w-[300px] h-[50px] rounded-full items-center justify-center"
            onPress={handlePress}
          >
            <Text className="text-xl font-bold text-white">Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mb-60"></View>
    </ScrollView>
  );
}
