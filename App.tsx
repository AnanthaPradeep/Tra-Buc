import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LandingScreen from './screens/LandingScreen';
import LanguageScreen from './screens/LanguageScreen';
import AboutScreen from './screens/AboutScreen';
import BookingScreen from './screens/Booking/BookingScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './screens/CamerScreen';
import HomeScreen from './screens/HomeScreen';
import DestinationDetailsScreen from './screens/DestinationDetailsScreen';
import PopularDestinationsScreen from './screens/PopularDestinationsScreen';
import TrainScreen from './screens/Booking/Train/TrainScreen';
import Menu from './screens/Menu';
import StoriesScreen from './screens/StoriesScreen';
import UploadImage from './screens/UploadImage';
import ImageScreen from './screens/ImageScreen';
import ImageDetailScreen from './screens/ImageDetailScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import OfferCard from './screens/Booking/OfferCard';
import { RootStackParamList } from './types';
import TrainLandingScreen from './screens/Booking/Train/TrainLandingScreen';
import TranslatorScreen from './screens/TranslatorScreen';
import CurrencyScreen from './screens/CurrencyScreen';
import SettingScreen from './screens/Setting/SettingScreen';
import PNRCheckScreen from './screens/Booking/Train/PNRCheckScreen';
import BusLandingScreen from './screens/Booking/Bus/BusLandingScreen';
import CarLandingScreen from './screens/Booking/Car/CarLandingScreen';
import FlightLandingScreen from './screens/Booking/Flight/FlightLandingScreen';
import { NavigationProvider } from './Context/NavigationContext';
import PaymentLandingScreen from './screens/Payment/PaymentLandingScree';

const Stack = createStackNavigator<RootStackParamList>();  
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={() => <Menu />} >
      <Drawer.Screen name="DrawerLandingScreen" component={LandingScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LandingScreen" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="CurrencyScreen" component={CurrencyScreen} />
          <Stack.Screen name="DestinationDetailsScreen" component={DestinationDetailsScreen} />
          <Stack.Screen name="PopularDestinationsScreen" component={PopularDestinationsScreen} />
          <Stack.Screen name="TrainScreen" component={TrainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FlightLandingScreen" component={FlightLandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TrainLandingScreen" component={TrainLandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="StoriesScreen" component={StoriesScreen} />
          <Stack.Screen name="UploadImage" component={UploadImage} />
          <Stack.Screen name="ImageScreen" component={ImageScreen} />
          <Stack.Screen name="ImageDetailScreen" component={ImageDetailScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="SignUpScreen" component={SignUpScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="OfferCard" component={OfferCard}  options={{ headerShown: false }}/>
          <Stack.Screen name="TranslatorScreen" component={TranslatorScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="SettingScreen" component={SettingScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="PNRCheckScreen" component={PNRCheckScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="BusLandingScreen" component={BusLandingScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="CarLandingScreen" component={CarLandingScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="PaymentLandingScreen" component={PaymentLandingScreen}  options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationProvider>
  );
};

export default App;
