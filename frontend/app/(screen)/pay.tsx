import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";


export default function Pay() {
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  const handleInputChange = (text: string) => {
    setAddress(text);
  };

  const handleDateConfirm = (event: any, selectedDate?: Date) => {
    if (selectedDate) setDateOfBirth(selectedDate);
    // setShowDatePicker(false);
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

<View className="p-2">
          <Text className="font-PromptMedium text-2xl ml-2 mb-4">
            วัน/เดือน/ปีเกิด
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <View className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl">
              <Text className="text-2xl font-PromptMedium">
                {dateOfBirth.toLocaleDateString("th-TH", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="spinner"
              onChange={handleDateConfirm}
            />
          )}
        </View>

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity
        className="bg-[#85BEFF] py-3 px-6 rounded-xl"
        onPress={() => alert(`ที่อยู่: ${address}`)}
      >
        <Text className="text-black text-lg">confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
