import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome,MaterialCommunityIcons,Feather } from '@expo/vector-icons';

const Topbar = () => {
  return (
    <View className='w-full h-20 bg-[#FEACA6] flex-row justify-end items-center pr-7 '> 
      
       <MaterialCommunityIcons name="cards-heart-outline" size={40}
        color="white"  className='pr-7 '/>
       <Feather name="shopping-cart" size={40} color="white" />
      
      
    </View>
  )
}

export default Topbar
  
