import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useRouter } from "expo-router";

const profile = () => {
  const route = useRouter();
  const handlePress = () => {
    //@ts-ignore
    route.push("/");
  };
  return (
    <View className="relative flex-1 items-center justify-center">
      <View className="absolute top-0 left-0 w-full h-[109] bg-[#FEACA6]" >
        <TouchableOpacity className="flex-1 items-start justify-center ml-5 mt-10 mb-3" onPress={() => route.back()}>
          <Text >
            <AntDesign name="arrowleft" size={40} color="black" /> <Text className="text-4xl font-bold">Profile</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-start mt-40 w-full  ">
        <View className="flex-1 flex-row items-start w-full  justify-center mb-5  ml-20">
          <Image
            source={require("../../assets/images/backgroundindex.png")}
            className=" w-44 h-44 rounded-full mr-11 items-center"
            resizeMode="cover"
          />

          <View className="flex flex-col items-start justify-center mt-4 ">
            
          </View>
        </View>

        <View className="absolute top-64 gap-10 left-0 w-full items-center" >
          <View>
            <TouchableOpacity
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full items-center justify-center"
              onPress={() => route.push("/(screen)/profile")}
            >
              <Text className="text-xl font-bold text-black">📸 Profile</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full items-center justify-center"
              onPress={handlePress}
            >
              <Text className="text-xl font-bold text-black">❤️ Favorite</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full items-center justify-center"
              onPress={handlePress}
            >
              <Text className="text-xl font-bold text-black">🛒 Shopping Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

        
      </View>
    </View>
  );
};

export default profile;
