import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Destination } from '../types'; // Import Destination type from types

// Example data for destinations
export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Paris, France',
    image: require('../assets/p1.jpg'), // Corrected image import
    description: 'The City of Lights awaits with its iconic Eiffel Tower and art museums.',
  },
  {
    id: '2',
    name: 'Bali, Indonesia',
    image: require('../assets/b1.jpg'), // Corrected image import
    description: 'Relax on pristine beaches and explore lush green forests.',
  },
  {
    id: '3',
    name: 'New York, USA',
    image: require('../assets/n1.jpg'), // Corrected image import
    description: 'Experience the hustle and bustle of the Big Apple with its famous landmarks.',
  },
  {
    id: '4',
    name: 'Tokyo, Japan',
    image: require('../assets/t1.jpg'), // Corrected image import
    description: 'Explore the bustling streets of Tokyo and its rich culture.',
  },
  {
    id: '5',
    name: 'Kanniyakumari, India',
    image: require('../assets/k1.jpg'), // Corrected image import
    description: 'Explore the bustling streets of Kanniyakumari and its rich culture.',
  },
];

type PopularDestinationsNavigationProp = StackNavigationProp<RootStackParamList, 'PopularDestinationsScreen'>;

const PopularDestinationsScreen: React.FC = () => {
  const navigation = useNavigation<PopularDestinationsNavigationProp>();

  const renderItem = ({ item }: { item: Destination }) => (
    <View style={styles.destinationContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.seeMoreButton}
        onPress={() =>
          navigation.navigate('DestinationDetailsScreen', { destination: item }) // Pass destination to DestinationDetailsScreen
        }
      >
        <Text style={styles.seeMoreText}>See More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={destinations}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2} // 2 by 2 grid
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  destinationContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginVertical: 5,
  },
  seeMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  seeMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PopularDestinationsScreen;
