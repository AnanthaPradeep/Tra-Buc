import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'TrainLandingScreen'>;

const CarLandingScreen: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showOtherServices, setShowOtherServices] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  // Items for Other Services
  const allServices = [
    { name: "Booked Car", icon: "ticket" },
    { name: "PNR Status", icon: "list" },
    { name: "Order Food", icon: "fast-food" },
    { name: "Running Status", icon: "car" },
    { name: "Book Hotel", icon: "bed" },
    { name: "medical Service", icon: "pulse" },
    { name: "Weather Info", icon: "cloud" },
  ];

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
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Car Booking</Text>
      </View>

      {/* Navigation Options */}
      <View style={styles.navOptions}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bus" size={30} color="black" />
          <Text style={styles.navText}>Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="airplane" size={30} color="black" />
          <Text style={styles.navText}>Flights</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="train" size={30} color="black" />
          <Text style={styles.navText}>Train</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bed" size={30} color="black" />
          <Text style={styles.navText}>Hotels</Text>
        </TouchableOpacity>
      </View>

      {/* Grouped Container for Boarding, Departure, Date and Search Button */}
      <View style={styles.bookingDetailsContainer}>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Ionicons name="location" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Boarding From"
            value={from}
            onChangeText={setFrom}
          />
          
          <TouchableOpacity onPress={swapLocations}>
            <Ionicons name="swap-vertical" size={20} color="black" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Departure To"
            value={to}
            onChangeText={setTo}
          />
          <Ionicons name="location" size={20} color="black" />
        </View>

        {/* Date Selection */}
        <TouchableOpacity style={styles.datePicker}>
          <View style={styles.datePickerContent}>
            <Ionicons name="calendar" size={20} color="black" />
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
          <Text style={styles.searchButtonText}>SEARCH CARS</Text>
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
              <Ionicons name={service.icon as keyof typeof Ionicons.glyphMap} size={30} color="black" />
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
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home" size={20} color="black" style={styles.iconButton} />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="wallet" size={20} color="black" style={styles.iconButton} />
          <Text>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="briefcase" size={20} color="black" style={styles.iconButton} />
          <Text>Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="person" size={20} color="black" style={styles.iconButton} />
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="chatbubble-ellipses" size={20} color="black" style={styles.iconButton} />
          <Text>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerContainer: { alignItems: 'center', padding: 20 , backgroundColor: 'transparent'},
  otherServicesContainer: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 10, 
    margin: 10, 
    elevation: 5, // Elevation for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold',color:'#000'},
  navOptions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, top:10,backgroundColor: '#fff', marginVertical:10, marginHorizontal:10,borderRadius:20,padding:10, elevation: 5, // Elevation for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5, },
  navItem: { alignItems: 'center' },
  navText: { marginTop: 5, fontSize: 12 },
  bookingDetailsContainer: { 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    margin: 10,
    elevation: 5, // Elevation for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center', margin: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginHorizontal: 5 },
  datePicker: {borderWidth: 1,borderColor: '#ccc',padding: 10,margin: 10,borderRadius: 5,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'},
  datePickerContent: {flexDirection: 'row',alignItems: 'center',flex: 1},
  datePickerText: { fontSize: 14,color: '#333',marginLeft: 10},
  dateButtonsContainer: {flexDirection: 'row',justifyContent: 'flex-end', alignItems: 'center'},
  dateButton: {fontSize: 12,color: 'black',backgroundColor: '#8888', marginLeft: 10,padding:5, borderRadius:10},
  searchButton: { backgroundColor: '#000', padding: 15, margin: 10,marginHorizontal:90, borderRadius: 50, alignItems: 'center' },
  searchButtonText: { color: 'white', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceItem: { alignItems: 'center', width: '30%', marginVertical: 10 },
  serviceText: { marginTop: 5, fontSize: 12 },
  arrowContainer: { alignItems: 'center', marginTop: 10 },
  footerContainer: { flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', padding: 10 },
  footerButton: { padding: 10 },
  iconButton: { padding: 10, alignItems: 'center' },
  otherServicesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 5 },
});

export default CarLandingScreen;
