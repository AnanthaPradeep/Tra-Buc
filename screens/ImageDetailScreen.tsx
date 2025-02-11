import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

interface ImageDetailScreenProps {
  route: any; // Receiving the image data passed as route params
}

const ImageDetailScreen: React.FC<ImageDetailScreenProps> = ({ route }) => {
  const { image } = route.params; // Destructure the image object from params

  // Now you can access image properties directly from the image object
  const { imageUrl, name, description, location } = image;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.location}>{location}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: 'blue',
  },
});

export default ImageDetailScreen;
