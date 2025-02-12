import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibrary } from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

interface ImageDetailScreenProps {
  route: any;
  navigation: any;
}

interface ImageDetails {
  width?: number;
  height?: number;
  format?: string;
}

const ImageDetailScreen: React.FC<ImageDetailScreenProps> = ({ route, navigation }) => {
  const { image } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [imageDetails, setImageDetails] = useState<ImageDetails>({});

  useEffect(() => {
    if (image?.imageUrl) {
      Image.getSize(
        image.imageUrl,
        (imgWidth, imgHeight) => {
          setImageDetails({ width: imgWidth, height: imgHeight });
        },
        (error) => console.error('Error fetching image size:', error)
      );
    }
  }, [image]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets?.length) {
        const selectedImage = response.assets[0];
        setImageDetails({
          width: selectedImage.width,
          height: selectedImage.height,
          format: selectedImage.type || 'Unknown',
        });
      }
    });
  };

  // Dynamically adjust the image container size based on image details
  const fullImageStyle = {
    backgroundColor: '#fff',
    width: imageDetails.width ? Math.min(imageDetails.width, width - 40) : width - 40,
    height: imageDetails.height ? Math.min(imageDetails.height, height / 1.8) : height / 1.8,
    borderRadius: 12,
    borderWidth: 2, // Equal border on all sides
    borderColor: 'white',
    margin: 10,
    padding: 10,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Image Details</Text>
        <View style={{ width: 28 }} />
      </View>

      {image?.imageUrl ? (
        <Image source={{ uri: image.imageUrl }} style={fullImageStyle} resizeMode="contain" />
      ) : (
        <Text style={styles.errorText}>Image not available</Text>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{image?.name || 'No Name Available'}</Text>
        <Text style={styles.description}>{image?.description || 'No Description'}</Text>
        <Text style={styles.location}>Location: {image?.location || 'Unknown'}</Text>

        {imageDetails.width && imageDetails.height && (
          <Text style={styles.metadata}>
            Resolution: {imageDetails.width}x{imageDetails.height}
          </Text>
        )}
        {imageDetails.format && <Text style={styles.metadata}>Format: {imageDetails.format}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Ionicons name="create-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="share-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="image-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Image</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#008080', alignItems: 'center', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 15 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  detailsContainer: { width: '100%', backgroundColor: '#ffffff', padding: 15, borderRadius: 12, marginVertical: 15, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#008080', marginBottom: 5 },
  description: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 5 },
  location: { fontSize: 16, color: '#008080', fontWeight: '500', marginBottom: 5 },
  metadata: { fontSize: 14, color: '#777' },
  errorText: { fontSize: 18, color: 'red', marginTop: 20 },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  button: { flexDirection: 'row', backgroundColor: 'rgba(2, 59, 59, 0.91)', padding: 10,borderColor:'#fff',borderWidth:2, borderRadius: 50, marginHorizontal: 10, alignItems: 'center' },
  buttonText: { color: 'white', marginLeft: 5, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#ffffff', padding: 20, borderRadius: 12, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  modalButton: { backgroundColor: '#008080', padding: 10, borderRadius: 8, marginTop: 10 },
  modalButtonText: { color: 'white', fontWeight: 'bold' },
});

export default ImageDetailScreen;
