import React, { createContext, useState, useContext, ReactNode } from 'react';
import { router } from 'expo-router';
import Constants from 'expo-constants';

// For local development with both client and server on same machine
// Use appropriate localhost URLs depending on platform
import { Platform } from 'react-native';

let API_URL: string;
if (Platform.OS === 'web') {
  API_URL = 'http://localhost:5000/api'; // For web testing
} else if (Platform.OS === 'android') {
  API_URL = 'http://10.0.2.2:5000/api'; // For Android emulator
} else {
  API_URL = 'http://localhost:5000/api'; // For iOS simulator
}

console.log(`Using API URL: ${API_URL} on platform: ${Platform.OS}`);

type User = {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Placeholder for login API call
      // Will implement this later
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        id: '1',
        email: email,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      console.log('Sending registration request to:', `${API_URL}/auth/register`);
      console.log('Registration data:', { name, email, password: '****' });
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      console.log('Registration response status:', response.status);
      
      const data = await response.json();
      console.log('Registration response data:', data);
      
      if (!response.ok) {
        console.error('Registration failed:', data.message || 'Unknown error');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // In a real app, you might want to call your logout API endpoint here
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}