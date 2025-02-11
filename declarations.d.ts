// declarations.d.ts

declare module 'react-native-voice' {
    const Voice: {
      start: (locale?: string) => Promise<void>;
      stop: () => Promise<void>;
      destroy: () => Promise<void>;
      removeAllListeners: () => void;
      
      // Proper typing for onSpeechResults with event containing value as string[]
      onSpeechResults: (handler: (event: { value: string[] }) => void) => void;
      onSpeechStart: (handler: (event: any) => void) => void;
      onSpeechEnd: (handler: (event: any) => void) => void;
      onSpeechError: (handler: (event: { message: string }) => void) => void;
    };
  
    export default Voice;
  }
  
  declare module 'react-native-tts' {
    const Tts: {
      speak: (text: string) => void;
      stop: () => void;
      setLanguage: (language: string) => void;
      setRate: (rate: number) => void;
      setPitch: (pitch: number) => void;
    };
    export default Tts;
  }
  