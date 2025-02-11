import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';

type DestinationDetailsRouteProp = RouteProp<RootStackParamList, 'DestinationDetailsScreen'>;
type DestinationDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'PopularDestinationsScreen'>;

const DestinationDetailsScreen: React.FC = () => {
  const route = useRoute<DestinationDetailsRouteProp>();
  const navigation = useNavigation<DestinationDetailsNavigationProp>();
  const { destination } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

      {/* Destination Image */}
      <Image
        source={typeof destination.image === 'string' ? { uri: destination.image } : destination.image} // Handle local and remote images
        style={styles.image}
      />

      {/* Destination Title */}
      <Text style={styles.title}>{destination.name}</Text>

      {/* Destination Description */}
      <Text style={styles.description}>{destination.description}</Text>

      {/* Additional Highlights */}
      <View style={styles.highlightsContainer}>
        <Text style={styles.highlightsTitle}>Highlights:</Text>
        <Text style={styles.highlight}>⭐ Famous landmarks: Eiffel Tower, Louvre Museum</Text>
        <Text style={styles.highlight}>⭐ Best time to visit: Spring (April - June)</Text>
        <Text style={styles.highlight}>⭐ Cuisine: French pastries, wines, and cheese</Text>
      </View>

      {/* Ratings Section */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Traveler Ratings:</Text>
        <Text style={styles.ratingValue}>4.8 / 5.0</Text>
        <Text style={styles.ratingText}>(Based on 5,123 reviews)</Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Your Trip</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: 'justify',
  },
  highlightsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  highlightsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  highlight: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  ratingContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fef7e6',
    borderRadius: 10,
    elevation: 2,
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f39c12',
  },
  ratingText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  bookButton: {
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#007bff',
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DestinationDetailsScreen;
