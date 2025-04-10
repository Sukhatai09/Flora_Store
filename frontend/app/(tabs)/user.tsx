import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const user = () => {
  return (
    <View className="relative flex-1 items-center justify-center">
      <View className="absolute top-0 left-0 w-full h-[109] bg-[#FEACA6]" />
      <View>
        <View>
          <Image source={require("../../assets/images/backgroundindex.png")} className=" w-60 h-60 rounded-full"
          resizeMode="cover" />

          
          <View className="flex flex-col items-center justify-center mt-4">
            <View ><Text>Name</Text></View>
            <View className="flex justify-center items-center"><Text>Edit Profile <MaterialIcons name="keyboard-arrow-right" size={24} color="black" /></Text></View>
          </View>
        </View>

        <View>
          <View>pro</View>
          <View>fav</View>
          <View>cart</View>
        </View>

        <View>
          <TouchableOpacity>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default user;
