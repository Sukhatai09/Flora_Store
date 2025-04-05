import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome,MaterialCommunityIcons,Feather } from '@expo/vector-icons';

const Buttonbar = () => {
  return (
    <View className='w-full h-20 bg-[#FEACA6] flex-row justify-between items-center pl-7 pr-7 '> 

        <Feather name="home" size={40} color="white" />
      
        <Feather name="shopping-bag" size={40} color="white" />
       <Feather name="user" size={40} color="white" />
      
      
    </View>
  )
}

export default Buttonbar
  
