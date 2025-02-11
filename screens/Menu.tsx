import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing user data

type MenuNavigationProp = StackNavigationProp<RootStackParamList, 'LanguageScreen'>;

const Menu = () => {
  const [userName, setUserName] = useState<string>('Login / SignUp');
  const [userEmail, setUserEmail] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>(''); // Add profile picture state
  const navigation = useNavigation<MenuNavigationProp>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Fetch name and email from AsyncStorage
        const storedName = await AsyncStorage.getItem('@user_name');
        const storedEmail = await AsyncStorage.getItem('@user_email');
        const storedProfilePicture = await AsyncStorage.getItem('@user_profile_picture'); // Retrieve profile picture


        if (storedName) {
          setUserName(storedName); // Set the stored name
        }

        if (storedEmail) {
          setUserEmail(storedEmail); // Set the stored email
        }

        if (storedProfilePicture) {
            setProfilePicture(storedProfilePicture); // Set profile picture
          }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    checkUser();
  }, []);

  const handleLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  const handleLoginSignup = () => {
    navigation.navigate('LanguageScreen'); // Navigate to login/signup screen
  };

  const openSetting= () => {
    navigation.navigate('SettingScreen'); // Navigate to login/signup screen
  };


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user_name');
      await AsyncStorage.removeItem('@user_email');
      await AsyncStorage.removeItem('@user_profile_picture'); // Remove profile picture

      setUserName('Login / SignUp');
      setUserEmail('');
            setProfilePicture('');

    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const openLang = () => {
    navigation.navigate('TranslatorScreen');
  };

  const openCurren = () => {
    navigation.navigate('CurrencyScreen');
  };

  return (
    <ScrollView style={styles.menuContainer}>
      {/* User Info Section with Login/Signup and Avatar */}
      <View style={styles.container}>
      <TouchableOpacity onPress={handleLoginSignup} style={styles.profileContainer}>
  <View style={styles.avatarWrapper}>
    <Icon name="user" size={30} color="#fff" style={styles.profileAvatar} />
  </View>
  <View>
    <Text style={styles.userName}>{userName || 'Login / SignUp'}</Text> 
    {userEmail ? <Text style={styles.userEmail}>{userEmail}</Text> : null}
  </View>
</TouchableOpacity>


        {userName !== 'Login / SignUp' && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Navigation Items Section */}
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="user" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="headphones" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="bell" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* My Trips Section */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>My Trips</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="suitcase" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>View/Manage Trips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="heart" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Wishlist</Text>
        </TouchableOpacity>
      </View>

      {/* Rewards Section */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="gift" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Gift Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="share" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Refer & Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="calendar" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Holidays Refer & Earn</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.container}>
        <TouchableOpacity  onPress={openSetting}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Icon name="gear" size={24} color="#008080"  style={styles.gearicon}  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={openLang}>
          <Icon name="language" size={24} color="#008080" style={styles.icon}  />
          <Text style={styles.menuText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="globe" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Country</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={openCurren}>
          <Icon name="money" size={20} color="#008080" style={styles.icon} />
          <Text style={styles.menuText}>Currency INR</Text>
        </TouchableOpacity>
      </View>

      {/* Social Links Section */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Show us your love & follow</Text>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleLink('https://www.instagram.com')}>
          <Icon name="instagram" size={20} color="#E4405F" style={styles.icon} />
          <Text style={styles.menuText}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleLink('https://twitter.com')}>
          <Icon name="twitter" size={20} color="#1DA1F2" style={styles.icon} />
          <Text style={styles.menuText}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleLink('https://www.linkedin.com')}>
          <Icon name="linkedin" size={20} color="#0077B5" style={styles.icon} />
          <Text style={styles.menuText}>LinkedIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => handleLink('https://www.facebook.com')}>
          <Icon name="facebook" size={20} color="#3b5998" style={styles.icon} />
          <Text style={styles.menuText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.appVersion}>App Version 9.8.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: { flex: 1, paddingTop: 10, backgroundColor: '#fff' },
  container: {
    margin: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
  avatarWrapper: {
    backgroundColor: '#4CAF50', // Circle color for avatar
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileAvatar: {
    textAlign: 'center',
  },
  userName: {
    fontSize: 20, // Larger font size for name
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14, // Smaller font size for email
    color: '#777',
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#ff5c5c',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  menuText: { fontSize: 16, color: '#333', marginLeft: 8 },
  icon: { marginRight: 8 },
  gearicon: {
    marginLeft: 'auto',
    marginTop: -15,
    top:-15,
    },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#008080', marginBottom: 8 },
  socialButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  footer: { marginTop: 'auto', alignItems: 'center', paddingVertical: 15 },
  footerItem: { marginBottom: 8 },
  footerText: { fontSize: 16, color: '#008080' },
  appVersion: { fontSize: 12, color: '#777' },
});

export default Menu;
