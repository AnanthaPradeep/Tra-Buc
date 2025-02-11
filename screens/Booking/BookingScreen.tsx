import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LandingScreenNavigationProp, RootStackParamList } from '../../types';


const BookingScreen = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>(); 

  const handleTrainSelect = () => {
    navigation.navigate('TrainLandingScreen');
  };

  const handleBusSelect = () => {
    navigation.navigate('BusLandingScreen');
  };

  const handleCarSelect = () => {
    navigation.navigate('CarLandingScreen');
  };

  const handleFlightSelect = () => {
    navigation.navigate('FlightLandingScreen');
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header Section with Info Container Inside */}
      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>Travel Made Easy Now</Text>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#008080" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where you will go"
            placeholderTextColor="#008080"
          />
        </View>

        {/* Info Section Inside Header Container */}
        <View style={styles.infoSectionContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Balance</Text>
            <Text style={styles.infoValue}>$18</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Rewards</Text>
            <Text style={styles.infoValue}>$10.25</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Total Trips</Text>
            <Text style={styles.infoValue}>189</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content Section */}
      <ScrollView style={styles.scrollableContent}>
        {/* Curved Background and Transport Scrollable Section */}
        <View style={styles.curvedBackground}>
          <Text style={styles.sectionTitle}>Choose your Transport</Text>
          <ScrollView horizontal contentContainerStyle={styles.transportOptionsContainer}>
            {[ 
              { name: 'Bus', image: require('../../assets/bus2.jpg'), onPress: handleBusSelect},
              { name: 'Train', image: require('../../assets/train1.jpg'), onPress: handleTrainSelect },
              { name: 'Car', image: require('../../assets/car1.jpg'), onPress: handleCarSelect },
              { name: 'Flight', image: require('../../assets/flight1.jpg'), onPress: handleFlightSelect },
              { name: 'Bike', image: require('../../assets/bike1.jpg') },
              { name: 'Ship', image: require('../../assets/ship1.jpg') },
              { name: 'Cycle', image: require('../../assets/cycle1.jpg') },
              { name: 'Auto', image: require('../../assets/auto1.png') },
            ].map((option, index) => (
              <View style={styles.transportCard} key={index}>
                <View style={styles.textSection}>
                  <Text style={styles.transportName}>{option.name}</Text>
                  <TouchableOpacity style={styles.selectButton} onPress={option.onPress}>
                    <Text style={styles.selectButtonText}>Select</Text>
                  </TouchableOpacity>
                </View>
                <Image source={option.image} style={styles.imageSection} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Stay Container */}
        <View style={styles.stayContainer}>
          <Text style={styles.sectionTitle}>Choose your Stay</Text>
          <ScrollView horizontal contentContainerStyle={styles.stayOptionsContainer}>
            {[ 
              { name: 'Premium', image: require('../../assets/hotel1.jpg') },
              { name: 'Mid-Budget', image: require('../../assets/hotel2.jpg') },
              { name: 'Low-Budget', image: require('../../assets/hotel3.jpg') },
            ].map((option, index) => (
              <View style={styles.stayCard} key={index}>
                <View style={styles.textSection}>
                  <Text style={styles.stayName}>{option.name}</Text>
                  <TouchableOpacity style={styles.selectStayButton}>
                    <Text style={styles.selectStayButtonText}>Select</Text>
                  </TouchableOpacity>
                </View>
                <Image source={option.image} style={styles.stayImageSection} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#008080', 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    overflow: 'hidden', 
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 10,
    fontFamily: 'Debrosee-ALPnL', // Apply custom font here
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#008080', 
  },

  infoSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff', 
    borderRadius: 50,
    padding: 15,
    marginTop: 20,
  },
  infoCard: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: '#008080', 
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008080', 
    marginTop: 5,
  },

  scrollableContent: {
    marginTop: 20, 
  },

  curvedBackground: {
    backgroundColor: '#008080', 
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 20,
  },
  transportOptionsContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
  },
  transportCard: {
    flexDirection: 'row',
    backgroundColor: '#fff', 
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, 
    height: 120, 
    marginRight: 15,
  },
  textSection: {
    flex: 1,
    backgroundColor: '#fff', 
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  transportName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectButton: {
    marginTop: 10,
    backgroundColor: '#008080', 
    borderRadius: 5,
    right:10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageSection: {
    flex: 1,
    height: '100%',
    resizeMode: 'stretch',
  },

  stayContainer: {
    backgroundColor: '#008080', 
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  stayOptionsContainer: {
    flexDirection: 'row',
  },
  stayCard: {
    flexDirection: 'row',
    backgroundColor: '#fff', 
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 100,
    marginRight: 15,
  },
  stayTextSection: {
    flex: 1,
    backgroundColor: '#fff', 
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 15,
    alignItems: 'center',
  },
  stayName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectStayButton: {
    marginTop: 10,
    right:10,
    backgroundColor: '#008080', 
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  selectStayButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stayImageSection: {
    flex: 1,
    height: '100%',
    resizeMode: 'stretch',
  },
});

export default BookingScreen;
