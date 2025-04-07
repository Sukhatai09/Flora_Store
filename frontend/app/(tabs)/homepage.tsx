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


const { width } = Dimensions.get('window');

const carts = [
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
]

const favorite = [
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
]

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
]
const promote = [
  {
    id: '1',
    text: 'SPECIAL OFFER! Buy 1 bouquet get 1 50% off!',
    image: require('../../assets/images/flower1.png'),
    bgColor: '#ABE0F7', 
  },
  {
    id: '2',
    text: 'NEW ARRIVAL! Spring Collection 2025!',
    image: require('../../assets/images/flower1.png'),
    bgColor: '#DCB1F6', 
  },
  {
    id: '3',
    text: 'LIMITED TIME! 20% OFF on all roses!',
    image: require('../../assets/images/flower1.png'),
    bgColor: '#B1F6BE', 
  },
];

export default function App() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

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
    {/* Topbar อยู่ด้านบนแบบ fix */}


    {/* ScrollView ข้างล่าง */}
    <ScrollView
      className="w-full "
      contentContainerStyle={{ paddingTop: 0 }} // สูงพอๆ กับ Topbar เพื่อไม่ให้ content ทับ Topbar
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
