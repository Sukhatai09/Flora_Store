import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
interface Product {
  id: number;
  name: string;
  price: string;
  image: any; // Using 'any' for the require statement, but you might want to be more specific
}
const ProductShow = ({ products }: { products: Product[] }) => {
  return (
   <View className="flex-row flex-wrap gap-4 mt-4 px-2">
            {products.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-[#C6A6FE] items-center w-[120px] h-[150px] py-4 relative"
         
              >
                <Image source={item.image} className="w-24 h-[65%] object-cover" />
                <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4">
                  <Text className="font-bold text-sm">{item.name}</Text>
                  <Text className="text-sm">{item.price}</Text>
                </View>
                <TouchableOpacity
           
                  style={{ position: 'absolute', top: 4, right: 2 }}
                >
                  <MaterialCommunityIcons
                  
                    size={25}
                
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
  )
}

export default ProductShow
