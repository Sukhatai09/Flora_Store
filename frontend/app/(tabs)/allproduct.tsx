import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Topbar from '../components/topbar'



const AllProduct = () => {

  const products = [
    {
      id: 1,
      name: 'Flower bouquet',
      price: '500 bath',
      image: require('../../assets/images/flower1.png'),
    },
    {
      id: 2,
      name: 'Flower bouquet',
      price: '500 bath',
      image: require('../../assets/images/flower1.png'),
    },
    {
      id: 3,
      name: 'Flower bouquet',
      price: '500 bath',
      image: require('../../assets/images/flower1.png'),
    },
    {
      id: 4,
      name: 'Flower bouquet',
      price: '500 bath',
      image: require('../../assets/images/flower1.png'),
    },
    {
      id: 5,
      name: 'Flower bouquet',
      price: '500 bath',
      image: require('../../assets/images/flower1.png'),
    },
    {
      id: 6,
      name: 'Flower bouquet',
      price: '500 bath',
      image: require('../../assets/images/flower1.png'),
    },
  ]
  const router = useRouter()
  const [likedItems, setLikedItems] = useState<number[]>([])



  const handleLikePress = (id: number) => {
    setLikedItems((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    
    <View className="flex-col items-center justify-center">
      <Topbar />
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingTop: 0 }}
        showsVerticalScrollIndicator={true}
      >
        <View className='w-full flex-row items-center justify-center'>
          <Text className="font-bold text-3xl text">Flower Bouquet</Text>
        </View>
        <View className="flex-row flex-wrap gap-4 mt-4 px-2">
          {products.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#DDCDF7] items-center w-[120px] h-[150px] py-4 relative"

            >
              <Image source={item.image} className="w-24 h-[65%] object-cover" />
              <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4">
                <Text className="font-bold text-sm">{item.name}</Text>
                <Text className="text-sm">{item.price}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleLikePress(item.id)}
                style={{ position: 'absolute', top: 4, right: 2 }}
              >
                <MaterialCommunityIcons
                  name={likedItems.includes(item.id) ? "cards-heart" : "cards-heart-outline"}
                  size={25}
                  color={likedItems.includes(item.id) ? "red" : "black"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default AllProduct
