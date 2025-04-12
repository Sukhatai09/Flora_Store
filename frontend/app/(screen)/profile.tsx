import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useRouter } from "expo-router";
import {useAuthStore} from "../../store/flora_store";
import Contants from 'expo-constants';


const API_URL = Contants.expoConfig?.extra?.API_URL ;

const profile = () => {
  const route = useRouter();
  const user = useAuthStore((state) => state.customer);

  const imageUri = `${API_URL?.replace(/\/api$/, "")}/${user?.image_url?.replace(/\\/g, '/')}`;
  
  
  const handlePress = () => {
    //@ts-ignore
    route.push("/");
  };
  const bockData = 
    {  name:`${user?.first_name} ${user?.last_name}`, email: user?.email,phone: user?.phone_number, image:user?.image_url}
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
            source={{
              uri: user?.image_url
          ? `${imageUri}`
          : "https://media.istockphoto.com/id/1278459951/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%95%E0%B8%B9%E0%B8%99%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81.jpg?s=170667a&w=0&k=20&c=1snRE0T583NOiDWDPwR0OttWcHLZxE5hWeZ8ysvIJ4U="
            }}
            className=" w-44 h-44 rounded-full mr-11 items-center"
            resizeMode="cover"
          />

          <View className="flex flex-col items-start justify-center mt-4 ">
            
          </View>
        </View>

        <View className="absolute top-64 gap-10 left-0 w-full items-center" >
          <View>
          <Text className="text-2xl  font-Prompt">Name :</Text>
            <View
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full items-center justify-center"
              
            >
              <Text className="text-xl font-bold text-black">{bockData.name}</Text>
            </View>
          </View>

          <View>
          <Text className="text-xl  font-Prompt ">Email :</Text>
            <View
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full items-center justify-center"
              
            >
              <Text className="text-xl font-bold text-black">{bockData.email}</Text>
            </View>
          </View>

          <View>
          <Text className="text-2xl  font-Prompt">Phone :</Text>
            <View
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full items-center justify-center"
              
            >
              <Text className="text-xl font-bold text-black">{bockData.phone}</Text>
            </View>
          </View>
        </View>

        
      </View>
    </View>
  );
};

export default profile;
