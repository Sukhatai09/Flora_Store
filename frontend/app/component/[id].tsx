import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Favorite = () => {
 const id =  useLocalSearchParams()

  return (
    <View>
      <Text>jjj</Text>
    </View>
  )
}

export default Favorite;