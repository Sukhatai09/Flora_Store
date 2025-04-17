import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CartItemProps {
  title: string;
  price: number;
  imageSource: ImageSourcePropType;
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  onDelete: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  title,
  price,
  imageSource,
  quantity,
  setQuantity,
  onDelete,
}) => {
  return (
    <View className="flex-row bg-[#FDEBED] rounded-xl mx-4 p-4 items-center relative">
      <View className="w-24 h-24 bg-[#DDCDF7]">
        <Image
          source={imageSource}
          className="w-24 h-24 rounded-lg"
        />
      </View>

      <View className="flex-1 ml-4">
        <Text className="text-[16px] font-semibold text-black">{title}</Text>
        <Text className="text-[15px] text-black mt-1">ราคา: {price} บาท</Text>

        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(quantity - 1, 1))}
            className="bg-[#DCB1F6] px-3 py-1 rounded-full"
          >
            <MaterialCommunityIcons name="minus" size={18} color="black" />
          </TouchableOpacity>

          <Text className="mx-4 text-lg">{quantity}</Text>

          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            className="bg-[#DCB1F6] px-3 py-1 rounded-full"
          >
            <MaterialCommunityIcons name="plus" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={onDelete}
        className="absolute top-2 right-2"
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color="#f87171"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
