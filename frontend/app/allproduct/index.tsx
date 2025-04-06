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
        <Text>allproduct</Text>
    </View>
  )
}

export default allproduct;