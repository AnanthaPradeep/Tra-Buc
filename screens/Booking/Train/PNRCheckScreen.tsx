import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';

// Type for navigation
type NavigationProp = StackNavigationProp<RootStackParamList, 'PNRCheckScreen'>;

const PNRCheckScreen: React.FC = () => {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [pnrData, setPnrData] = useState<any>(null);

  const navigation = useNavigation<NavigationProp>();

  const fetchPNRStatus = async () => {
    if (pnr.length !== 10) {
      Alert.alert('Invalid PNR', 'Please enter a valid 10-digit PNR number.');
      return;
    }

    setLoading(true);
    try {
      // Replace with your API endpoint or logic to fetch PNR status
      const response = await fetch(`https://api.example.com/pnr-status/${pnr}`);
      const data = await response.json();
      setPnrData(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch PNR status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPNRDetails = () => {
    if (!pnrData) return null;

    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Train Name: {pnrData.trainName}</Text>
        <Text style={styles.detailText}>Train Number: {pnrData.trainNumber}</Text>
        <Text style={styles.detailText}>From: {pnrData.fromStation}</Text>
        <Text style={styles.detailText}>To: {pnrData.toStation}</Text>
        <Text style={styles.detailText}>Boarding Point: {pnrData.boardingPoint}</Text>
        <Text style={styles.detailText}>Reservation Upto: {pnrData.reservationUpto}</Text>
        <Text style={styles.detailText}>Journey Date: {pnrData.journeyDate}</Text>
        <Text style={styles.detailText}>Class: {pnrData.class}</Text>
        <Text style={styles.detailText}>Chart Prepared: {pnrData.chartPrepared ? 'Yes' : 'No'}</Text>
        <Text style={styles.passengerHeader}>Passenger Details:</Text>
        {pnrData.passengers.map((passenger: any, index: number) => (
          <View key={index} style={styles.passengerContainer}>
            <Text style={styles.passengerText}>Passenger {index + 1}:</Text>
            <Text style={styles.passengerText}>Booking Status: {passenger.bookingStatus}</Text>
            <Text style={styles.passengerText}>Current Status: {passenger.currentStatus}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>PNR Status Enquiry</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 10-digit PNR number"
        value={pnr}
        onChangeText={setPnr}
        keyboardType="numeric"
        maxLength={10}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={fetchPNRStatus} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Check PNR Status</Text>}
      </TouchableOpacity>
      {renderPNRDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    elevation: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  passengerHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  passengerContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  passengerText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PNRCheckScreen;
