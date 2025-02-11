import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../components/Layout';

type AboutScreenProps = {
  route: any;
};

const AboutScreen: React.FC<AboutScreenProps> = ({ route }) => {
  const { selectedLanguage, selectedRegion, selectedCurrency } = route.params;

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Language: {selectedLanguage}</Text>
        <Text style={styles.text}>Region: {selectedRegion}</Text>
        <Text style={styles.text}>Currency: {selectedCurrency}</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
  },
});

export default AboutScreen;
