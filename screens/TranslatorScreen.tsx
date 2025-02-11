import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Voice from 'react-native-voice';
import { Audio } from 'expo-av'; // For audio output
import RNPickerSelect from 'react-native-picker-select'; // Import Picker

const TranslatorScreen = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [hasPermission, setHasPermission] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Russian', value: 'ru' },
  ];

  // Voice Recognition
  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);

    // Request microphone permission
    const requestPermission = async () => {
      try {
        const status = await Audio.requestPermissionsAsync();
        setHasPermission(status.granted);
      } catch (error) {
        console.error('Permission Error', error);
      }
    };
    requestPermission();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleTranslate = () => {
    setTranslatedText(`Translated version of: ${sourceText}`);
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
  };

  const toggleVoiceInput = () => {
    if (isRecording) {
      Voice.stop();
    } else {
      Voice.start(sourceLanguage); // start voice recognition for the selected source language
    }
  };

  const toggleSpeaker = async () => {
    if (translatedText) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLanguage}&q=${translatedText}` },
        { shouldPlay: true }
      );
      setSound(sound);
      sound.playAsync();
    }
  };

  const handleCamera = () => {
    Alert.alert('Camera functionality', 'Camera feature is yet to be implemented.');
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="menu" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Fixed Image Background Container */}
      <ImageBackground source={require('../assets/lr.png')} style={styles.backgroundImage}>
        <View style={styles.backgroundContainer}>
          {/* Background content */}
        </View>
      </ImageBackground>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView} // Apply scroll styling
      >
        {/* Input and Language Selection Container */}
        <View style={styles.whiteContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Enter text to translate"
            value={sourceText}
            onChangeText={setSourceText}
            multiline
          />

          {/* Language Selection */}
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
              <Icon name="swap-horiz" size={30} color="#333" />
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

          {/* Translated Text Box */}
          {translatedText ? (
            <TextInput
              style={styles.textArea} // Same style as source text input
              value={translatedText}
              editable={false} // Making it non-editable since it's the translated text
              multiline
            />
          ) : null}
        </View>

        {/* Translate and Clear Buttons Container */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
            <Text style={styles.buttonText}>Translate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Icons (Mic, Speaker, Camera) */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleVoiceInput}>
            <Icon name="mic" size={30} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleSpeaker}>
            <Icon name="volume-up" size={30} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
            <Icon name="camera-alt" size={30} color="#333" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer} />
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
      backgroundColor: 'rgba(8, 8, 8, 0.81)',
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
      backgroundColor: 'rgb(0, 0, 0)',
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
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius:50
    },
    footer: {
      height: 60,
      backgroundColor: 'rgb(0, 0, 0)',
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
      backgroundColor: 'rgba(255, 255, 255, 0.58)',
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
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 10,
      flex: 1,
      backgroundColor: '#fff',
    },
    swapButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    textArea: {
      borderRadius: 8,
      borderColor: '#000',
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
      backgroundColor: '#000',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearButton: {
      backgroundColor: '#000',
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
      backgroundColor: '#fff',
      borderRadius: 50,
      borderColor: '#333',
      borderWidth: 1,
    },
  });
  
  export default TranslatorScreen;
  
