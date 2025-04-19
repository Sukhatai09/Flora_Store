import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface Product {
  id: string;
  name: string;
  price: string;
  image: string | undefined; // อนุญาตให้ image เป็น undefined
}

const ProductShow = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  return (
    <View className="flex-row flex-wrap gap-6  py-4 ">
      {products.slice(0, 3).map((item, index) => {
        // ตรวจสอบว่า item.image มีค่าหรือไม่
        const imageUri = item.image
          ? `${API_URL?.replace(/\/api$/, '').replace(/\/$/, '')}/${item.image
              .replace(/^(\.\/)/, '')
              .replace(/\\/g, '/')}`
          : ''; // คืนค่าว่างหรือ URL รูปภาพ default ถ้า image เป็น undefined

        return (
          <TouchableOpacity
            key={index}
            className="bg-[#DDCDF7] items-center w-[115px] h-[150px] pt-4"
            onPress={() => router.push(`/(screen)/${item.id}`)}
          >
            <Image
              source={{ uri: imageUri || 'https://via.placeholder.com/150' }} // ใช้ placeholder ถ้า imageUri ว่าง
              className="w-24 h-[65%] object-cover"
            />
            <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4">
              <Text className="font-bold text-sm" numberOfLines={1}>
                {item.name}
              </Text>
              <Text 
                className="text-sm">{item.price} บาท</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProductShow;