import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Topbar from '../components/topbar';
import CartItem from '../components/CartItem';

const FlowersScreen: React.FC = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);

  const handlePress = () => {
    router.push('/(screen)/pay');
  };

  const handleDelete = () => {
    alert("ลบสินค้าออกจากตะกร้าแล้ว");
  };

  return (
    <View className="flex-1 bg-white">
      <Topbar />
      <Text className="text-[35px] mb-4 px-4 mt-10">Shopping Cart</Text>

      <CartItem
        title="Rose bouquet"
        price={3000}
        imageSource={require('../../assets/images/flower1.png')}
        quantity={quantity}
        setQuantity={setQuantity}
        onDelete={handleDelete}
      />

      <TouchableOpacity
        onPress={handlePress}
        className="bg-[#85BEFF] mt-10 mx-28 py-3 rounded-3xl"
      >
        <Text className="text-center text-lg font-medium">Check out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlowersScreen;
