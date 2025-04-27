import React, { createContext, useState, useContext, ReactNode } from 'react';
import { router } from 'expo-router';

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
      // In a real app, you would make an API call to your backend
      // const response = await fetch('your-api-endpoint/login', { ... });
      // if response is successful, set the user
      
      // For demo purposes:
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
      // In a real app, you would make an API call to your backend
      // const response = await fetch('your-api-endpoint/register', { ... });
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you might want to set the user automatically after registration
      // or redirect to login
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