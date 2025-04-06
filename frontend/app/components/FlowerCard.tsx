import { View, Text, Image, StyleSheet } from 'react-native';

export default function FlowerCard({ flower }: any) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: flower.image }} style={styles.image} />
      <Text style={styles.name}>{flower.name}</Text>
      <Text style={styles.price}>{flower.price} บาท</Text>
    </View>
  );
}



const styles = StyleSheet.create({
    card: { marginBottom: 16, padding: 16, borderWidth: 1, borderRadius: 8 },
    image: { width: '100%', height: 150, borderRadius: 8 },
    name: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
    price: { fontSize: 16, color: 'gray' },
  });
  