import { View, Text, Image, TouchableOpacity, ScrollView, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Topbar from '../components/topbar'
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

const AllProduct = () => {
  const [flowers, setFlowers] = useState<Product[]>([])
  const [likedItems, setLikedItems] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const customer = useAuthStore((state) => state.customer)
  const limit = 10
  const router = useRouter()

  const isFetching = useRef(false)

  const fetchFlowers = async () => {
    if (isFetching.current || !hasMore) return
    setLoading(true)
    isFetching.current = true
    try {
      const response = await axios.get(`${API_URL}/flower?page=${page}&limit=${limit}`)
      const newFlowers = response.data.data

      setFlowers((prev) => [...prev, ...newFlowers])
      if (newFlowers.length < limit) {
        setHasMore(false)
      } else {
        setPage((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error fetching flower data:", error)
    } finally {
      setLoading(false)
      isFetching.current = false
    }
  }

  useEffect(() => {
    fetchFlowers()
  }, [])

  const handleLikePress = async (flowerId: string) => {
    const alreadyLiked = likedItems.includes(flowerId)

    setLikedItems((prev) =>
      alreadyLiked ? prev.filter((item) => item !== flowerId) : [...prev, flowerId]
    )

    try {
      if (!alreadyLiked && customer?.customer_id) {
        await axios.post(`${API_URL}/flowerLikes`, {
          customer_id: customer.customer_id,
          flower_id: flowerId,
        })
        console.log(`Liked flower ${flowerId} by customer ${customer.customer_id}`)
      } else if (!customer?.customer_id) {
        console.warn("No customer_id found in store!")
      }
    } catch (error) {
      console.error("Error liking flower:", error)
    }
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const paddingToBottom = 50
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom

    if (isCloseToBottom && !loading && hasMore) {
      fetchFlowers()
    }
  }

  return (
    <View className="flex-col items-center justify-center">
      <Topbar />
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingTop: 0 }}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-row items-center justify-center">
          <Text className="font-bold text-3xl mt-4">Flower Bouquet</Text>
        </View>

        <View className="flex-row flex-wrap gap-4 mt-4 px-2 justify-center">
          {flowers.map((item) => {
            const imageUri = `${API_URL?.replace(/\/api$/, "").replace(/\/$/, "")}/${item?.image_url?.replace(/^(\.\/)/, '').replace(/\\/g, '/')}`

            return (
              <TouchableOpacity
                key={item.flower_id}
                onPress={() => router.push(`/(screen)/${item.flower_id}`)}
                className="bg-[#DDCDF7] items-center w-[120px] h-[170px] py-4 relative rounded-md"
              >
                <Image
                  source={{ uri: imageUri }}
                  className="w-24 h-[65%] object-cover rounded"
                />
                <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4 px-1">
                  <Text className="font-bold text-sm text-center" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-sm">{item.price} บาท</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleLikePress(item.flower_id)}
                  style={{ position: 'absolute', top: 4, right: 2 }}
                >
                  <MaterialCommunityIcons
                    name={likedItems.includes(item.flower_id) ? "cards-heart" : "cards-heart-outline"}
                    size={25}
                    color={likedItems.includes(item.flower_id) ? "red" : "black"}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}
        </View>

        {loading && (
          <Text className="text-center my-4 text-gray-500">กำลังโหลด...</Text>
        )}
      </ScrollView>
    </View>
  )
}

export default AllProduct
