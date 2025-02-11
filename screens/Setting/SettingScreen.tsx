import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';

// Dummy function to simulate navigation
const navigateTo = (screen: string) => {
  console.log(`Navigating to ${screen}`);
};

const SettingsScreen = () => {
  // State for toggles and switches
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isAutoUpdateEnabled, setIsAutoUpdateEnabled] = useState(true);
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(false);
  const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Common Header Title */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* User Account Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>User Account</Text>
        <TouchableOpacity onPress={() => navigateTo('EditProfile')}>
          <Text style={styles.option}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('ChangePassword')}>
          <Text style={styles.option}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('ManageLinkedAccounts')}>
          <Text style={styles.option}>Manage Linked Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('DeleteAccount')}>
          <Text style={styles.option}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* App Preferences Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>App Preferences</Text>
        <TouchableOpacity onPress={() => navigateTo('Language')}>
          <Text style={styles.option}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Currency')}>
          <Text style={styles.option}>Currency</Text>
        </TouchableOpacity>
        <View style={styles.optionRow}>
          <Text style={styles.option}>Theme</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
        <View style={styles.optionRow}>
          <Text style={styles.option}>Notifications</Text>
          <Switch value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled} />
        </View>
        <TouchableOpacity onPress={() => navigateTo('ContentSettings')}>
          <Text style={styles.option}>Content Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy and Security Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>Privacy and Security</Text>
        <View style={styles.optionRow}>
          <Text style={styles.option}>Two-Factor Authentication</Text>
          <Switch value={isTwoFactorAuthEnabled} onValueChange={setIsTwoFactorAuthEnabled} />
        </View>
        <TouchableOpacity onPress={() => navigateTo('PrivacySettings')}>
          <Text style={styles.option}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('BlockedUsers')}>
          <Text style={styles.option}>Blocked Users</Text>
        </TouchableOpacity>
        <View style={styles.optionRow}>
          <Text style={styles.option}>App Lock</Text>
          <Switch value={isAppLockEnabled} onValueChange={setIsAppLockEnabled} />
        </View>
      </View>

      {/* General Settings Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>General Settings</Text>
        <TouchableOpacity onPress={() => navigateTo('DataUsage')}>
          <Text style={styles.option}>Data Usage</Text>
        </TouchableOpacity>
        <View style={styles.optionRow}>
          <Text style={styles.option}>Auto-update</Text>
          <Switch value={isAutoUpdateEnabled} onValueChange={setIsAutoUpdateEnabled} />
        </View>
        <TouchableOpacity onPress={() => navigateTo('RegionTimezone')}>
          <Text style={styles.option}>Region/Time Zone</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('StorageManagement')}>
          <Text style={styles.option}>Storage Management</Text>
        </TouchableOpacity>
      </View>

      {/* Support and Help Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>Support and Help</Text>
        <TouchableOpacity onPress={() => navigateTo('FAQs')}>
          <Text style={styles.option}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('ContactSupport')}>
          <Text style={styles.option}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Feedback')}>
          <Text style={styles.option}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('ReportProblem')}>
          <Text style={styles.option}>Report a Problem</Text>
        </TouchableOpacity>
      </View>

      {/* Legal and Policy Information Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>Legal and Policy Information</Text>
        <TouchableOpacity onPress={() => navigateTo('PrivacyPolicy')}>
          <Text style={styles.option}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('TermsOfService')}>
          <Text style={styles.option}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Licenses')}>
          <Text style={styles.option}>Licenses</Text>
        </TouchableOpacity>
      </View>

      {/* About App Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.header}>About App</Text>
        <TouchableOpacity onPress={() => navigateTo('AppVersion')}>
          <Text style={styles.option}>App Version</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('DeveloperInfo')}>
          <Text style={styles.option}>Developer Information</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('UpdateCheck')}>
          <Text style={styles.option}>Check for Updates</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Section */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => navigateTo('Logout')}>
          <Text style={[styles.option, styles.logout]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080',
  },
  headerContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008080',
  },
  sectionContainer: {
    width:'80%',
    left:'10%',    
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#f9f9f9', // Optional: for differentiating the sections
    borderRadius: 8,
    shadowColor: '#008080',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignContent:'center'
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  option: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#008080',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logout: {
    color: 'red',
  },
});

export default SettingsScreen;
