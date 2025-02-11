import React, { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  hasNavigated: boolean;
  setHasNavigated: (value: boolean) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasNavigated, setHasNavigated] = useState(false);
  return (
    <NavigationContext.Provider value={{ hasNavigated, setHasNavigated }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within a NavigationProvider");
  }
  return context;
};
