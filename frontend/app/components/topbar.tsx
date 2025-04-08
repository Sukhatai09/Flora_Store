import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome,MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Topbar = () => {
  return (
    <View className='w-full h-20 bg-[#FEACA6] flex-row justify-end items-center pr-7 pb-14 pt-16 '> 
      
      <Link href="/favorit" className="flex items-center  justify-center">
      <MaterialCommunityIcons name="cards-heart-outline" size={40} color="white" />
      </Link>
      
      <Link href="/carts" className="flex items-center justify-center">
      <Feather name="shopping-cart" size={40} color="white" />
      </Link>
    </View>
  )
}

export default Topbar
  
