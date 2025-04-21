//carts.tsx 
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Topbar from '../components/topbar';
import CartItem from '../components/CartItem';
import axios from 'axios';
import Constants from 'expo-constants';
import { useAuthStore } from '@/store/flora_store';

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface CartEntry {
  cart_item_id: number; // ใช้ cart_item_id เป็น ID ของสินค้าในตะกร้า
  flower_id: string;
  quantity: number;
}

interface FlowerDetail {
  flower_id: string;
  name: string;
  price: number;
  image_url: string;
}

const FlowersScreen: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [flowerDetails, setFlowerDetails] = useState<Record<string, FlowerDetail>>({});
  const customer = useAuthStore((state) => state.customer)
  // ฟังก์ชันดึงข้อมูลตะกร้าสินค้า
  const fetchCartItems = async () => {
    try {


      const resCustomerid = await axios.get(`${API_URL}/cart/${customer?.customer_id}`);
      const cart_id = resCustomerid.data.cart_id;


      const res = await axios.get(`${API_URL}/cartItems/${cart_id}`);
      const items: CartEntry[] = res.data;
      setCartItems(items);

      const detailPromises = items.map(item =>
        axios.get(`${API_URL}/flower/${item.flower_id}`)
      );
      const detailsResponses = await Promise.all(detailPromises);

      const detailMap: Record<string, FlowerDetail> = {};
      detailsResponses.forEach(res => {
        const flower = res.data?.data?.[0] || res.data;
        if (flower && flower.flower_id) {
          detailMap[flower.flower_id] = flower;
        }
      });
      setFlowerDetails(detailMap);
    } catch (error) {
      console.error('Error fetching cart or flower details:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // ฟังก์ชันเปลี่ยนแปลงจำนวนสินค้าที่อยู่ในตะกร้า
  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      alert("จำนวนสินค้าไม่สามารถต่ำกว่า 1");
      return;
    }

    // อัปเดต state ให้ทันทีในฝั่งหน้า UI
    const updatedCartItems = cartItems.map(item =>
      item.cart_item_id === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);

    // ส่งข้อมูลไปยัง API เพื่ออัปเดตข้อมูลสินค้า
    try {
      await axios.put(`${API_URL}/cartItems`, {
        id: cartItemId, // ใช้ cart_item_id ที่ต้องการอัปเดต
        quantity: newQuantity // จำนวนที่อัปเดต
      });
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      alert('ไม่สามารถปรับปรุงจำนวนสินค้าได้');
    }
  };

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const handleDelete = async (cartItemId: number) => {
    alert("ลบสินค้าออกจากตะกร้าแล้ว");
    setCartItems(prev => prev.filter(item => item.cart_item_id !== cartItemId));
    setFlowerDetails(prev => {
      const updated = { ...prev };
      delete updated[cartItemId];
      return updated;
    });
    try {
      await axios.delete(`${API_URL}/cartItems`, {
        data: {
          cart_item_id: cartItemId
        }
      });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      alert('ไม่สามารถลบสินค้าออกจากตะกร้าได้');
    }
  };

  // ฟังก์ชันไปยังหน้าชำระเงิน
// เพิ่มก่อนกด router.push เพื่อเตรียมข้อมูล
// เพิ่มฟังก์ชันคำนวณข้อมูลสินค้าเพื่อส่งไป pay
const handlePress = () => {
  const payload = cartItems.map(item => {
    const flower = flowerDetails[item.flower_id];
    return {
      name: flower.name,
      quantity: item.quantity,
      price: flower.price,
      flower_id: flower.flower_id,
      image_url: `${API_URL?.replace(/\/api$/, "").replace(/\/$/, "")}/${flower.image_url?.replace(/^(\.\/)/, '').replace(/\\/g, '/')}`,
    };
  });

  const encoded = encodeURIComponent(JSON.stringify(payload));
  router.push(`/(screen)/pay?cart=${encoded}`);
};


  return (
    <View className="flex-1 bg-white">
      <Topbar />
      <Text className="text-[35px] mb-4 px-4 mt-10">Shopping Cart</Text>

      <ScrollView className="px-4 pb-10">
        {cartItems.map((item) => {
          const flower = flowerDetails[item.flower_id];
          if (!flower) return null;

          const imageUri = `${API_URL?.replace(/\/api$/, "").replace(/\/$/, "")}/${flower.image_url?.replace(/^(\.\/)/, '').replace(/\\/g, '/')}`;

          return (
            <CartItem
              key={item.cart_item_id} // ใช้ cart_item_id ในการทำ key
              title={flower.name}
              price={flower.price}
              quantity={item.quantity}
              setQuantity={(q) => handleQuantityChange(item.cart_item_id, q)} // ใช้ cart_item_id
              imageSource={{ uri: imageUri }}
              onDelete={() => handleDelete(item.cart_item_id)} // ใช้ cart_item_id
            />
          );
        })}
      </ScrollView>

      <TouchableOpacity
        onPress={handlePress}
        className="bg-[#85BEFF] mt-5 mx-28 py-3 mb-10 rounded-3xl"
      >
        <Text className="text-center text-lg font-medium">Check out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlowersScreen;
