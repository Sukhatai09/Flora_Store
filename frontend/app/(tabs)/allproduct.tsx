// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import { useRouter } from 'expo-router'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// import Topbar from '../components/topbar'

// const AllProduct = () => {

//   const products = [
//     {
//       id: "eeb98fcc-3a3d-4563-b356-744208332f3f",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "db16fc3a-845a-4121-b872-7bdc16bfb33c",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "c9768475-1307-492e-a674-7cdb7b5b6659",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "c3413f41-8a94-47ed-be59-8917ece5d068",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "b4b91513-7706-424b-a2ca-87e30f297c95",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "afbb89ff-83c5-4f71-9d04-924b53398cb8",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "ab2b57f0-36c5-4c22-95de-05eb23672182",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "a26f61a8-a8c7-454d-8181-da263ed0f603",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "a1bc76d0-ec74-420e-9b57-fcc08bc50063",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "913a865f-d984-4f60-b35d-fffeba6d8213",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "8e45ac82-91d9-4bec-8767-08ef9a430e46",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "87cdbcc6-57b1-44ee-9cb9-f9fcef8341d3",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },
//     {
//       id: "80e23833-bd62-4440-af74-d8753e0e9e09",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "7c58b534-40d3-49a0-9b07-fce1fb85e0a0",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "77ea2440-51f4-4375-8860-839a9ebb85e7",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "724b3ef5-173b-4c55-9120-dbcac767b572",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "61fdf3c6-f5df-4612-b5d3-1a54d6727659",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "59a6c096-444c-4c9e-97b3-543b3718287d",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "50ec7654-58ed-48d8-8be9-fd46c759a9e1",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "4d8650bd-36fb-49ca-8bb2-df3f5c361d9b",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "42188e47-f804-40d5-b1a9-bd6570d6f779",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "35ce8be1-dcaf-476a-af38-a4c9d2a742bb",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "3537e047-658a-418e-a48b-51f4dd467af1",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "1a36bbad-7f1e-4cc9-937a-bb0f297b52f2",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "16e07b82-d8ac-4873-9e96-a62af91ce73b",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "12b6fbc2-303f-4b8c-b16f-cee833ba84a4",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//     {
//       id: "0691eaf1-a63b-454c-97e5-5b51b920fee0",
//       name: 'Flower bouquet',
//       price: '500 bath',
//       image: require('../../assets/images/flower1.png'),
//     },

//   ]
//   const router = useRouter()
//   const [likedItems, setLikedItems] = useState<number[]>([])

//   // const handleLikePress = (id: string) => {
//   //   setLikedItems((prev) =>
//   //     prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//   //   )
//   // }

//   return (

//     <View className="flex-col items-center justify-center">
//       <Topbar />
//       <ScrollView
//         className="w-full"
//         contentContainerStyle={{ paddingTop: 0 }}
//         showsVerticalScrollIndicator={true}
//       >
//         <View className='w-full flex-row items-center justify-center'>
//           <Text className="font-bold text-3xl text">Flower Bouquet</Text>
//         </View>
//         <View className="flex-row flex-wrap gap-4 mt-4 px-2">
//           {products.map((item, index) => (
//             <TouchableOpacity

//             // @ts-ignore
//               onPress={() => router.push(`/(screen)/${item.id}`)}
//               key={index}
//               className="bg-[#DDCDF7] items-center w-[120px] h-[150px] py-4 relative"

//             >
//               <Image source={item.image} className="w-24 h-[65%] object-cover" />
//               <View className="items-center justify-center bg-[#F8DAE2] w-full h-[35%] mt-4">
//                 <Text className="font-bold text-sm">{item.name}</Text>
//                 <Text className="text-sm">{item.price}</Text>
//               </View>
//               <TouchableOpacity
//                 // onPress={() => handleLikePress(item.id)}
//                 style={{ position: 'absolute', top: 4, right: 2 }}
//               >
//                 <MaterialCommunityIcons
//                   name={likedItems.includes(item.id) ? "cards-heart" : "cards-heart-outline"}
//                   size={25}
//                   color={likedItems.includes(item.id) ? "red" : "black"}
//                 />
//               </TouchableOpacity>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   )
// }

// export default AllProduct

import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Topbar from "../components/topbar";

const AllProduct = () => {
  const products = [
    {
      id: "eeb98fcc-3a3d-4563-b356-744208332f3f",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "db16fc3a-845a-4121-b872-7bdc16bfb33c",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "c9768475-1307-492e-a674-7cdb7b5b6659",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "c3413f41-8a94-47ed-be59-8917ece5d068",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "b4b91513-7706-424b-a2ca-87e30f297c95",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "afbb89ff-83c5-4f71-9d04-924b53398cb8",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "ab2b57f0-36c5-4c22-95de-05eb23672182",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "a26f61a8-a8c7-454d-8181-da263ed0f603",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "a1bc76d0-ec74-420e-9b57-fcc08bc50063",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "913a865f-d984-4f60-b35d-fffeba6d8213",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "8e45ac82-91d9-4bec-8767-08ef9a430e46",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "87cdbcc6-57b1-44ee-9cb9-f9fcef8341d3",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
    {
      id: "80e23833-bd62-4440-af74-d8753e0e9e09",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "7c58b534-40d3-49a0-9b07-fce1fb85e0a0",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "77ea2440-51f4-4375-8860-839a9ebb85e7",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "724b3ef5-173b-4c55-9120-dbcac767b572",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "61fdf3c6-f5df-4612-b5d3-1a54d6727659",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "59a6c096-444c-4c9e-97b3-543b3718287d",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "50ec7654-58ed-48d8-8be9-fd46c759a9e1",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "4d8650bd-36fb-49ca-8bb2-df3f5c361d9b",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "42188e47-f804-40d5-b1a9-bd6570d6f779",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "35ce8be1-dcaf-476a-af38-a4c9d2a742bb",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "3537e047-658a-418e-a48b-51f4dd467af1",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "1a36bbad-7f1e-4cc9-937a-bb0f297b52f2",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "16e07b82-d8ac-4873-9e96-a62af91ce73b",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "12b6fbc2-303f-4b8c-b16f-cee833ba84a4",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },

    {
      id: "0691eaf1-a63b-454c-97e5-5b51b920fee0",
      name: "Flower bouquet",
      price: "500 bath",
      image: require("../../assets/images/flower1.png"),
    },
  ];
  const router = useRouter();
  const [likedItems, setLikedItems] = useState<string[]>([]); // เปลี่ยนจาก number เป็น string เพราะ id เป็น string

  const handleLikePress = (id: string) => {
    if (likedItems.includes(id)) {
      // ถ้ามีอยู่แล้ว ให้เอาออก (unlike)
      setLikedItems((prevLikedItems) =>
        prevLikedItems.filter((itemId) => itemId !== id)
      );
    } else {
      // ถ้ายังไม่มี ให้เพิ่มเข้าไป (like)
      setLikedItems((prevLikedItems) => [...prevLikedItems, id]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Topbar />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {products.map((product) => (
            <View
              key={product.id}
              style={{
                width: "48%",
                marginBottom: 16,
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // เมื่อกดสินค้า อาจจะพาไปหน้า detail ต่อได้
                  router.push(`/(screen)/${product.id}`);
                }}
              >
                <Image
                  source={product.image}
                  style={{ width: "100%", height: 150 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <View style={{ padding: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {product.name}
                </Text>
                <Text style={{ fontSize: 14, color: "#888", marginTop: 4 }}>
                  {product.price}
                </Text>

                <TouchableOpacity
                  style={{ position: "absolute", top: 8, right: 8 }}
                  onPress={() => handleLikePress(product.id)}
                >
                  <MaterialCommunityIcons
                    name={
                      likedItems.includes(product.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    color={likedItems.includes(product.id) ? "red" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllProduct;
