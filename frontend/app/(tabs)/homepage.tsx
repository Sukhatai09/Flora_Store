import { MaterialCommunityIcons } from '@expo/vector-icons';

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import ProductShow from '../components/ProductShow';
import ShowseeAll from '../components/ShowseeAll';
import ProductFav from '../components/ProductFav';
import Topbar from '../components/topbar';
import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.API_URL

interface Product {
  flower_id: string
  name: string
  description: string
  price: number
  image_url: string
  stock_quantity: number
}

const { width } = Dimensions.get('window');






const promote = [
  {
    id: '1',
    text: 'SPECIAL OFFER! Buy 1 bouquet get 1 50% off!',
    image: require('../../assets/images/flower2.png'),
    bgColor: '#ABE0F7', 
  },
  {
    id: '2',
    text: 'NEW ARRIVAL! Spring Collection 2025!',
    image: require('../../assets/images/flower3.png'),
    bgColor: '#DCB1F6', 
  },
  {
    id: '3',
    text: 'LIMITED TIME! 20% OFF on all roses!',
    image: require('../../assets/images/flower4.png'),
    bgColor: '#B1F6BE', 
  },
];

export default function App() {
  const [flowers, setFlowers] = useState<Product[]>([])
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const fetchFlowers = async () => {
   
    try {
      const response = await axios.get(`${API_URL}/flower`)
      const newFlowers = response.data.data

      setFlowers(newFlowers)
      
    } catch (error) {
      console.error("Error fetching flower data:", error)
    } 
  }

  useEffect(() => {
    fetchFlowers()
  }, [])

  const products = [
    {
      id: `${flowers[3]?.flower_id}`,
      name:  `${flowers[3]?.name}`,
      price:  `${flowers[3]?.price}`,
      image:  `${flowers[3]?.image_url}`,
    },
    {
      id: `${flowers[4]?.flower_id}`,
      name:  `${flowers[4]?.name}`,
      price:  `${flowers[4]?.price}`,
      image:  `${flowers[4]?.image_url}`,
    },
    {
      id: `${flowers[5]?.flower_id}`,
      name:  `${flowers[5]?.name}`,
      price:  `${flowers[5]?.price}`,
      image:  `${flowers[5]?.image_url}`,
    },
  ]

  const favorite = [
    {
      id: `${flowers[6]?.flower_id}`,
      name:  `${flowers[6]?.name}`,
      price:  `${flowers[6]?.price}`,
      image:  `${flowers[6]?.image_url}`,
    },
    {
      id: `${flowers[7]?.flower_id}`,
      name:  `${flowers[7]?.name}`,
      price:  `${flowers[7]?.price}`,
      image:  `${flowers[7]?.image_url}`,
    },
    {
      id: `${flowers[8]?.flower_id}`,
      name:  `${flowers[8]?.name}`,
      price:  `${flowers[8]?.price}`,
      image:  `${flowers[8]?.image_url}`,
    },
  ]

  const carts = [
    {
      id: `${flowers[0]?.flower_id}`,
      name:  `${flowers[0]?.name}`,
      price:  `${flowers[0]?.price}`,
      image:  `${flowers[0]?.image_url}`,
    },
    {
      id: `${flowers[1]?.flower_id}`,
      name:  `${flowers[1]?.name}`,
      price:  `${flowers[1]?.price}`,
      image:  `${flowers[1]?.image_url}`,
    },
    {
      id: `${flowers[2]?.flower_id}`,
      name:  `${flowers[2]?.name}`,
      price:  `${flowers[2]?.price}`,
      image:  `${flowers[2]?.image_url}`,
    },
  ]

  useEffect(() => {
    if (!isAutoScroll) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % promote.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoScroll]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setCurrentIndex(newIndex);
    setIsAutoScroll(false);

    setTimeout(() => setIsAutoScroll(true), 10);
  };

  return (

    
    <View className="flex-1 bg-white">
    <Topbar />


    {/* ScrollView ข้างล่าง */}
    <ScrollView
      className="w-full "
      contentContainerStyle={{ paddingTop: 0 }} 
      showsVerticalScrollIndicator={true}
    >
  
     
      <FlatList
        ref={flatListRef}
        data={promote}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          
          <View
            style={{ width }}
            className="items-center pt-10 h-56 "
          >
            <View
              style={{ backgroundColor: item.bgColor }}
              className="w-[80%] h-full rounded-[40px] py-10 pl-5 flex-row"
            >
              <Text className="w-[50%] font-bold text-xl">{item.text}</Text>
              <Image
                className="w-[50%] h-full object-cover"
                source={item.image}
              />
            </View>
          </View>
        )}
      />

      {/* Indicator */}
      <View className="flex-row justify-center mt-4">
        {promote.map((_, index) => (
          <View
            key={index}
            className={`mx-1 w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </View> 


      <ShowseeAll  name="Flower bouquet" haf="allproduct" />   

    <ProductShow products={products} />
    
        <ShowseeAll name="favorite" haf="favorite" />  
     
        <ProductFav products={favorite} />

        <ShowseeAll name="carts" haf="carts" /> 
     
        <ProductShow products={carts} />
   
    </ScrollView>


    </View>
  );
}
