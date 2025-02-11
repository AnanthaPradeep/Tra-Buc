import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import RNPickerSelect from 'react-native-picker-select'; // Picker for offer type
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'; // Axios for HTTP requests
import Icon from 'react-native-vector-icons/AntDesign'; // Importing AntDesign icons

type OfferCardScreenRouteProp = RouteProp<RootStackParamList, 'OfferCard'>;

type OfferCardProps = {
  route: OfferCardScreenRouteProp;
  navigation: any;
};

const OfferCard: React.FC<OfferCardProps> = ({ route, navigation }) => {
  const { category } = route.params; // Extract category if needed later

  const offerTypes = ['Train Offers', 'Bus Offers', 'Car Offers', 'Bike Offers', 'Flight Offers', 'Stay Offers']; // Predefined offer types

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [selectedOfferType, setSelectedOfferType] = useState(''); // Selected offer type
  const [imageUri, setImageUri] = useState<string | null>(null); // Image URI
  const [offerDescription, setOfferDescription] = useState(''); // Offer description
  const [offers, setOffers] = useState<any[]>([]); // Store fetched offers
  const [expandedOfferType, setExpandedOfferType] = useState<string | null>(null); // Track expanded offer category
  const [imagePreviewUri, setImagePreviewUri] = useState<string | null>(null); // State to show image preview in a modal

  
  // Fetch offers from the backend on component mount
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://192.168.18.43:2510/offerImages/offerImages');
        if (Array.isArray(response.data)) {
          setOffers(response.data); // Update offers state
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  // Open image picker to select an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri); // Set the selected image URI
    }
  };

  // Save the offer data (including image)
  const saveOffer = async () => {
    if (!selectedOfferType || !imageUri || !offerDescription) {
      Alert.alert('Error', 'Please fill all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('offerType', selectedOfferType);
    formData.append('description', offerDescription);

    try {
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      const imageFile = {
        uri: imageUri,
        name: `offerImage.${fileType}`,
        type: `image/${fileType}`,
      };

      formData.append('image', imageFile as unknown as Blob);

      const postResponse = await axios.post('http://192.168.18.43:2510/offerImages/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newOffer = {
        _id: postResponse.data._id,
        imageUrl: postResponse.data.imageUrl,
        description: offerDescription,
        offerType: selectedOfferType,
      };

      setOffers((prevOffers) => [...prevOffers, newOffer]); // Update state with new offer

      Alert.alert('Success', 'Offer saved successfully!');
      setModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Error saving offer:', error);
      Alert.alert('Error', 'Failed to save offer.');
    }
  };

  // Toggle the visibility of offers for each category
  const toggleExpand = (offerType: string) => {
    setExpandedOfferType(prevState => (prevState === offerType ? null : offerType));
  };

  // Delete an offer
  const deleteOffer = async (offerId: string) => {
    try {
      const response = await axios.delete(`http://192.168.18.43:2510/offerImages/delete/${offerId}`);
      if (response.status === 200) {
        setOffers((prevOffers) => prevOffers.filter(offer => offer._id !== offerId));
        Alert.alert('Success', 'Offer deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      Alert.alert('Error', 'Failed to delete offer.');
    }
  };

  // Show the clicked image in preview modal
  const openImagePreview = (imageUrl: string) => {
    setImagePreviewUri(imageUrl); // Set the preview image URI
  };

  const closeImagePreview = () => {
    setImagePreviewUri(null); // Close the image preview modal
  };

  return (
    <View style={styles.container}>
      {/* Header with Offer Card Title and Add New Offer button */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Available Offers</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          {/* Use the plus circle icon */}
          <Icon name="pluscircle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {offerTypes.map((offerType, index) => (
          <View key={index} style={styles.offerContainer}>
            <View style={styles.offerHeader}>
              <Text style={styles.offerTitle}>{offerType}</Text>
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={() => toggleExpand(offerType)} // Toggle expansion on "See More"
              >
                <Text style={styles.seeMoreText}>
                  {expandedOfferType === offerType ? 'See Less' : 'See More'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Show all offers when expanded, else show limited offers */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {expandedOfferType === offerType && (
                offers
                  .filter((offer) => offer.offerType === offerType)
                  .map((offer, idx) => (
                    <View key={idx} style={styles.offerCard}>
                      {offer.imageUrl ? (
                        <TouchableOpacity onPress={() => openImagePreview(offer.imageUrl)}>
                          <Image source={{ uri: offer.imageUrl }} style={styles.imagePreview} />
                        </TouchableOpacity>
                      ) : (
                        <Text>No image available</Text>
                      )}
                      <Text style={styles.offerDescription}>{offer.description}</Text>

                      {/* Delete Button */}
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteOffer(offer._id)} // Delete the offer by its ID
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ))
              )}

              {expandedOfferType !== offerType && (
                offers
                  .filter((offer) => offer.offerType === offerType)
                  .slice(0, 3) // Show only first 3 offers when collapsed
                  .map((offer, idx) => (
                    <View key={idx} style={styles.offerCard}>
                      {offer.imageUrl ? (
                        <TouchableOpacity onPress={() => openImagePreview(offer.imageUrl)}>
                          <Image source={{ uri: offer.imageUrl }} style={styles.imagePreview} />
                        </TouchableOpacity>
                      ) : (
                        <Text>No image available</Text>
                      )}
                      <Text style={styles.offerDescription}>{offer.description}</Text>

                      {/* Delete Button */}
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteOffer(offer._id)} // Delete the offer by its ID
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ))
              )}
            </ScrollView>

            {offers.filter((offer) => offer.offerType === offerType).length === 0 && (
              <Text style={styles.noOfferText}>No offers available for {offerType}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modal for image preview */}
      <Modal
        visible={imagePreviewUri !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImagePreview}
      >
        <View style={styles.modalBackground}>
          <View style={styles.imagePreviewModal}>
            <TouchableOpacity onPress={closeImagePreview} style={styles.closeButton}>
              {/* Use the close circle icon */}
              <Icon name="closecircle" size={50} color="#333" />
            </TouchableOpacity>
            {imagePreviewUri ? (
              <Image source={{ uri: imagePreviewUri }} style={styles.imagePreviewLarge} />
            ) : (
              <Text>No image available</Text>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for adding a new offer */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Offer</Text>

            {/* Offer Type Picker */}
            <Text style={styles.inputLabel}>Select Offer Type</Text>
            <RNPickerSelect
              onValueChange={setSelectedOfferType}
              items={offerTypes.map((offer) => ({
                label: offer,
                value: offer,
              }))}
            />

            {/* Image Upload Button */}
            <Text style={styles.inputLabel}>Upload Image</Text>
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Choose Image</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

            {/* Offer Description Input */}
            <Text style={styles.inputLabel}>Offer Description</Text>
            <TextInput
              style={styles.input}
              value={offerDescription}
              onChangeText={setOfferDescription}
              placeholder="Enter offer description"
            />

            {/* Save Button */}
            <Button title="Save Offer" onPress={saveOffer} />

            {/* Close Modal Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Icon name="closecircle" size={30} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 30, // Reduced border radius for a smaller button
    padding: 5, // Reduced padding for a smaller button size
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  offerCard: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
  },
  imagePreview: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  imagePreviewLarge: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  imagePreviewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    position: 'relative',
    width: '80%',
    height: '80%',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  uploadButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensuring the button is above the image
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  seeMoreButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 14,
  },
  offerDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  noOfferText: {
    fontSize: 14,
    color: '#999',
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OfferCard;
