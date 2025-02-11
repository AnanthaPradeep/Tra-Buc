import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../services/authService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      console.log('Login attempt with:', { email, password });
  
      const response = await loginUser({ email, password });
      console.log('Login response:', response);
  
      // Log the full response to see its structure
      console.log('Full Response:', response);
  
      // Check if response contains message, token, and user name
      if (response && response.message === 'Login successful' && response.token && response.user.name) {
        console.log('Login successful, storing username, email, and token');
  
        // Store the user's name and email in AsyncStorage
        await AsyncStorage.setItem('@user_name', response.user.name);  // Store name
        await AsyncStorage.setItem('@user_email', email);  // Store email
        await AsyncStorage.setItem('@token', response.token);  // Store token
  
        navigation.navigate('LandingScreen');
      } else {
        console.log('Login failed:', response.message);
        Alert.alert('Error', response.message);  // Show alert for error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };
  
  
  
  
  return (
    <ImageBackground source={require('../assets/backgrounds/bg14.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>LOGIN</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#008080"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          placeholderTextColor="#008080"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="facebook" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="instagram" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text style={styles.switchButtonText}>Don't have an account? SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 550,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    fontSize: 30,
    color: '#008080', 
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    backgroundColor:'#fff',
    paddingHorizontal:15,
    borderRadius:30,
  },
  input: {
    height: 50,
    borderColor: '#008080',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#008080',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight white tint for readability
    width: '100%',
  },
  button: {
    backgroundColor: '#008080', // Burgundy button
    padding: 15,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    width: '50%',
  },
  buttonText: {
    color: '#fff', // Light gold text
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#008080',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor:'#fff',
    padding:10,
    borderRadius:30,

  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#008080',
    borderColor: '#fff',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  switchButton: {
    marginTop: 20,
  },
  switchButtonText: {
    textAlign: 'center',
    color: '#008080',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
