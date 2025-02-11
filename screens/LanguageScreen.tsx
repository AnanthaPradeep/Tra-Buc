import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../types';

type LanguageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LanguageScreen'>;

const LanguageScreen: React.FC = () => {
  const navigation = useNavigation<LanguageScreenNavigationProp>();
  const [languages, setLanguages] = useState<string[]>(['English', 'Spanish', 'French', 'German']);
  const [regions, setRegions] = useState<any[]>([
    { name: 'North America', flag: '🌎' },
    { name: 'Europe', flag: '🌍' },
    { name: 'Asia', flag: '🌏' },
    { name: 'Africa', flag: '🌍' }
  ]);
  const [currencies, setCurrencies] = useState<string[]>(['USD', 'EUR', 'GBP', 'INR']);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(''); 
  const [selectedRegion, setSelectedRegion] = useState<string>(''); 
  const [selectedCurrency, setSelectedCurrency] = useState<string>(''); 

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ImageBackground source={require('../assets/backgrounds/bg22.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={selectedLanguage} onValueChange={setSelectedLanguage} style={styles.picker}>
              <Picker.Item label="Language" value="" />
              {languages.map((lang, index) => (
                <Picker.Item key={`language-${index}`} label={lang} value={lang} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={selectedRegion} onValueChange={setSelectedRegion} style={styles.picker}>
              <Picker.Item label="Region" value="" />
              {regions.map((region, index) => (
                <Picker.Item key={`region-${index}`} label={region.name} value={region.name} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerWrapper}>
            <Picker selectedValue={selectedCurrency} onValueChange={setSelectedCurrency} style={styles.picker}>
              <Picker.Item label="Currency" value="" />
              {currencies.map((currency, index) => (
                <Picker.Item key={`currency-${index}`} label={currency} value={currency} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.mainSection}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.buttonText}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('LandingScreen')}>
            <Text style={styles.buttonText}>GUEST</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialIconsContainer}>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="google" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="facebook" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="instagram" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '75%',
    alignItems: 'center',
    marginBottom: 50,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 128, 128, 0.5)', // Burgundy background with opacity
  },
  pickerWrapper: {
    width: '90%', // Width of each picker box
    marginVertical: 10, // Vertical spacing between pickers
    alignItems: 'center',
    backgroundColor: '#fff', // Light gold background
    borderColor: '#008080', // Burgundy border color
    borderWidth: 3, // Border width
    borderRadius: 30, // Curvy edges for the entire Picker container
    overflow: 'hidden', // Ensures the rounded edges are visible
  },
  picker: {
    width: '100%',
    color: '#008080', // Burgundy text color inside the Picker box
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  mainSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  loginButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 50,
    width: '45%',
    alignItems: 'center',
    borderColor: '#008080',
    borderWidth: 3,
  },
  signUpButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 50,
    width: '45%',
    alignItems: 'center',
    borderColor: '#008080',
    borderWidth: 3,
  },
  guestButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 50,
    width: '45%',
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#008080',
    borderWidth: 3,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
  socialIcon: {
    backgroundColor: '#008080', // Burgundy background for the icon container
    borderColor: '#008080', // Set the border color to burgundy
    borderWidth: 3,
    padding: 5,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonText: {
    color: '#008080',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageScreen;
