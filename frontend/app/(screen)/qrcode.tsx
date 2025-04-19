import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Topbar from "../components/topbar";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import Constants from "expo-constants";
import axios from "axios";

export default function PaymentQRScreen() {
  const API_URL = Constants.expoConfig?.extra?.API_URL;
  const { totalAmount, order_id } = useLocalSearchParams();
  const router = useRouter();
  const handleConfirm =  async() => {


  try{
    const respone = await axios.put(`${API_URL}/order/${order_id}`, {
      status: "completed"
    })
    if(respone.status === 200) {
      Alert.alert("ยืนยันการชำระเงินเรียบร้อยแล้ว");
      router.push("/(tabs)/homepage");
    }
  }catch(error){

}

Alert.alert("ยืนยันการชำระเงินเรียบร้อยแล้ว");
  // router.push("/(screen)/done");
};

  return (
    <View className="flex-1 bg-white">
      <Topbar />

      <View className="px-6 pt-6  ">
        <View className="flex-row items-center gap-36 mb-10">
            <Text className="text-2xl font-bold ">ยอดเงินทั้งหมด</Text>
            <Text className="text-xl ">฿{totalAmount}</Text>
        </View>
      
        <Text className="text-3xl font-bold text-center text-gray-700">
           สแกน QR เพื่อชำระเงิน
        </Text>

        <View className="items-center mt-10 mb-6 p-5 bg-gray-100 rounded-2xl">
          <Image
            source={require("../../assets/images/qr.jpg")}
            className="w-80 h-96"
            resizeMode="contain"
          />
        </View>

        <Text className="text-center text-base text-gray-500 mb-6">
          กรุณาสแกน QR ด้านบนผ่านแอปธนาคารของคุณ
        </Text>

        <TouchableOpacity
          onPress={handleConfirm}
          className="bg-blue-300 py-3 rounded-full mx-20 shadow-md"
        >
          <Text className="text-center text-gray-900 font-semibold text-lg">
            ยืนยันการชำระเงิน
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
