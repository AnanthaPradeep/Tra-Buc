import React, { createContext, useState, ReactNode } from 'react';

interface AppContextProps {
  appLanguage: string;
  appCurrency: string;
  setAppLanguage: (language: string) => void;
  setAppCurrency: (currency: string) => void;
}

interface AppProviderProps {
  children: ReactNode; // Define the type of `children` explicitly
}

const AppContext = createContext<AppContextProps>({
  appLanguage: 'English',
  appCurrency: 'USD',
  setAppLanguage: () => {},
  setAppCurrency: () => {},
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState<string>('English');
  const [appCurrency, setAppCurrency] = useState<string>('USD');

  return (
    <AppContext.Provider
      value={{
        appLanguage,
        appCurrency,
        setAppLanguage,
        setAppCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
