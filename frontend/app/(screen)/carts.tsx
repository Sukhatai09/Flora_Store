import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Topbar from '../components/topbar';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FlowersScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handlePress = () => {
    router.push('/(screen)/pay');
  };

  const handleDelete = () => {
    alert("ลบสินค้าออกจากตะกร้าแล้ว");
  };

  return (
    <View className="flex-1 bg-white">
      <Topbar />
      <Text className="text-[35px] mb-4 px-4 mt-10">Shopping Cart</Text>

      {/* กล่อง */}
      <View className="flex-row bg-[#FDEBED] rounded-xl mx-4 p-4 items-center relative">
        {/* รูปสินค้า */}
        <View className="w-24 h-24  bg-[#DDCDF7] ">
        <Image
          source= {require('../../assets/images/flower1.png')}
          className="w-24 h-24 rounded-lg"
        />
        </View>

        {/* เนื้อหาด้านขวา */}
        <View className="flex-1 ml-4">
          <Text className="text-[16px] font-semibold text-black">Rose bouquet</Text>
          <Text className="text-[15px] text-black mt-1 ">ราคา: 3000 บาท</Text>

          {/* ปุ่ม + - */}
          <View className="flex-row items-center mt-2">
            <TouchableOpacity
              onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}
              className="bg-[#DCB1F6] px-3 py-1 rounded-full"
            >
              <MaterialCommunityIcons name="minus" size={18} color="black" />
            </TouchableOpacity>
            <Text className="mx-4 text-lg">{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(prev => prev + 1)}
              className="bg-[#DCB1F6] px-3 py-1 rounded-full"
            >
              <MaterialCommunityIcons name="plus" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ถังขยะ มุมขวาบน */}
        <TouchableOpacity
          onPress={handleDelete}
          className="absolute top-2 right-2"
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="#f87171"
          />
        </TouchableOpacity>
      </View>

      {/* ปุ่มชำระเงิน */}
      <TouchableOpacity
        onPress={handlePress}
        className="bg-[#85BEFF] mt-10 mx-28 py-3 rounded-3xl"
      >
        <Text className="text-center text-lg font-medium">Check out</Text>
      </TouchableOpacity>
    </View>
  );
}
