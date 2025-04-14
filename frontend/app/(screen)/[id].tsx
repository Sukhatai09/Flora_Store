import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Topbar from "../components/topbar";
import axios from "axios";
import Contants from "expo-constants";

type Flower = {
  flower_id: string;
  name: string;
  price: number;
  description: string;
  stock_quantity: number;
  image_url: string;
};

const API_URL = Contants.expoConfig?.extra?.API_URL;
const details = () => {
  const [image, setImage] = useState("");
  const [data, setData] = useState<Flower>();
  const [quantity, setQuantity] = useState(1);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/flower/${id}`);
        setData(response.data.data[0]); // <<==== แก้ตรงนี้
        console.log(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  const imageUri = `${API_URL?.replace(/\/api$/, "").replace(
    /\/$/,
    ""
  )}/${data?.image_url.replace(/^(\.\/)/, "").replace(/\\/g, "/")}`;
  console.log(imageUri);

  if (quantity > 5) {
    alert("You can only add up to 5 items to the cart.");
    setQuantity(5);
  }
  return (
    <View>
      <Topbar />
      <View className="py-1 px-4 bg-[#f7bfc6c8] rounded-b-[60] mb-7 ">
        <Image
          source={{ uri: `${imageUri}` }}
          className="w-full h-[300px] object-cover"
          resizeMode="contain"
        />
      </View>
      <View className="px-4">
        <View>
          <View>
            <Text className=" text-center text-3xl font-bold text-black">
              {data?.name}
            </Text>
          </View>
          <View className="flex-row justify-between mt-4">
            <Text className="text-2xl font-bold text-black">
              {" "}
              ฿{data?.price}
            </Text>
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="bg-[#DCB1F6] px-3 py-1 rounded-full"
              >
                <MaterialCommunityIcons name="minus" size={18} color="black" />
              </TouchableOpacity>
              <Text className="mx-4 text-lg">{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                className="bg-[#DCB1F6] px-3 py-1 rounded-full"
              >
                <MaterialCommunityIcons name="plus" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          className="my-10 bg-[#ffdce0] p-4 rounded-2xl h-[250]"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text className="font-bold text-xl">
            {data?.description}
          </Text>
        </ScrollView>
      </View>
      <View className=" px-4 absolute bottom-[-30] w-full">
        <TouchableOpacity className="bg-[#967BB6] w-full h-[50px] rounded-full items-center justify-center">
          <Text className="text-xl font-bold text-white">Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default details;
