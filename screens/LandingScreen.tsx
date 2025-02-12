import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { destinations } from './PopularDestinationsScreen';
import { images } from './StoriesScreen';
import { Ionicons } from '@expo/vector-icons';


type LandingScreenNavigationProp = DrawerNavigationProp<any, 'LandingScreen'>;

const LandingScreen: React.FC = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  const renderPopularDestination = ({ item }: { item: typeof destinations[0] }) => (
    <TouchableOpacity
      style={styles.popularDestinationCard}
      onPress={() => navigation.navigate('PopularDestinationsScreen')}
    >
      <Image source={item.image} style={styles.popularDestinationImage} />
      <Text style={styles.popularDestinationName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderStoriesItem = ({ item }: { item: typeof images[0] }) => (
    <View style={styles.imageContainer}>
      <Image source={item.source} style={styles.image} />
      <Text style={styles.caption}>Story {item.id}</Text>
    </View>
  );

  const openMenu = () => {
    navigation.openDrawer();
  };

  const openImgUpd = () => {
    navigation.navigate('UploadImage');
  };

  const openLang = () => {
    navigation.navigate('TranslatorScreen');
  };

  const openWallet = () => {
    navigation.navigate('PaymentLandingScreen');
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: string }) => {
    switch (item) {
      case 'Section 1':
        return (
          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>Bucket List of Your's</Text>
            <FlatList
              data={destinations}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image source={item.image} style={styles.cardImage} />
                  <Text style={styles.cardText}>{item.name}</Text>
                  <Text style={styles.cardText}>{item.description}</Text>
                  <TouchableOpacity
                    style={styles.smallSeeMoreButton}
                    onPress={() => navigation.navigate('PopularDestinationsScreen')}
                  >
                    <Text style={styles.smallSeeMoreText}>See More</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularDestinationList}
            />
            <TouchableOpacity
              style={styles.smallSeeMoreButton}
              onPress={() => navigation.navigate('PopularDestinationsScreen')}
            >
              <Text style={styles.smallSeeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Section 2':
        return (
          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <FlatList
              data={destinations}
              renderItem={renderPopularDestination}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularDestinationList}
            />
            <TouchableOpacity
              style={styles.smallSeeMoreButton}
              onPress={() => navigation.navigate('PopularDestinationsScreen')}
            >
              <Text style={styles.smallSeeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Section 3':
        return (
          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>Next Destination of Your's</Text>
            <FlatList
              data={destinations}
              renderItem={renderPopularDestination}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularDestinationList}
            />
            <TouchableOpacity
              style={styles.smallSeeMoreButton}
              onPress={() => navigation.navigate('PopularDestinationsScreen')}
            >
              <Text style={styles.smallSeeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Section 4':
        return (
          <View style={styles.containerSection}>
            <Text style={styles.sectionTitle}>Stories of Memories</Text>
            <FlatList
              data={images.slice(0,6)}
              renderItem={renderStoriesItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesList}
            />
            <TouchableOpacity
              style={styles.smallSeeMoreButton}
              onPress={() => navigation.navigate('StoriesScreen')}
            >
              <Text style={styles.smallSeeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.langIcon} onPress={openLang}>
          <Icon name="language" size={24} color="#fff"  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIcon} onPress={openMenu}>
          <Icon name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.walletIcon} onPress={openWallet}>
          <Ionicons name="wallet" size={24} color="#fff"  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon name="bell" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.plusIcon} onPress={openImgUpd}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

       {/* Background Image */}
       <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('../assets/i19.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      {/* Container for Title and Search Box */}
      <View style={styles.overlayContainer}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/logos/t28.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.searchBoxContainer}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search"
            placeholderTextColor="#008080"
          />
          <TouchableOpacity style={styles.micIcon}>
            <Icon name="microphone" size={20} color="#008080" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraIcon}>
            <Icon name="camera" size={20} color="#008080" />
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList for Scrollable Content */}
      <FlatList
        data={['Section 1', 'Section 2', 'Section 3', 'Section 4']}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
      />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('LandingScreen')}>
          <Icon name="home" size={20} color="#fff" />
          <Text style={styles.footerIconLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('BookingScreen')}>
          <Icon name="bookmark" size={20} color="#fff" />
          <Text style={styles.footerIconLabel}>Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CameraScreen')}>
          <Icon name="camera" size={20} color="#fff" />
          <Text style={styles.footerIconLabel}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CartScreen')}>
          <Icon name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.footerIconLabel}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="user" size={20} color="#fff" />
          <Text style={styles.footerIconLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' }, // Light gold background
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#008080', // Burgundy header
    borderBottomColor: '#fff',
    height: 50,
  },
  menuIcon: { position: 'absolute', left: 10 },
  langIcon: { position: 'absolute', right: 150 },
  walletIcon: { position: 'absolute', right: 50 },
  plusIcon: { position: 'absolute', right: 100 },
  notificationIcon: { position: 'absolute', right: 10 },
  backgroundContainer: { height: 210, overflow: 'hidden' },
  backgroundImage: { width: '100%', height: '100%', justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(250,229, 195, 0.1)' },
  overlayContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  logoWrapper: {
    // backgroundColor: 'rgba(47, 46, 48, 0.5)',
    paddingVertical: 15,
    paddingHorizontal: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 220,
    height: 72.5,
    resizeMode: 'contain',
  },
  searchBoxContainer: { width: '80%', marginTop: 20, position: 'relative' },
  searchBox: { width: '100%', paddingVertical: 10, paddingLeft: 45, paddingRight: 45, borderRadius: 25, backgroundColor: '#fff', fontSize: 16, borderColor: '#008080', borderWidth: 1, color: '#008080' },
  micIcon: { position: 'absolute', left: 15, top: '50%', transform: [{ translateY: -10 }] },
  cameraIcon: { position: 'absolute', right: 15, top: '50%', transform: [{ translateY: -10 }] },
  scrollContent: { paddingBottom: 80 },
  containerSection: { padding: 10, marginTop: 0 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#008080' },
  card: { width: 165, height: 370, marginBottom: 25, marginRight: 10, borderRadius: 10, borderWidth: 3, borderColor: '#008080', overflow: 'hidden', padding: 5, backgroundColor: '#fff' },
  cardImage: { width: '100%', height: 200, borderRadius: 10 },
  cardText: { fontSize: 14, textAlign: 'center', marginVertical: 10, color: '#008080' },
  smallSeeMoreButton: { marginTop: 5, paddingVertical: 5, backgroundColor: '#008080', borderRadius: 15, alignItems: 'center', marginHorizontal: 130 },
  smallSeeMoreText: { fontSize: 12, color: '#fff', fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#008080', // Burgundy footer
    borderTopWidth: 1,
    borderTopColor: '#fff',
    paddingHorizontal: 20,
  },
  iconButton: { justifyContent: 'center', alignItems: 'center' },
  footerIconLabel: { fontSize: 12, color: '#fff', marginTop: 2 },
  popularDestinationList: { paddingVertical: 10 },
  popularDestinationCard: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 150,
    backgroundColor: '#fff',
    borderColor: '#008080',
    borderWidth: 2,
  },
  popularDestinationImage: { width: '100%', height: 100, borderRadius: 10 },
  popularDestinationName: { textAlign: 'center', marginTop: 5, fontSize: 14, fontWeight: 'bold', color: '#008080' },
  storiesList: { paddingVertical: 20, backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 10, borderWidth: 2, borderColor: '#008080', justifyContent: 'center', alignItems: 'center' },
  imageContainer: { margin: 10, alignItems: 'center', width: '45%' },
  image: { width: '100%', height: 200, borderRadius: 15 },
  caption: { marginTop: 10, color: '#008080', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
});

export default LandingScreen;
