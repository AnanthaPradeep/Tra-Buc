import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import Layout from '../components/Layout';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigationContext } from '../Context/NavigationContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { hasNavigated, setHasNavigated } = useNavigationContext();
  const [isLoading, setIsLoading] = useState(true); // Show loading initially

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasNavigated) {
        setHasNavigated(true);
        navigation.navigate('LanguageScreen');
      }
    }, 2008080); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, [hasNavigated, navigation, setHasNavigated]);

  return (
    <Layout>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/backgrounds/bg13.png')} style={styles.backgroundImage} resizeMode="cover">
          <View style={styles.overlay} />
          
          {/* Centered Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logos/logo71.png')} style={styles.logo} resizeMode="contain" />
          </View>

          {/* Bottom Section (Spinner & Arrow) */}
          <View style={styles.bottomContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" style={styles.loader} />
            ) : (
              <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.navigate('LanguageScreen')}>
                <Icon name="arrow-right" size={30} color="#fff" />
              </TouchableOpacity>
            )}
          </View>

        </ImageBackground>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',  // Apply the color overlay
    opacity: 0.1, 
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  arrowButton: {
    backgroundColor: '#008080',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 80,
    padding: 4,
    margin:10,
    width:50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
