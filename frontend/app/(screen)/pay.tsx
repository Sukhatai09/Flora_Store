import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Topbar from "../components/topbar";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import Constants from "expo-constants";
import { useAuthStore } from "@/store/flora_store";

export default function Pay() {
  const API_URL = Constants.expoConfig?.extra?.API_URL;
  const { cart } = useLocalSearchParams();
  const cartItems = cart ? JSON.parse(decodeURIComponent(cart as string)) : [];
  const customer = useAuthStore((state) => state.customer);
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const router = useRouter();

  

  const handleNext = async () => {

    try{
     const response = await axios.post(`${API_URL}/order`, {
        customer_id:  customer?.customer_id, 
        total_amount: totalPrice,
        status: "pending", 
        shipping_address: address,
        payment_method: "qrCode", 
      });
      
      if (response.status === 201) {
        const order_id = response.data.order_id
        const orderItems = await Promise.all(cartItems.map(async (item: any) => {
          const respone = await axios.post(`${API_URL}/orderItem`, {
            order_id: order_id,
            flower_id: item.flower_id,
            quantity: item.quantity,
          });
          return respone.data;
        }));


        const totalAmount = cartItems.reduce(
          (sum: number, item: any) => sum + item.price * item.quantity,
          0
        );
  
        router.push(`/qrcode?totalAmount=${totalAmount}&order_id=${order_id}`);
    }
  }catch(err){
      console.error(err);
    
  }
  




  // const totalAmount = cartItems.reduce(
  //   (sum: number, item: any) => sum + item.price * item.quantity,
  //   0
  // );
  
  // router.push(`/qrcode?totalAmount=${totalAmount}`);

    
   
  
  
  
  
    // const totalAmount = cartItems.reduce(
    //   (sum: number, item: any) => sum + item.price * item.quantity,
    //   0
    // );
    
    // router.push(`/qrcode?totalAmount=${totalAmount}`);
  };
    
  
  

  const totalPrice = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <View className="flex-1 pb-24">
      <Topbar />
        <ScrollView className="px-4 pb-10">
      <Text className="text-[35px] font-medium text-gray-800 ml-4 mt-10 mb-2">
        Address
      </Text>

      <View className="mx-4 mb-6 bg-[#f9f9f9] rounded-2xl p-4 shadow-sm">
        <TextInput
          className="text-base text-gray-800"
          multiline
          value={address}
          onChangeText={setAddress}
          returnKeyType="done"
          placeholder="กรอกที่อยู่"
          placeholderTextColor="#9ca3af"
          blurOnSubmit={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>


      {/* Summary */}
      <View>
        <Text className="text-[35px] ml-4 font-medium mt-6">Summary</Text>
        {cartItems.map((item: any, index: number) => (
          <View key={index} className="border border-[#c6d3e9] rounded-xl bg-[#e7ddf6] p-4 mx-4 mt-4">
            <Text className="text-lg font-semibold text-black mb-2">{item.name}</Text>
            <Image
              source={{ uri: item.image_url }}
              style={{ width: 100, height: 100, borderRadius: 10, marginBottom: 10 }}
            />
            <View className="flex-row justify-between mb-1">
              <Text className="text-base text-gray-800">ราคา:</Text>
              <Text className="text-base text-gray-800">{item.price} บาท</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-base text-gray-800">จำนวน:</Text>
              <Text className="text-base text-gray-800">{item.quantity} ชิ้น</Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-base font-semibold text-black">รวม:</Text>
              <Text className="text-base font-semibold text-black">
                ฿{item.price * item.quantity}
              </Text>
            </View>
          </View>
        ))}
        <View className="flex-row justify-between px-6 mt-4">
          <Text className="text-xl font-bold">รวมทั้งหมด:</Text>
          <Text className="text-xl font-bold">฿{totalPrice}</Text>
        </View>
      </View>

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity
        className={`py-3 px-6 rounded-3xl mt-7 mx-28 ${address.trim() ? 'bg-[#85BEFF]' : 'bg-gray-300'}`}
        onPress={handleNext}
        disabled={!address.trim()}
      >
        <Text className="text-black text-lg text-center">Confirm</Text>
      </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
