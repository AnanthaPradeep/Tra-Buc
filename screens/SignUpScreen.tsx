import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { signUpUser, SignUpData} from '../services/authService'; // Import the SignUpData interface
import Icon from 'react-native-vector-icons/FontAwesome'; // For social media icons
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // Added phone state
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    if (!name || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      const response = await signUpUser({ name, email, password, phone });
  
      if (response.success) {
        // Store the username
        await AsyncStorage.setItem('@user_name', name);
        navigation.navigate('LandingScreen'); // Navigate to LandingScreen
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };
  

  return (
    <ImageBackground source={require('../assets/backgrounds/bg15.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>SIGNUP</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#008080"
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
          placeholderTextColor="#008080"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone} // Handling phone input
          placeholderTextColor="#008080"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGNUP</Text>
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
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.switchButtonText}>Already have an account? LOGIN</Text>
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
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 680, // Increased for better spacing
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    fontSize: 30,
    color: '#008080', // Burgundy text
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    backgroundColor:'#fff',
    paddingHorizontal:15,
    borderRadius:30,
  },
  input: {
    height: 50,
    borderColor: '#008080',
    borderWidth: 1,
    marginBottom: 10,
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

export default SignUpScreen;
