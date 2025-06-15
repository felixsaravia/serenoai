import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { SleepProfile, UserContextType } from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sleepProfile, setSleepProfile] = useState<SleepProfile | null>(null);
  
  // In a real app, you'd check process.env.API_KEY's actual presence.
  // For this example, we assume it's "set" if it's a non-empty string.
  // IMPORTANT: process.env.API_KEY is typically a build-time variable.
  // For client-side checks like this, it would need to be exposed via bundler (e.g. Vite's VITE_ prefix).
  // For this MakerSuite environment, process.env.API_KEY is directly available in the service.
  // This check here is more for UI hinting rather than actual service availability.
  const apiKeyPresent = useMemo(() => {
    // This is a placeholder. In a Vite environment, it might be import.meta.env.VITE_API_KEY
    // In a CRA environment, it might be process.env.REACT_APP_API_KEY
    // For this MakerSuite environment, process.env.API_KEY is directly available in the service.
    // This check here is more for UI hinting rather than actual service availability.
    return typeof process.env.API_KEY === 'string' && process.env.API_KEY.length > 0;
  }, []);


  return (
    <UserContext.Provider value={{ sleepProfile, setSleepProfile, apiKeyPresent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
};