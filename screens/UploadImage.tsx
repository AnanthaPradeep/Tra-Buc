import React, { useState } from 'react';
import { Button, Image, TextInput, View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { UploadImageScreenNavigationProp } from '../types';

interface UploadImageProps {
  navigation: UploadImageScreenNavigationProp;
}

const UploadImage = ({ navigation }: UploadImageProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  // Pick an image from the gallery with editing option
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Allow editing (cropping) the image
      quality: 1, // Keep the image at the highest quality
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the picked image URI
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
      type: 'image/jpeg', // or 'image/png', depending on the selected file type
      name: 'upload.jpg',
    } as any);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('location', location);

    try {
      const response = await axios.post('http://192.168.18.43:2510/images/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Success', 'Image uploaded successfully');

      // Reset all fields after successful upload
      setImage(null);
      setName('');
      setDescription('');
      setLocation('');
      
      // Optionally navigate to the same screen to "refresh" it
      navigation.navigate('UploadImage'); // Navigates to the same screen to reset the state

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />}
      
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
      <Button title="Upload Image" onPress={uploadImage} />
      
      {/* Add "See More" button to navigate to ImageScreen */}
      <Button
        title="See More"
        onPress={() => navigation.navigate('ImageScreen')} // Navigate to the ImageScreen
        color="#1E90FF"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default UploadImage;
