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
  RefreshControl,
} from 'react-native';
import ProductShow from '../components/ProductShow';
import ShowseeAll from '../components/ShowseeAll';
import ProductFav from '../components/ProductFav';
import Topbar from '../components/topbar';
import axios from 'axios';
import Constants from 'expo-constants';
import { useAuthStore } from '@/store/flora_store';

const API_URL = Constants.expoConfig?.extra?.API_URL;

interface Product {
  flower_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

interface CartEntry {
  cart_item_id: number;
  flower_id: string;
  quantity: number;
}

interface FlowerDetail {
  flower_id: string;
  name: string;
  price: number;
  image_url: string;
}

// เพิ่ม interface สำหรับ ProductShow
interface ProductShowItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

const { width } = Dimensions.get('window');

const promote = [
  {
    id: '1',
    text: 'NEW ARRIVAL! summer Collection 2025!',
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
    text: 'NEW ARRIVAL! Winter Collection 2025!',
    image: require('../../assets/images/flower4.png'),
    bgColor: '#B1F6BE',
  },
];

export default function App() {
  const [flowers, setFlowers] = useState<Product[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [likedItems, setLikedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [flowerDetails, setFlowerDetails] = useState<Record<string, FlowerDetail>>({});
  const [refreshing, setRefreshing] = useState(false);
  const customer = useAuthStore((state) => state.customer);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const fetchFlowers = async () => {
    try {
      const response = await axios.get(`${API_URL}/flower`);
      setFlowers(response.data.data);
    } catch (error) {
      console.error('Error fetching flower data:', error);
    }
  };

  const fetchFavoriteFlowers = async () => {
    if (!customer?.customer_id) return;
    try {
      const response = await axios.get(`${API_URL}/flowerLikes/${customer.customer_id}`);
      const flowerLikes = response.data.flowerLikes;

      if (!flowerLikes || flowerLikes.length === 0) {
        setFavoriteProducts([]);
        setLikedItems([]);
        return;
      }

      const flowerDetailPromises = flowerLikes.map(async (like: any) => {
        const flowerRes = await axios.get(`${API_URL}/flower/${like.flower_id}`);
        if (flowerRes.status !== 200) throw new Error('Failed to fetch flower details');
        return flowerRes.data.data[0];
      });

      const flowerDetails = await Promise.all(flowerDetailPromises);
      setFavoriteProducts(flowerDetails);
      setLikedItems(flowerLikes.map((like: any) => like.flower_id));
    } catch (error) {
      console.error('Error fetching favorite flowers:', error);
    }
  };

  const deleteFlowerLike = async (flower_id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/flowerLikes`, {
        data: {
          customer_id: customer?.customer_id,
          flower_id: flower_id,
        },
      });
      if (response.status === 200) {
        setLikedItems((prevLikes) => prevLikes.filter((id) => id !== flower_id));
        setFavoriteProducts((prevProducts) =>
          prevProducts.filter((product) => product.flower_id !== flower_id)
        );
      }
    } catch (error) {
      console.error('Error removing flower like:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/cartItems`);
      const items: CartEntry[] = res.data;
      setCartItems(items);

      const detailPromises = items.map((item) =>
        axios.get(`${API_URL}/flower/${item.flower_id}`)
      );
      const detailsResponses = await Promise.all(detailPromises);

      const detailMap: Record<string, FlowerDetail> = {};
      detailsResponses.forEach((res) => {
        const flower = res.data?.data?.[0] || res.data;
        if (flower && flower.flower_id) {
          detailMap[flower.flower_id] = flower;
        }
      });
      setFlowerDetails(detailMap);
    } catch (error) {
      console.error('Error fetching cart or flower details:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchFlowers(), fetchFavoriteFlowers(), fetchCartItems()]);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchFlowers();
    fetchFavoriteFlowers();
    fetchCartItems();
  }, [customer?.customer_id]);

  // ปรับ carts ให้ชัดเจนว่าเป็น ProductShowItem[]
  const carts: ProductShowItem[] = cartItems
    .map((item) => {
      const flower = flowerDetails[item.flower_id];
      if (!flower) return null;
      return {
        id: item.flower_id,
        name: flower.name,
        price: flower.price.toString(),
        image: flower.image_url,
      };
    })
    .filter((p): p is ProductShowItem => p !== null);

  const products: ProductShowItem[] = [
    {
      id: flowers[3]?.flower_id,
      name: flowers[3]?.name,
      price: flowers[3]?.price.toString(),
      image: flowers[3]?.image_url,
    },
    {
      id: flowers[4]?.flower_id,
      name: flowers[4]?.name,
      price: flowers[4]?.price.toString(),
      image: flowers[4]?.image_url,
    },
    {
      id: flowers[5]?.flower_id,
      name: flowers[5]?.name,
      price: flowers[5]?.price.toString(),
      image: flowers[5]?.image_url,
    },
  ].filter((p): p is ProductShowItem => p !== null);

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
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
    setIsAutoScroll(false);
    setTimeout(() => setIsAutoScroll(true), 10);
  };

  return (
    <View className="flex-1 bg-white">
      <Topbar />
      <ScrollView
        className="w-full "
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 180 }} 
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#85BEFF']}
            tintColor="#85BEFF"
          />
        }
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
            <View style={{ width }} className="items-center pt-10 h-56">
              <View
                style={{ backgroundColor: item.bgColor }}
                className="w-[80%] h-full rounded-[40px] py-10 pl-5 flex-row"
              >
                <Text className="w-[50%] font-bold text-xl">{item.text}</Text>
                <Image className="w-[50%] h-full object-cover" source={item.image} />
              </View>
            </View>
          )}
        />
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

        <ShowseeAll name="Flower bouquet" haf="allproduct" />
        <ProductShow products={products} />

        <ShowseeAll name="favorite" haf="favorite" />
        <ProductFav
          products={favoriteProducts.map((item) => ({
            id: item.flower_id,
            name: item.name,
            price: item.price.toString(),
            image: item.image_url,
          }))}
          likedItems={likedItems}
          deleteFlowerLike={deleteFlowerLike}
        />

        <ShowseeAll name="carts" haf="carts" />
        <ProductShow products={carts} />
      </ScrollView>
    </View>
  );
}