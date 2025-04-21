import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useRouter } from "expo-router";
import { useAuthStore } from "../../store/flora_store";
import Contants from "expo-constants";
import { UserInfo } from "../types//userProfile";

import axios from "axios";
const API_URL = Contants.expoConfig?.extra?.API_URL;

const user = () => {
  const route = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const customer = useAuthStore((state) => state.customer);
  const refresh = useAuthStore((state) => state.refresh);
  const [profile, setProfile] = useState<UserInfo>();
  const imageUri = `${API_URL?.replace(/\/api$/, "").replace(
    /\/$/,
    ""
  )}/${profile?.image_url?.replace(/^(\.\/)/, "").replace(/\\/g, "/")}`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${customer?.customer_id}`);
        setProfile(res.data.data);
      } catch (err: any) {
        console.error(err.message);
        console.error(err.response.data.message);
      }
    };
    fetchProfile();
  }, [profile]);

  // useEffect(() => {
  //   const fetchCustomerData = async () => {
  //     await refresh();
  //     console.log(customer)
  //   }
  //   fetchCustomerData();

  // }
  // ,[])

  // console.log(imageUri)
  // useEffect(() => {
  //   const fetchCustomerData = async () => {
  //     if (customer) {
  //       await refresh(`${customer?.customer_id}`);
  //     }
  //   };
  //   fetchCustomerData();
  // }
  // ,[])

  const handlePress = () => {
    logout();
    route.push("/");
  };
  return (
    <View className="relative flex-1 items-center justify-center">
      <View className="absolute top-0 left-0 w-full h-[109] bg-[#FEACA6]">
        <TouchableOpacity
          className="flex-1 items-start justify-center ml-5 mt-10"
          onPress={() => route.back()}
        >
          <Text>
            <AntDesign name="arrowleft" size={40} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-start mt-40 w-full  ">
        <View className="flex-1 flex-row items-start w-full  justify-start mb-5 px-12">
          <Image
            source={{
              uri: imageUri
                ? `${imageUri}`
                : "https://media.istockphoto.com/id/1278459951/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%95%E0%B8%B9%E0%B8%99%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81.jpg?s=170667a&w=0&k=20&c=1snRE0T583NOiDWDPwR0OttWcHLZxE5hWeZ8ysvIJ4U=",
            }}
            className=" w-32 h-32 rounded-full mr-11"
            resizeMode="cover"
          />

          <View className="flex flex-col items-start justify-center mt-4 ">
            <View>
              <Text className="text-3xl font-bold ">
                {profile?.first_name} {profile?.last_name}
              </Text>
            </View>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                onPress={() =>
                  route.push({
                    pathname: "/(screen)/editProfile",
                    params: { customer_id: `${customer?.customer_id}` },
                  })
                }
              >
                <Text>
                  Edit Profile{" "}
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="absolute top-64 gap-10 left-0 w-full itemsx-center">
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
              onPress={() => route.push("/(screen)/favorite")}
            >
              <Text className="text-xl font-bold text-black">❤️ Favorite</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              className="bg-[#FFCFDA] w-[300px] h-[50px] rounded-full items-center justify-center"
              onPress={() => route.push("/(screen)/carts")}
            >
              <Text className="text-xl font-bold text-black">
                🛒 Shopping Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className=" absolute top-[560] gap-4 left-0 w-full items-center">
          <TouchableOpacity
            className="bg-[#B4D4F9] w-[200px] h-[50px] rounded-full items-center justify-center"
            onPress={handlePress}
          >
            <Text className="text-xl font-bold text-black">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default user;