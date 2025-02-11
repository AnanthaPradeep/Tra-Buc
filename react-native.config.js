module.exports = {
    assets: ['./assets/fonts'],
    dependencies: {
      'some-native-module': {
        platforms: {
          ios: null, // Disable for iOS
          android: {
            packageInstance: 'new SomeNativeModule()',
          },
        },
      },
    },
  };
  