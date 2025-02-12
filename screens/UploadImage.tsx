import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { UploadImageScreenNavigationProp } from '../types';
import { Ionicons, Feather } from '@expo/vector-icons';

interface UploadImageProps {
  navigation: UploadImageScreenNavigationProp;
}

const UploadImage = ({ navigation }: UploadImageProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const fadeAnim = new Animated.Value(0);

  // Animate image preview when an image is selected
  useEffect(() => {
    if (image) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [image]);

  // Pick an image from the gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Open Camera
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload the image to the server
  const uploadImage = async () => {
    if (!image || !name || !description || !location) {
      Alert.alert('Error', 'Please fill all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'upload.jpg',
    } as any);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);

    try {
      await axios.post('http://192.168.18.43:2510/images/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Image uploaded successfully');
      setImage(null);
      setName('');
      setDescription('');
      setLocation('');
      navigation.navigate('UploadImage');

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Upload Your Image</Text>
      <Text style={styles.subtitle}>Select or capture an image to continue</Text>

      {/* Image Preview Card */}
      <View style={styles.imageCard}>
        {image ? (
          <Animated.Image
            source={{ uri: image }}
            style={[styles.image, { opacity: fadeAnim }]}
            resizeMode="cover"
          />
        ) : (
          <Feather name="image" size={50} color="#008080" />
        )}
      </View>

      {/* Upload Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Ionicons name="image" size={24} color="white" />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput
        placeholder="Image Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      {/* Action Buttons */}
      <TouchableOpacity style={styles.primaryButton} onPress={uploadImage}>
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>Cancel</Text>
      </TouchableOpacity>

      {/* See More Button */}
      <TouchableOpacity style={styles.seeMoreButton} onPress={() => navigation.navigate('ImageScreen')}>
        <Text style={styles.seeMoreText}>See More</Text>
      </TouchableOpacity>

      {/* Floating Help Icon */}
      <TouchableOpacity style={styles.helpButton} onPress={() => Alert.alert('Help', 'Select or capture an image to upload.')}>
        <Ionicons name="help-circle" size={28} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008080',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  imageCard: {
    width: 200,
    height: 200,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#008080',
    padding: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#008080',
    padding: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#008080',
    fontSize: 16,
  },
  seeMoreButton: {
    marginTop: 20,
  },
  seeMoreText: {
    color: '#008080',
    fontSize: 16,
  },
  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 30,
    elevation: 3,
  },
});

export default UploadImage;
