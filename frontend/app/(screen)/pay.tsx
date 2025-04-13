import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Topbar from "../components/topbar";
import { useRouter } from "expo-router";

export default function Pay() {
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const router = useRouter();
  const handleNext = () => {
    router.push('/(screen)/qrcode');
  };

  const handleInputChange = (text: string) => {
    setAddress(text);
  };

  const handleDateConfirm = (event: any, selectedDate?: Date) => {
    if (selectedDate) setDateOfBirth(selectedDate);
    setShowDatePicker(false);
  };

  const handleTimeConfirm = (event: any, selectedTime?: Date) => {
    if (selectedTime) setDateOfBirth(selectedTime); // อัปเดตเวลา
    setShowTimePicker(false);
  };

  return (
    <View className="flex-1 ">
      <Topbar />
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

      {/* เลือกวันที่ */}
      <View className="p-2">
        <Text className="font-PromptMedium text-2xl ml-2 mb-2 mt-1">
          วันที่
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
          themeVariant="light" 
          textColor="#1F2937" 
        />
        
        )}
      </View>

      {/* เลือกเวลา */}
      <View className="p-2">
        <Text className="font-PromptMedium text-2xl ml-2 mb-2 mt-6">เวลา</Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          activeOpacity={0.7}
        >
          <View className="border-4 border-secondary pt-5 pb-3 px-5 rounded-xl">
            <Text className="text-2xl font-PromptMedium">
              {dateOfBirth.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="time"
            display="spinner"
            onChange={handleTimeConfirm}
            themeVariant="light" 
            textColor="#1F2937"
          />
        )}
      </View>

      <View>
        <Text className="text-[35px] ml-4 font-medium mt-6">Summary</Text>
        <View className="border border-[#c6d3e9] rounded-xl bg-[#e7ddf6] p-4 mx-4 mt-6">
          <Text className="text-lg font-semibold text-black mb-2">
            Rose bouquet
          </Text>

          <View className="flex-row justify-between mb-1">
            <Text className="text-base text-gray-800">ราคา:</Text>
            <Text className="text-base text-gray-800">3,000 บาท</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-base text-gray-800">จำนวน:</Text>
            <Text className="text-base text-gray-800">2 ชิ้น</Text>
          </View>

          <View className="flex-row justify-between border-t border-gray-300 pt-2 mt-2">
            <Text className="text-base font-semibold text-black">
              รวมทั้งหมด:
            </Text>
            <Text className="text-base font-semibold text-black">฿6,000</Text>
          </View>
        </View>
      </View>

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity
        className="bg-[#85BEFF] py-3 px-6 rounded-3xl mt-7 mx-28"
        onPress={handleNext}
      >
        <Text className="text-black text-lg text-center">Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
