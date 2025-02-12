import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Voice from 'react-native-voice';
import * as Speech from 'expo-speech'; // For text-to-speech
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const TranslatorScreen = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [languageOptions, setLanguageOptions] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const GOOGLE_API_KEY = 'AIzaSyA2rBkC_iFyc_UJIO4KTlUQ9Pi7Grcnw70'; // 🔥 Replace with your API Key

  // Fetch supported languages from Google Cloud
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          `https://translation.googleapis.com/language/translate/v2/languages?key=${GOOGLE_API_KEY}&target=en`
        );

        const languages = response.data.data.languages.map(lang => ({
          label: lang.name,
          value: lang.language,
        }));
        setLanguageOptions(languages);
      } catch (error) {
        console.error('Error fetching languages:', error);
        Alert.alert('Error', 'Failed to load languages.');
      }
    };

    fetchLanguages();
  }, []);

  // Handle translation using Google Translate API
  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      Alert.alert('Error', 'Please enter text to translate.');
      return;
    }

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
        {
          q: sourceText,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
        }
      );

      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedText(translatedText);

      // Auto-play translated text
      handleSpeak(translatedText, targetLanguage);
    } catch (error) {
      console.error('Translation error:', error);
      Alert.alert('Error', 'Translation failed.');
    }
  };

  // Start Speech-to-Text
  const startListening = async () => {
    setIsRecording(true);
    Voice.onSpeechResults = (event) => {
      if (event.value) {
        setSourceText(event.value[0]); // Set recognized speech as input text
        setIsRecording(false);
      }
    };

    try {
      await Voice.start(sourceLanguage); // Start listening in the selected language
    } catch (error) {
      console.error('Speech recognition error:', error);
      setIsRecording(false);
    }
  };

  // Stop Speech-to-Text
  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error('Stop listening error:', error);
    }
  };

  // Speak the translated text
  const handleSpeak = (text, language) => {
    if (!text) return;
    Speech.speak(text, {
      language: language,
      pitch: 1.0,
      rate: 1.0,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
    });
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <ImageBackground source={require('../assets/lr.png')} style={styles.backgroundImage}>
        <View style={styles.backgroundContainer} />
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        <View style={styles.whiteContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Enter text or use the mic"
            value={sourceText}
            onChangeText={setSourceText}
            multiline
          />

          <View style={styles.languageSelectionContainer}>
            <View style={styles.languagePickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setSourceLanguage(value)}
                items={languageOptions}
                value={sourceLanguage}
                style={pickerStyles}
              />
            </View>

            <TouchableOpacity style={styles.swapButton} onPress={swapLanguages}>
              <Icon name="swap-horiz" size={30} color="#fff" />
            </TouchableOpacity>

            <View style={styles.languagePickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => setTargetLanguage(value)}
                items={languageOptions}
                value={targetLanguage}
                style={pickerStyles}
              />
            </View>
          </View>

          {translatedText ? (
            <TextInput
              style={styles.textArea}
              value={translatedText}
              editable={false}
              multiline
            />
          ) : null}
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={isRecording ? stopListening : startListening}>
            <Icon name="mic" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleSpeak(translatedText, targetLanguage)}>
            <Icon name="volume-up" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
            <Text style={styles.buttonText}>Translate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const pickerStyles = {
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    height: 55,
  },
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      width: '100%',
      backgroundColor: 'rgb(0, 128, 128)',
      height: 180, // Adjust this height to your liking
      position: 'absolute',
      top: 60, // Below the header
      left: 0,
      right: 0,
      zIndex: -1, // Ensures the background is behind other content
    },
    backgroundContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      height: 60,
      backgroundColor: 'rgb(0, 128, 128)',
      width: '100%',
      position: 'absolute',
      top: 0,
      zIndex: 1000,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    settingsButton: {
      padding: 8,
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(0, 128, 128)',
      borderRadius:50
    },
    footer: {
      height: 60,
      backgroundColor: 'rgb(0, 128, 128)',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      zIndex: 1000,
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: 100,
    },
    scrollView: {
      flex: 1,
      marginTop: 240, // Push content below the header and background image
    },
    whiteContainer: {
      backgroundColor: 'rgba(0, 128, 128, 0.54)',
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 2,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      width: '90%',
      marginTop: 10, // Fixed margin-top after the background image
    },
    languageSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    languagePickerContainer: {
      borderColor: 'rgb(0, 128, 128)',
      borderWidth: 2,
      borderRadius: 10,
      flex: 1,
      color: 'rgba(0, 128, 128, 0.54)',
      backgroundColor: 'rgb(255, 255, 255)',
    },
    swapButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    textArea: {
      borderRadius: 8,
      borderColor: 'rgb(0, 128, 128)',
      borderWidth: 2,
      padding: 16,
      marginBottom: 20,
      margin:20,
      minHeight: 200,
      width: '90%',
      textAlignVertical: 'top',
      backgroundColor: '#fff',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    translateButton: {
      backgroundColor: 'rgb(0, 128, 128)',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearButton: {
      backgroundColor: '#rgb(0, 128, 128)',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    controlsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
      width: '100%',
    },
    iconButton: {
      padding: 16,
      backgroundColor: 'rgb(0, 128, 128)',
      borderRadius: 50,
      borderColor: '#fff',
      borderWidth: 1,
    },
  });
export default TranslatorScreen;
