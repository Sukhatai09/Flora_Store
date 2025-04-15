import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface Product {
  id: string;
  name: string;
  price: string;
  image: any; // Using 'any' for the require statement, but you might want to be more specific
}

const ProductFav = ({ products }: { products: Product[] }) => {
  return (
    <View className="flex-row flex-wrap gap-4 mt-4 px-2">
      {products.map((item, index) => {
        let imageUri;

        if (typeof item.image === 'string') {
          imageUri = `${API_URL?.replace(/\/api$/, "").replace(/\/$/, "")}/${item.image
            .replace(/^(\.\/)/, '')
            .replace(/\\/g, '/')}`;
        }

        return (
          <TouchableOpacity
            key={index}
            className="bg-[#DDCDF7] items-center w-[120px] h-[150px] py-4 relative"
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} className="w-24 h-[65%] object-cover" />
            ) : (
              <Image source={item.image} className="w-24 h-[65%] object-cover" />
            )}

            <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4">
              <Text className="font-bold text-sm">{item.name}</Text>
              <Text className="text-sm">{item.price}</Text>
            </View>

            <TouchableOpacity style={{ position: 'absolute', top: 4, right: 2 }}>
              <MaterialCommunityIcons
                name="cards-heart"
                size={25}
                color="red"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProductFav;
