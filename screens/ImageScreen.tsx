import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, Image, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, 
  ImageBackground
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ImageType } from '../types';
import { Ionicons } from '@expo/vector-icons';

const SERVER_IP = '192.168.18.43';
const API_URL = `http://${SERVER_IP}:2510/images/uploads`;

const ImageScreen: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ImageScreen'>>();

  const transformUrl = (url: string) => url.replace('localhost', SERVER_IP);

  const fetchImages = async (pageNum = 1) => {
    if (!hasMore) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}?page=${pageNum}&limit=10`);
      
      if (Array.isArray(response.data)) {
        setImages(prev => (pageNum === 1 ? response.data : [...prev, ...response.data]));
        setHasMore(response.data.length === 10);
      } else {
        console.warn('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      Alert.alert('Error', 'Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = () => hasMore && setPage(prev => prev + 1);

  const deleteImage = async (imageId: string) => {
    try {
      await axios.delete(`${API_URL}/${imageId}`);
      Alert.alert('Success', 'Image deleted successfully');
      fetchImages(1);
    } catch (error) {
      console.error('Error deleting image:', error);
      Alert.alert('Error', 'Failed to delete image');
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const renderItem = ({ item }: { item: ImageType }) => (
    <View style={styles.imageCard}>
      <TouchableOpacity onPress={() => navigation.navigate('ImageDetailScreen', { image: item })}>
        <Image source={{ uri: transformUrl(item.imageUrl) }} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.label}><Text style={styles.bold}>Name:</Text> {item.name || 'No Name Available'}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Description:</Text> {item.description || 'No Description Available'}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Location:</Text> {item.location || 'No Location Available'}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(item._id)}>
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
<ImageBackground 
  source={require('../assets/backgrounds/bg22.jpg')} 
  style={styles.background}
>
  <View style={styles.headerContainer}>
    <View style={styles.headerOverlay} />
    <Text style={styles.header}>Gallery</Text>
    <Text style={styles.subtitle}>View and manage your uploaded images</Text>
  </View>
</ImageBackground>


      {isLoading && page === 1 ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      ) : (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.list}
          ListFooterComponent={
            hasMore ? (
              <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreImages}>
                <Text style={styles.loadMoreText}>See More</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('UploadImage')}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#008080',
  },
  background: {
    width: '100%',
    height: 150, 
    position: 'relative', // Ensure it stays behind the content
    top: 0,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,

  },
  
  headerContainer: {
    width: '100%',
    height: 150, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    overflow: 'hidden', // Ensures the curve is applied
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  
  headerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',

  },
  
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 2,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
    zIndex: 2,
    fontWeight: '500',
  },
  list: {
    paddingBottom: 100,
    marginTop: 10,
  },
  imageCard: {
    flex: 1,
    margin: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    height: 290, // Increased card height

  },
  image: {
    width: 140,
    height: 170,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  imageName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  imageDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  imageLocation: {
    fontSize: 12,
    color: '#007BFF',
    marginTop: 3,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4D4D',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#008080',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  loadMoreButton: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#007070',
    alignItems: 'center',
    borderRadius: 5,
  },
  loadMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ImageScreen;
