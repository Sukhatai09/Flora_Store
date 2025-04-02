import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

const allproduct = () => {

  const router = useRouter()
  const handlePress = (id: number) => {
    //@ts-ignore
    router.push(`/(screen)/${id}`)
  }
  return (
    <View>
      <Text>cart</Text>

      <TouchableOpacity className='mt-96' onPress={() => handlePress(33333333333333333) }><Text>cream</Text></TouchableOpacity>
        <Text>Detail</Text>
    </View>
  )
}

export default allproduct;