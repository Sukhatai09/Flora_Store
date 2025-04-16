import { View, Text, Image } from 'react-native';

export default function FlowerCard({ flower }: any) {
  return (
    <View className="mb-4 p-4 border rounded-lg">
      <Image
        source={{ uri: flower.image }}
        className="w-full h-[150px] rounded-lg"
      />
      <Text className="text-lg font-bold mt-2">{flower.name}</Text>
      <Text className="text-base text-gray-500">{flower.price} บาท</Text>
    </View>
  );
}
