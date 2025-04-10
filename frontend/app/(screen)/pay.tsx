import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Pay() {
  const [address, setAddress] = useState('');

  const handleInputChange = (text: string) => {
    setAddress(text);
  };

  return (
    <View className="flex-1 justify-start p-4">
      <Text className="text-2xl mb-5">Adress</Text>

      {/* ช่องกรอกที่อยู่ */}
      <TextInput
        className="border-2 border-gray-300 p-4 rounded-xl text-lg mb-4"
        placeholder="กรอกที่อยู่ของคุณ"
        value={address}
        onChangeText={handleInputChange}
      />

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity
        className="bg-[#85BEFF] py-3 px-6 rounded-xl"
        onPress={() => alert(`ที่อยู่: ${address}`)}
      >
        <Text className="text-black text-lg">confirmm</Text>
      </TouchableOpacity>
    </View>
  );
}
