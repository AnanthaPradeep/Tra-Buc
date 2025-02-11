import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import { Image } from 'react-native';


type NavigationProp = StackNavigationProp<RootStackParamList, 'TrainLandingScreen'>;

const TrainLandingScreen: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showOtherServices, setShowOtherServices] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const handleNavigateToBus = () => {
    navigation.navigate('BusLandingScreen'); // Navigate to BusLandingScreen
  };

  // Items for Other Services
  const allServices = [
    { name: "Booked Train", icon: "ticket" },
    { name: "PNR Status", icon: "list" },
    { name: "Order Food", icon: "fast-food" },
    { name: "Running Status", icon: "train" },
    { name: "Book Hotel", icon: "bed" },
    { name: "medical Service", icon: "pulse" },
    { name: "Weather Info", icon: "cloud" },
    { name: "Taxi Service", icon: "car" },
  ];

  const t1i = require('../../../assets/train/t2.png');
const t2i = require('../../../assets/train/t1.png');


  // Display services based on the show state
  const displayedServices = showOtherServices ? allServices : allServices.slice(0, 6);

  const handleChangeDate = (type: string) => {
    const newDate = new Date();
    if (type === 'tomorrow') {
      newDate.setDate(newDate.getDate() + 1); // Tomorrow
    } else if (type === 'dayAfter') {
      newDate.setDate(newDate.getDate() + 2); // Day After
    }
    setSelectedDate(newDate);
  };

  const swapLocations = () => {
    setFrom(to); // Set the "From" field to the value of "To"
    setTo(from); // Set the "To" field to the value of "From"
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Train Booking</Text>
        </View>

        {/* Navigation Options */}
        <View style={styles.navOptions}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="car" size={30} color="#008080" />
            <Text style={styles.navText}>Cars</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="airplane" size={30} color="#008080" />
            <Text style={styles.navText}>Flights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleNavigateToBus}>
            <Ionicons name="bus" size={30} color="#008080" />
            <Text style={styles.navText}>Bus</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="bed" size={30} color="#008080" />
            <Text style={styles.navText}>Hotels</Text>
          </TouchableOpacity>
        </View>

        {/* Grouped Container for Boarding, Departure, Date and Search Button */}
        <View style={styles.bookingDetailsContainer}>
          {/* Input Fields */}
          <View style={styles.inputContainer}>
  <Image source={t1i} style={styles.iconImage} />
  <TextInput
    style={styles.input}
    placeholder="Boarding From"
    placeholderTextColor={'#008080'}
    value={from}
    onChangeText={setFrom}
  />

  <TouchableOpacity onPress={swapLocations}>
    <Ionicons name="swap-vertical" size={20} color="#008080" />
  </TouchableOpacity>

  <TextInput
    style={styles.input}
    placeholder="Departure To"
    placeholderTextColor={'#008080'}
    value={to}
    onChangeText={setTo}
  />
  <Image source={t2i} style={styles.iconImage} />
</View>


          {/* Date Selection */}
          <TouchableOpacity style={styles.datePicker}>
            <View style={styles.datePickerContent}>
              <Ionicons name="calendar" size={20} color="#008080" />
              <Text style={styles.datePickerText}>{selectedDate.toDateString()}</Text>
            </View>

            <View style={styles.dateButtonsContainer}>
              <TouchableOpacity onPress={() => handleChangeDate('tomorrow')}>
                <Text style={styles.dateButton}>Tomorrow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChangeDate('dayAfter')}>
                <Text style={styles.dateButton}>Day After</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>SEARCH TRAINS</Text>
          </TouchableOpacity>
        </View>

        {/* Other Services */}
        <View style={styles.otherServicesContainer}>
          <View style={styles.otherServicesHeader}>
            <Text style={styles.sectionTitle}>Other Services</Text>
          </View>

          <View style={styles.servicesGrid}>
            {displayedServices.map((service, index) => (
              <TouchableOpacity style={styles.serviceItem} key={index}>
                <Ionicons name={service.icon as keyof typeof Ionicons.glyphMap} size={30} color="#008080" />
                <Text style={styles.serviceText}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dropdown arrow to toggle services */}
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => setShowOtherServices(!showOtherServices)}
          >
            <Ionicons
              name={showOtherServices ? "chevron-up" : "chevron-down"}
              size={30}
              color="#008080"
            />
          </TouchableOpacity>
        </View>

        {/* Offer Cards Section */}
        <View style={styles.offerCardsContainer}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          {/* Offer Card Items */}
          <View style={styles.offerCards}>
            <View style={styles.offerCard}>
              <Text style={styles.offerCardTitle}>Discount on Tickets</Text>
              <Text style={styles.offerCardDescription}>Get 10% off on your next booking!</Text>
            </View>
            <View style={styles.offerCard}>
              <Text style={styles.offerCardTitle}>Free Meal with Train Booking</Text>
              <Text style={styles.offerCardDescription}>Enjoy a free meal during your journey!</Text>
            </View>
          </View>
        </View>

        {/* What Type Container */}
        <View style={styles.whatTypeContainer}>
          <Text style={styles.sectionTitle}>What Type of Service Are You Looking For?</Text>
          <View style={styles.typeOptions}>
            <TouchableOpacity style={styles.typeOption}>
              <Text style={styles.typeOptionText}>Luxury</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.typeOption}>
              <Text style={styles.typeOptionText}>Standard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.typeOption}>
              <Text style={styles.typeOptionText}>Budget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home" size={20} color="#008080" style={styles.iconButton} />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="wallet" size={20} color="#008080" style={styles.iconButton} />
          <Text>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="briefcase" size={20} color="#008080" style={styles.iconButton} />
          <Text>Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="person" size={20} color="#008080" style={styles.iconButton} />
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="chatbubble-ellipses" size={20} color="#008080" style={styles.iconButton} />
          <Text>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }, // Light gold background
  scrollViewContent: { paddingBottom: 100 }, // Add space for footer
  headerContainer: { alignItems: 'center', padding: 20, backgroundColor: 'transparent' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#008080' }, // Burgundy text
  navOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    top: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 5, fontSize: 12, color: '#008080' }, // Burgundy text
  bookingDetailsContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center', margin: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#008080', // Burgundy border
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    color: '#008080', // Burgundy text
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#008080', // Burgundy border
    padding: 10,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  datePickerText: { fontSize: 14, color: '#008080', marginLeft: 10 }, // Burgundy text
  dateButtonsContainer: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  dateButton: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#008080', // Burgundy background
    marginLeft: 10,
    padding: 5,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: '#008080', // Burgundy button
    padding: 15,
    margin: 10,
    marginHorizontal: 90,
    borderRadius: 50,
    alignItems: 'center',
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold' }, // Light gold text
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#008080' }, // Burgundy text
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceItem: { alignItems: 'center', width: '30%', marginVertical: 10 },
  serviceText: { marginTop: 5, fontSize: 12, color: '#008080' }, // Burgundy text
  arrowContainer: { alignItems: 'center', marginTop: 10 },
  offerCardsContainer: { marginTop: 20, padding: 10 },
  offerCards: { flexDirection: 'row', justifyContent: 'space-between' },
  offerCard: { width: '45%', backgroundColor: '#fff', padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#008080' },
  offerCardTitle: { fontWeight: 'bold', color: '#008080' },
  offerCardDescription: { color: '#008080' },
  whatTypeContainer: { marginTop: 20, padding: 10 },
  typeOptions: { flexDirection: 'row', justifyContent: 'space-between' },
  typeOption: { backgroundColor: '#008080', padding: 10, borderRadius: 5, width: '30%' },
  typeOptionText: { color: '#fff', textAlign: 'center' },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  footerButton: { padding: 10 },
  iconButton: { padding: 10, alignItems: 'center', color: '#008080' }, // Burgundy icons
  otherServicesContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  otherServicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  iconImage: {
    width: 30,  // Adjust size as needed
    height: 30,
    resizeMode: 'stretch',
    marginHorizontal: 5,
  },
  
});

export default TrainLandingScreen;
