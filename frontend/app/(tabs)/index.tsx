import { MaterialCommunityIcons } from '@expo/vector-icons';
import Topbar from '../Navbar/topbar';
import Buttonbar from '../Navbar/buttonbar';
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

const { width } = Dimensions.get('window');

const promoData = [
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
      const nextIndex = (currentIndex + 1) % promoData.length;
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
    <View className="z-10">
      <Topbar />
    </View>

    {/* ScrollView ข้างล่าง */}
    <ScrollView
      className="w-full "
      contentContainerStyle={{ paddingTop: 0 }} // สูงพอๆ กับ Topbar เพื่อไม่ให้ content ทับ Topbar
      showsVerticalScrollIndicator={true}
    >
  
     
      <FlatList
        ref={flatListRef}
        data={promoData}
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
        {promoData.map((_, index) => (
          <View
            key={index}
            className={`mx-1 w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </View> 



      {/* ดอกไม้วาเลนไทน์ */}
   
        <View className=' flex-row justify-between px-4 py-4 '>
          <Text className='font-bold text-xl'>Flower bouquet</Text>
          <Text className='font-bold text-xl'>See all</Text>
        </View>
        <View className='bg-[#FEACA6] w-full h-[175px]'>
          <View className='bg-[#ffffff] w-full  h-[100%] flex-row justify-between px-4 '>
          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>

          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>

          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>
          </View>

          
        </View>

        <View className=' flex-row justify-between px-4 py-4 '>
          <Text className='font-bold text-xl'>Flower bouquet</Text>
          <Text className='font-bold text-xl'>See all</Text>
        </View>
        <View className='bg-[#FEACA6] w-full h-[175px]'>
          <View className='bg-[#ffffff] w-full  h-[100%] flex-row justify-between px-4 '>
          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>

          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>

          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>
          </View>

          
        </View>


        <View className=' flex-row justify-between px-4 py-4 '>
          <Text className='font-bold text-xl'>Flower bouquet</Text>
          <Text className='font-bold text-xl'>See all</Text>
        </View>
        <View className='bg-[#FEACA6] w-full h-[175px]'>
          <View className='bg-[#ffffff] w-full  h-[100%] flex-row justify-between px-4 '>
          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>

          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>

          <View className=' bg-[#C6A6FE] flex-col items-center w-[30%] h-full
           justify-start py-4 relative '>
          <Image source={require('../../assets/images/flower1.png')} 
            className='w-24 h-[65%] object-cover ' />
            <View className='font-bold text-xl flex-col items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4'>
              <Text>Flower bouquet</Text>
              <Text>500 bath</Text>
            </View>
            <MaterialCommunityIcons name="cards-heart-outline" size={25}
              color="black"  className=' absolute top-1 right-2 '/>
          </View>
          </View>

          
        </View>
   
    </ScrollView>

    <View className="z-10">
      <Buttonbar />
    </View>
    </View>
  );
}
