import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface ProductFavProps {
  products: Product[];
  likedItems: string[];
  deleteFlowerLike: (flower_id: string) => void;
}

const ProductFav = ({ products, likedItems, deleteFlowerLike }: ProductFavProps) => {
  const router = useRouter();

  return (
    <View className="flex-row flex-wrap gap-6 mt-4 py-4  ">
      {products.slice(0, 3).map((item, index) => {
        const imageUri = `${API_URL?.replace(/\/api$/, '').replace(/\/$/, '')}/${item.image
          .replace(/^(\.\/)/, '')
          .replace(/\\/g, '/')}`;

        return (
          <TouchableOpacity
            key={index}
            className="bg-[#DDCDF7] items-center w-[115px] h-[150px] pt-4 relative"
            onPress={() => router.push(`/(screen)/${item.id}`)}
          >
            <Image source={{ uri: imageUri }} className="w-24 h-[65%] object-cover" />
            <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4">
              <Text className="font-bold text-sm" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-sm">{item.price} บาท</Text>
            </View>
            <TouchableOpacity
              className="absolute top-4 right-2"
              onPress={() => deleteFlowerLike(item.id)}
            >
              <MaterialCommunityIcons
                name={likedItems.includes(item.id) ? 'cards-heart' : 'cards-heart-outline'}
                size={25}
                color={likedItems.includes(item.id) ? 'red' : 'black'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProductFav;