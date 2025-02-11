import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const PaymentLandingScreen = () => {
  const handlePayment = () => {
    Alert.alert("Payment Successful", "Your payment has been processed!");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Branding Section */}
      <View style={styles.brandingContainer}>
        <Text style={styles.brandText}>TRABUC Wallet</Text>
      </View>

      {/* Rewards, Wallet Balance, and Bank/Card Offers */}
      <View style={styles.rewardsContainer}>
        {/* Rewards (Cash or Bonus) */}
        <View style={styles.rewardBox}>
          <Text style={styles.rewardTitle}>Available Rewards</Text>
          <Text style={styles.rewardAmount}>$15.00</Text>
        </View>

        {/* Wallet Balance */}
        <View style={styles.walletBox}>
          <Text style={styles.walletTitle}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>$200.00</Text>
        </View>

        {/* Bank/Card Offers */}
        <View style={styles.bankOffersBox}>
          <Text style={styles.offerTitle}>Bank/Card Offers</Text>
          <Text style={styles.offerDetails}>10% Cashback on Credit Card Payments</Text>
        </View>
      </View>

      {/* Payment Form */}
      <View style={styles.paymentFormContainer}>
        <Text style={styles.formTitle}>Enter Payment Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Name on Card"
          placeholderTextColor="#800020"
        />
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          keyboardType="numeric"
          placeholderTextColor="#800020"
        />
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          keyboardType="numeric"
          placeholderTextColor="#800020"
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="numeric"
          placeholderTextColor="#800020"
        />

        {/* Promo Code */}
        <TextInput
          style={styles.input}
          placeholder="Enter Promo Code (Optional)"
          placeholderTextColor="#800020"
        />

        {/* Payment Button */}
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* Security & Legal Links */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Secured by SSL</Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Need Help? Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fae5c3',
    padding: 20,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brandText: {
    fontSize: 22,  // Reduced size for branding text
    fontWeight: 'bold',
    color: '#800020',
  },
  rewardsContainer: {
    marginBottom: 30,
  },
  rewardBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  rewardTitle: {
    fontSize: 16,  // Reduced size
    fontWeight: 'bold',
    color: '#800020',
  },
  rewardAmount: {
    fontSize: 18,  // Reduced size
    color: '#800020',
    marginTop: 5,
  },
  walletBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  walletTitle: {
    fontSize: 16,  // Reduced size
    fontWeight: 'bold',
    color: '#800020',
  },
  walletAmount: {
    fontSize: 18,  // Reduced size
    color: '#800020',
    marginTop: 5,
  },
  bankOffersBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  offerTitle: {
    fontSize: 16,  // Reduced size
    fontWeight: 'bold',
    color: '#800020',
  },
  offerDetails: {
    fontSize: 14,  // Reduced size
    color: '#800020',
    marginTop: 5,
  },
  paymentFormContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 16,  // Reduced size
    fontWeight: 'bold',
    color: '#800020',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#800020',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 14,  // Reduced size for input fields
    color: '#800020',
  },
  payButton: {
    backgroundColor: '#800020',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  payButtonText: {
    fontSize: 16,  // Reduced size for button text
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,  // Reduced size for footer text
    color: '#800020',
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  footerLink: {
    fontSize: 12,  // Reduced size for footer links
    color: '#800020',
    marginHorizontal: 10,
  },
});

export default PaymentLandingScreen;
