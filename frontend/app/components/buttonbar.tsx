import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';

const Buttonbar = () => {
  const currentRoute = usePathname();  // ใช้ usePathname เพื่อดึงเส้นทาง URL ปัจจุบัน

  return (
    <View className="w-full h-20 bg-[#FEACA6] flex-row justify-between items-center pl-7 pr-7">
      <Link href="/homepage" className="flex items-center justify-center">
        <Feather
          name="home"
          size={40}
          color={currentRoute === '/homepage' ? 'black' : 'white'} // เปลี่ยนสีไอคอนถ้าอยู่หน้า homepage
        />
      </Link>

      <Link href="/allproduct" className="flex items-center justify-center">
        <Feather
          name="shopping-bag"
          size={40}
          color={currentRoute === '/allproduct' ? 'black' : 'white'} // เปลี่ยนสีไอคอนถ้าอยู่หน้า allproduct
        />
      </Link>

      <Link href="/user" className="flex items-center justify-center">
        <Feather
          name="user"
          size={40}
          color={currentRoute === '/user' ? 'black' : 'white'} // เปลี่ยนสีไอคอนถ้าอยู่หน้า user
        />
      </Link>

    </View>
  );
};

export default Buttonbar;
