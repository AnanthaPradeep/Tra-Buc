import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import { RootStackParamList, ImageType } from '../types'; // Import types

const ImageScreen: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]); // State to store images
  const [isLoading, setIsLoading] = useState(true); // Loading state
  
  // Use the correct navigation type for ImageScreen
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ImageScreen'>>(); 

  const transformUrl = (url: string) => {
    if (url.includes('localhost')) {
      console.log(`Transforming URL: ${url}`);
      return url.replace('localhost', '192.168.18.43'); // Replace with your server's IP address
    }
    return url;
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://192.168.18.43:2510/images/uploads?page=1&limit=6');
      const imagesData = response.data;

      if (Array.isArray(imagesData)) {
        setImages(imagesData);
        console.log('API Response:', response.data);
      } else {
        console.warn('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      Alert.alert('Error', 'Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      const response = await axios.delete(`http://192.168.18.43:2510/images/uploads/${imageId}`);
      console.log(response.data.message);
      Alert.alert('Success', 'Image deleted successfully');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      Alert.alert('Error', 'Failed to delete image');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Add a function to handle navigation and pass image data
  const handleImageClick = (image: ImageType) => {
    navigation.navigate('ImageDetailScreen', { image }); // Correct navigation and parameter types
  };

  const renderItem = ({ item }: { item: ImageType }) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => handleImageClick(item)}>
        <Image
          source={{ uri: transformUrl(item.imageUrl) }}
          style={styles.image}
          resizeMode="cover"
          onError={(e) => {
            console.error('Error loading image:', e.nativeEvent.error);
            Alert.alert('Error', `Failed to load image: ${item.imageUrl}`);
          }}
        />
      </TouchableOpacity>
      <Text style={styles.imageName}>{item.name || 'No Name Available'}</Text>
      <Text style={styles.imageDescription}>{item.description || 'No Description Available'}</Text>
      <Text style={styles.imageLocation}>{item.location || 'No Location Available'}</Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteImage(item._id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  list: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  imageName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
  },
  imageDescription: {
    fontSize: 12,
    color: '#666',
  },
  imageLocation: {
    fontSize: 12,
    color: '#007BFF',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF4D4D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ImageScreen;
