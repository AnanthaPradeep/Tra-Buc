import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';  // Updated import

// Define the navigation type
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define the features array with screen names, icons, and optional params
const features = [
  { id: '1', name: 'Live Train Status', icon: 'train', screen: 'LiveTrainStatus', params: {} },
  { id: '2', name: 'PNR Check', icon: 'ticket-confirmation', screen: 'PNRCheck', params: {} },
  { id: '3', name: 'Live Station', icon: 'train-car', screen: 'LiveStation', params: {} },
  { id: '4', name: 'Station Search', icon: 'magnify', screen: 'StationSearch', params: {} },
  { id: '5', name: 'Seat Availability', icon: 'seat-recline-normal', screen: 'SeatAvailability', params: {} },
  { id: '6', name: 'Train Fare', icon: 'currency-inr', screen: 'TrainFare', params: {} },
  { id: '7', name: 'Station Name To Code', icon: 'map-marker', screen: 'StationToCode', params: {} },
  { id: '8', name: 'Station Code To Name', icon: 'map-marker', screen: 'CodeToStation', params: {} },
  { id: '9', name: 'Auto Complete Station', icon: 'keyboard', screen: 'AutoCompleteStation', params: {} },
  { id: '10', name: 'All Trains On Station', icon: 'train-variant', screen: 'AllTrainsOnStation', params: {} },
  { id: '11', name: 'Train No. Information', icon: 'train', screen: 'TrainNumberInfo', params: {} },
  { id: '12', name: 'Train Schedule', icon: 'calendar-clock', screen: 'TrainSchedule', params: {} },
  { id: '13', name: 'Train No. To Name', icon: 'train-car', screen: 'NumberToName', params: {} },
  { id: '14', name: 'Train Name To Number', icon: 'train-car', screen: 'NameToNumber', params: {} },
  { id: '15', name: 'Cancelled Trains', icon: 'alert-circle', screen: 'CancelledTrains', params: {} },
  { id: '16', name: 'Partially Cancelled Trains', icon: 'alert-circle-outline', screen: 'PartiallyCancelled', params: {} },
  { id: '17', name: 'Rescheduled Trains', icon: 'calendar-edit', screen: 'RescheduledTrains', params: {} },
  { id: '18', name: 'Diverted Trains', icon: 'map-marker-distance', screen: 'DivertedTrains', params: {} },
  { id: '19', name: 'Special Trains', icon: 'star-circle', screen: 'SpecialTrains', params: {} },
  { id: '20', name: 'Heritage Trains', icon: 'train', screen: 'HeritageTrains', params: {} },
  { id: '21', name: 'Rajdhani Train', icon: 'train', screen: 'RajdhaniTrain' },
  { id: '22', name: 'Shatabdi Trains', icon: 'train', screen: 'ShatabdiTrains' },
  { id: '23', name: 'Mail Express Trains', icon: 'train', screen: 'MailExpressTrains' },
  { id: '24', name: 'Garib Rath Trains', icon: 'train-car', screen: 'GaribRathTrains' },
  { id: '25', name: 'Premium Trains', icon: 'crown', screen: 'PremiumTrains' },
  { id: '26', name: 'Superfast Trains', icon: 'speedometer', screen: 'SuperfastTrains' },
  { id: '27', name: 'Train History', icon: 'history', screen: 'TrainHistory' },
  { id: '28', name: 'Average Delay Of Train', icon: 'timer-sand', screen: 'AverageDelay' },
  { id: '29', name: 'Station Location On Map', icon: 'map', screen: 'StationOnMap' },
  { id: '30', name: 'Coach Layout', icon: 'vector-square', screen: 'CoachLayout' },
  { id: '31', name: 'Coach Position', icon: 'train-car', screen: 'CoachPosition' },
];

// The TrainScreen component
const TrainScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Navigation handler function with conditional logic
  const handleNavigation = (screen: string, params?: any) => {
    navigation.navigate(screen, params);
  };

  // Render the individual feature cards in the FlatList
  const renderFeature = ({ item }: { item: typeof features[0] }) => (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() => handleNavigation(item.screen, item.params)} // Pass params along with the screen name
    >
      <Icon name={item.icon} size={36} color="#007bff" />
      <Text style={styles.featureText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Train Services</Text>
      <FlatList
        data={features}
        renderItem={renderFeature}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.featureList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  featureList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  featureText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default TrainScreen;
