// StoriesScreen.tsx
import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Dimensions } from 'react-native';

// Define the type for the image data
interface ImageItem {
  id: string;
  source: any;
}

const { width } = Dimensions.get('window');

// Example image data
export const images = [
  { id: '1', source: require('../assets/b1.jpeg') },
  { id: '2', source: require('../assets/b2.jpeg') },
  { id: '3', source: require('../assets/b3.jpeg') },
  { id: '4', source: require('../assets/b4.jpeg') },
  { id: '5', source: require('../assets/b5.jpeg') },
  { id: '6', source: require('../assets/b6.jpeg') },
  { id: '7', source: require('../assets/b7.jpeg') },
  { id: '8', source: require('../assets/b8.jpeg') },
  { id: '9', source: require('../assets/b9.jpeg') },
  { id: '10', source: require('../assets/b10.jpeg') },
];

const StoriesScreen = () => {
  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.imageContainer}>
      <Image source={item.source} style={styles.image} />
      <Text style={styles.caption}>Story {item.id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}  // Display 2 images per row
        key="2-cols"  // Add a fixed key to force re-render if numColumns changes
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  image: {
    width: (width - 40) / 2, // Adjust image width to fit 2 images per row
    height: 200,  // Adjust image height
    borderRadius: 15,
  },
  caption: {
    marginTop: 5,
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StoriesScreen;
