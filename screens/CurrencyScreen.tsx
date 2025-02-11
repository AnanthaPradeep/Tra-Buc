import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const API_URL = 'https://open.er-api.com/v6/latest'; // Replace with your free currency API endpoint
const API_KEY = 'c31086b86430261c03e08c8d'; // Replace this with your actual API key

// Map of currency codes to country flag emojis
const currencyFlags: { [key: string]: string } = {
    USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", INR: "🇮🇳", AUD: "🇦🇺", CAD: "🇨🇦", AFN: "🇦🇫", 
    ALL: "🇦🇱", DZD: "🇩🇿", AOA: "🇦🇴", 
    ARS: "🇦🇷", AMD: "🇦🇲", AWG: "🇦🇼", 
    AZN: "🇦🇿", BAM: "🇧🇦", BBD: "🇧🇧", 
    BDT: "🇧🇩", BYN: "🇧🇾", BZD: "🇧🇿", 
    BTN: "🇧🇹", BOV: "🇧🇴", BRL: "🇧🇷", 
    BND: "🇧🇳", BWP: "🇧🇼", BYR: "🇧🇾", 
    BHD: "🇧🇭", BIF: "🇧🇮", KMF: "🇰🇲", 
    COD: "🇨🇩", COU: "🇨🇴", CRC: "🇨🇷", 
    HRK: "🇭🇷", CUP: "🇨🇺", CYP: "🇨🇾", 
    CZK: "🇨🇿", DJF: "🇩🇯", DKK: "🇩🇰", 
    DMA: "🇩🇲", DOP: "🇩🇴", EGP: "🇪🇬", 
    ERN: "🇪🇷", EEK: "🇪🇪", ETB: "🇪🇹", 
    FJD: "🇫🇯", FKP: "🇫🇰", FOK: "🇫🇴", 
    GEL: "🇬🇪", GHS: "🇬🇭", GIP: "🇬🇮", 
    GMD: "🇬🇲", GNF: "🇬🇳", GTQ: "🇬🇹", 
    GYD: "🇬🇾", HKD: "🇭🇰", HNL: "🇭🇳", HTG: "🇭🇹", HUF: "🇭🇺", 
    IDR: "🇮🇩", ILS: "🇮🇱",  IQD: "🇮🇶", IRR: "🇮🇷", ISK: "🇮🇸", 
    JMD: "🇯🇲", JOD: "🇯🇴", JPY: "🇯🇵", 
    KES: "🇰🇪", KGS: "🇰🇬", KHR: "🇰🇭", KPW: "🇰🇵", KRW: "🇰🇷", 
    KWD: "🇰🇼", KYD: "🇰🇾", KZT: "🇰🇿", 
    LAK: "🇱🇦", LBP: "🇱🇧", LKR: "🇱🇰", LRD: "🇱🇷", LSL: "🇱🇸", LTL: "🇱🇹", 
    LVL: "🇱🇻", LYD: "🇱🇾", MAD: "🇲🇦", MDL: "🇲🇩", MGA: "🇲🇬", MKD: "🇲🇰", 
    MMK: "🇲🇲", MNT: "🇲🇳", MOP: "🇲🇴", MUR: "🇲🇺", MWK: "🇲🇼", MXN: "🇲🇽", 
    MYR: "🇲🇾", MZN: "🇲🇿", NAD: "🇳🇦", NGN: "🇳🇬", NIO: "🇳🇮", NOK: "🇳🇴", 
    NPR: "🇳🇵", NZD: "🇳🇿", OMR: "🇴🇲", PAB: "🇵🇦", PEN: "🇵🇪", PGK: "🇵🇬", 
    PHP: "🇵🇭", PKR: "🇵🇰", PLN: "🇵🇱", PRB: "🇵🇷", PYG: "🇵🇾", QAR: "🇶🇦", 
    RON: "🇷🇴", RSD: "🇷🇸", RUB: "🇷🇺", RWF: "🇷🇼", SAR: "🇸🇦", SBD: "🇸🇧",
    SCR: "🇸🇨", SDG: "🇸🇩", SEK: "🇸🇪", SGD: "🇸🇬", SHR: "🇸🇭", SLL: "🇸🇱", 
    SOS: "🇸🇴", SRD: "🇸🇷", SSP: "🇸🇸", STN: "🇸🇹", SYP: "🇸🇾", SZL: "🇸🇿", 
    THB: "🇹🇭", TJS: "🇹🇯", TMT: "🇹🇲", TND: "🇹🇳", TOP: "🇹🇴", TRY: "🇹🇷", 
    TTD: "🇹🇹", TWD: "🇹🇼", TZS: "🇹🇿", UAH: "🇺🇦", UGX: "🇺🇬", UYU: "🇺🇾", 
    UZS: "🇺🇿", VEF: "🇻🇪", VND: "🇻🇳", VUV: "🇻🇺", WST: "🇼🇸", XOF: "🇨🇩", 
    YER: "🇾🇪", ZAR: "🇿🇦", ZMW: "🇿🇲", ZWL: "🇿🇼"

  // Add more currencies and flags as needed
};

const CurrencyScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<string>('1');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAvailableCurrencies();
  }, []);

  const fetchAvailableCurrencies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
      const data = await response.json();

      if (data && data.rates) {
        setAvailableCurrencies(Object.keys(data.rates));
      } else {
        Alert.alert('Error', 'Unable to fetch available currencies.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleConversion = async () => {
    try {
      if (!amount || isNaN(Number(amount))) {
        Alert.alert('Invalid Input', 'Please enter a valid amount.');
        return;
      }

      setLoading(true);
      const response = await fetch(`${API_URL}?apikey=${API_KEY}`);
      const data = await response.json();

      if (data && data.rates && data.rates[targetCurrency]) {
        const rate = data.rates[targetCurrency];
        setExchangeRate(rate);
      } else {
        Alert.alert('Error', 'Unable to fetch exchange rate.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during conversion.');
    } finally {
      setLoading(false);
    }
  };

  const convertedAmount = exchangeRate ? (Number(amount) * exchangeRate).toFixed(2) : '';

  // Add flag emojis to dropdown options
  const currencyOptions = availableCurrencies.map((currency) => ({
    label: `${currencyFlags[currency] || ''} ${currency}`,
    value: currency,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Exchange</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Base Currency</Text>
        <RNPickerSelect
          onValueChange={(value) => setBaseCurrency(value)}
          items={currencyOptions}
          value={baseCurrency}
          placeholder={{ label: 'Select Base Currency', value: null }}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Target Currency</Text>
        <RNPickerSelect
          onValueChange={(value) => setTargetCurrency(value)}
          items={currencyOptions}
          value={targetCurrency}
          placeholder={{ label: 'Select Target Currency', value: null }}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount to convert"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConversion}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#333" style={{ margin: 20 }} />}

      {exchangeRate !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
          </Text>
        </View>
      )}

      <Text style={styles.subHeader}>Available Currencies</Text>
      <FlatList
        data={availableCurrencies}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.currencyItem}>
            {currencyFlags[item] || ''} {item}
          </Text>
        )}
        style={styles.currencyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  resultText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  currencyList: { marginTop: 10 },
  currencyItem: {
    fontSize: 16,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
});

export default CurrencyScreen;
