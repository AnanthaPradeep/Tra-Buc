import { StackNavigationProp } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';  // Import ImageSourcePropType

// RootStackParamList type defines all the routes and their parameters
export type RootStackParamList = {
  TranslatorScreen: undefined;
  PaymentLandingScreen:undefined;
  PNRCheckScreen:undefined;
  BusLandingScreen:undefined;
  CarLandingScreen:undefined;
  SettingScreen: undefined;
  CurrencyScreen: undefined;
  LoginScreen: undefined;  // LoginScreen doesn't require any params
  SignUpScreen: undefined;  // SignUpScreen doesn't require any params
  HomeScreen: undefined;  // HomeScreen doesn't require any params
  LanguageScreen: undefined;  // LanguageScreen doesn't require any params
  AboutScreen: { selectedLanguage: string; selectedRegion: string; selectedCurrency: string }; // AboutScreen expects params
  LandingScreen: undefined;  // LandingScreen doesn't require any params
  BookingScreen: { offers: { [key: string]: any[] } }; // BookingScreen expects offers parameter
  CartScreen: undefined;  // CartScreen doesn't require any params
  CameraScreen: undefined;  // CameraScreen doesn't require any params
  ProfileScreen: undefined;  // ProfileScreen doesn't require any params
  PopularDestinationsScreen: undefined;  // PopularDestinationsScreen doesn't require any params
  DestinationDetailsScreen: { destination: Destination };  // DestinationDetailsScreen expects a destination parameter
  TrainScreen: undefined;  // TrainScreen doesn't require any params
  FlightLandingScreen: undefined;  // FlightScreen doesn't require any params
  MenuScreen: undefined;  // MenuScreen doesn't require any params
  StoriesScreen: undefined;  // StoriesScreen doesn't require any params
  UploadImage: undefined;  // UploadImage doesn't require any params
  ImageScreen: undefined;  // ImageScreen doesn't require any params
  ImageDetailScreen: { image: ImageType };  // ImageDetailScreen expects an image object parameter
  OfferCard: { category: string };  // OfferCard expects category parameter
  TrainLandingScreen: undefined;  // TrainLandingScreen doesn't require any params
  LiveTrainStatus: undefined;  // LiveTrainStatus doesn't require any params
  PNRCheck: undefined;  // PNRCheck doesn't require any params
  LiveStation: undefined;  // LiveStation doesn't require any params
  StationSearch: undefined;  // StationSearch doesn't require any params
  SeatAvailability: undefined;  // SeatAvailability doesn't require any params
  TrainFare: undefined;  // TrainFare doesn't require any params
  StationToCode: undefined;  // StationToCode doesn't require any params
  CodeToStation: undefined;  // CodeToStation doesn't require any params
  AutoCompleteStation: undefined;  // AutoCompleteStation doesn't require any params
  AllTrainsOnStation: undefined;  // AllTrainsOnStation doesn't require any params
  TrainNumberInfo: undefined;  // TrainNumberInfo doesn't require any params
  TrainSchedule: undefined;  // TrainSchedule doesn't require any params
  NumberToName: undefined;  // NumberToName doesn't require any params
  NameToNumber: undefined;  // NameToNumber doesn't require any params
  CancelledTrains: undefined;  // CancelledTrains doesn't require any params
  PartiallyCancelled: undefined;  // PartiallyCancelled doesn't require any params
  RescheduledTrains: undefined;  // RescheduledTrains doesn't require any params
  DivertedTrains: undefined;  // DivertedTrains doesn't require any params
  SpecialTrains: undefined;  // SpecialTrains doesn't require any params
  HeritageTrains: undefined;  // HeritageTrains doesn't require any params
  RajdhaniTrain: undefined;  // RajdhaniTrain doesn't require any params
  ShatabdiTrains: undefined;  // ShatabdiTrains doesn't require any params
  MailExpressTrains: undefined;  // MailExpressTrains doesn't require any params
  GaribRathTrains: undefined;  // GaribRathTrains doesn't require any params
  PremiumTrains: undefined;  // PremiumTrains doesn't require any params
  SuperfastTrains: undefined;  // SuperfastTrains doesn't require any params
  TrainHistory: undefined;  // TrainHistory doesn't require any params
  AverageDelay: undefined;  // AverageDelay doesn't require any params
  StationOnMap: undefined;  // StationOnMap doesn't require any params
  CoachLayout: undefined;  // CoachLayout doesn't require any params
  TrackPosition: undefined;  // TrackPosition doesn't require any params
  BusDetail: { busId: number };
  Settings: undefined;
  Help: undefined;
};

// Type for the props of OfferCard, expecting a category string
export type OfferCardProps = {
  category: string;
};

// Type for Destination, which includes a name, image, and description
export type Destination = {
  id: string;  // ID of the destination
  name: string;  // Name of the destination
  image: ImageSourcePropType;  // Image for the destination
  description: string;  // Description of the destination
};

// Type for Image, with image-related fields
export interface ImageType {
  _id: string;  // Image ID
  imageUrl: string;  // URL of the image
  name: string;  // Name of the image
  description: string;  // Description of the image
  location: string;  // Location where the image was taken
}


// Type for the navigation prop of the BookingScreen
export type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,  // RootStackParamList is the navigation state type
  'BookingScreen'  // 'BookingScreen' is the specific screen to navigate to
>;

// Type for the navigation prop of the UploadImage screen
export type UploadImageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,  // RootStackParamList is the navigation state type
  'UploadImage'  // 'UploadImage' is the specific screen to navigate to
>;

// Type for the navigation prop of the ImageScreen
export type ImageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,  // RootStackParamList is the navigation state type
  'ImageScreen'  // 'ImageScreen' is the specific screen to navigate to
>;

// Type for the navigation prop of the ImageDetailScreen
export type ImageDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,  // RootStackParamList is the navigation state type
  'ImageDetailScreen'  // 'ImageDetailScreen' is the specific screen to navigate to
>;


