import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

interface LayoutProps {
  children: React.ReactNode; // Allow passing child components
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f8f9fa', // Light background color
  },
});

export default Layout;
