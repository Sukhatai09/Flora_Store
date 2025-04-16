import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Topbar from '../components/topbar'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'
import Constants from 'expo-constants'
import { useAuthStore } from '@/store/flora_store'

const API_URL = Constants.expoConfig?.extra?.API_URL

interface Product {
  flower_id: string
  name: string
  description: string
  price: number
  image_url: string
  stock_quantity: number
}

const FavoritsScreen = () => {
  const route = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [likedItems, setLikedItems] = useState<string[]>([])
  const customer = useAuthStore((state) => state.customer)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchFlowers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/flowerLikes/${customer?.customer_id}`)
      const flowerLikes = response.data.flowerLikes

      if (!flowerLikes || flowerLikes.length === 0) {
        setError("You have no liked flowers")
        setProducts([])
        setLikedItems([])
        return
      }

      const flowerDetailPromises = flowerLikes.map(async (like: any) => {
        const flowerRes = await axios.get(`${API_URL}/flower/${like.flower_id}`)
        if (flowerRes.status !== 200) throw new Error('Failed to fetch flower details')
        return flowerRes.data.data[0]
      })

      const flowerDetails = await Promise.all(flowerDetailPromises)
      setProducts(flowerDetails)
      setLikedItems(flowerLikes.map((like: any) => like.flower_id))
      setError(null)
    } catch (error) {
      console.error("Error fetching flower data:", error)
      setError("An error occurred while fetching flower data.")
    } finally {
      setLoading(false)
    }
  }

  const deleteFlowerLike = async (flower_id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/flowerLikes`, {
        data: {
          customer_id: customer?.customer_id,
          flower_id: flower_id
        }
      })
      if (response.status === 200) {
        // ลบออกจาก state โดยไม่ต้อง fetch ใหม่
        setLikedItems((prevLikes) => prevLikes.filter((id) => id !== flower_id))
        setProducts((prevProducts) => prevProducts.filter((product) => product.flower_id !== flower_id))
      } else {
        console.error("Failed to remove flower like")
      }
    } catch (error) {
      console.error("Error removing flower like:", error)
    }
  }

  useEffect(() => {
    fetchFlowers()
  }, [])

  return (
    <View className="flex-col items-center justify-center relative">
      <Topbar />
      <View className="absolute top-0 left-0 w-full bg-[#FEACA6]">
        <TouchableOpacity className="flex-1 items-start justify-center ml-5 mt-10" onPress={() => route.back()}>
          <Text>
            <AntDesign name="arrowleft" size={40} color="black" />
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingTop: 0 }}
        showsVerticalScrollIndicator={true}
      >
        <View className='w-full flex-row items-center justify-center my-5'>
          <Text className="font-bold text-3xl">Favorits</Text>
        </View>

        {error && (
          <View className="flex-row items-center justify-center mt-4">
            <Text className="text-red-500">{error}</Text>
          </View>
        )}

        {loading && (
          <View className="flex-row items-center justify-center mt-4">
            <Text className="text-blue-500">Loading...</Text>
          </View>
        )}

        {products.length === 0 && !loading && !error && (
          <View className="flex-row items-center justify-center mt-4">
            <Text className="text-gray-500">You have no liked flowers yet!</Text>
          </View>
        )}

        <View className="flex-row flex-wrap gap-4 mt-4 px-2 pb-10">
          {products.map((item, index) => (
            <TouchableOpacity
              onPress={() => route.push(`/(screen)/${item.flower_id}`)}
              key={index}
              className="bg-[#DDCDF7] items-center w-[120px] h-[150px] py-4 relative"
            >
              <Image
                source={{
                  uri: `${API_URL?.replace(/\/api$/, "").replace(/\/$/, "")}/${item?.image_url?.replace(/^(\.\/)/, '').replace(/\\/g, '/')}`
                }}
                className="w-24 h-[65%] object-cover"
              />
              <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4">
                <Text className="font-bold text-sm" numberOfLines={1}>{item.name}</Text>
                <Text className="text-sm">{item.price} บาท</Text>
              </View>

              <TouchableOpacity
                style={{ position: 'absolute', top: 4, right: 2 }}
                onPress={() => deleteFlowerLike(item.flower_id)}
              >
                <MaterialCommunityIcons
                  name={likedItems.includes(item.flower_id) ? "cards-heart" : "cards-heart-outline"}
                  size={25}
                  color={likedItems.includes(item.flower_id) ? "red" : "black"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default FavoritsScreen
