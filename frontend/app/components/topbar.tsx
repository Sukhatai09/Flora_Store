import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Link } from "expo-router";

const Topbar = () => {
  return (
    <View className="w-full  bg-[#FEACA6] flex-row justify-end items-center pr-7 pt-10 ">
      <SafeAreaView>
        <View className="flex-row gap-5 mb-3">
          <Link href="/(screen)/favorite" className="flex items-center  justify-center">
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={30}
              color="white"
            />
          </Link>

          <Link href="/carts" className="flex items-center justify-center">
            <Feather name="shopping-cart" size={30} color="white" />
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Topbar;
