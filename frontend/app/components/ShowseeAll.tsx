import { useRouter } from "expo-router";
import { Text, View, Pressable } from "react-native"

interface ShowseeAllProps {
  name: string;
  haf:string;
}

const ShowseeAll = ({ name,haf }: ShowseeAllProps) => {

      const route = useRouter();
    
      const handlePress = () => {
        //@ts-ignore
        route.push('/'+haf);
      }
  return (  
    <View className='flex-row justify-between px-4 py-4'>
      <Text className='font-bold text-xl'>{name}</Text>
      <Pressable onPress={handlePress}>
        <Text className='font-bold text-xl'>See all</Text>
      </Pressable>
    </View>
  )
}

export default ShowseeAll;