import { Platform } from 'react-native';

/**
 * Environment configuration
 * Handles different API URLs based on platform and environment
 */

// API base URL based on platform
export const API_URL = (() => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/api';
  } else if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api'; // Special IP for Android emulator to access host machine
  } else {
    return 'http://localhost:5000/api'; // iOS and other platforms
  }
})();

export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_DATA_KEY = 'user_data';

export const JWT_EXPIRES_IN = '7d'; // Token validity period

// Endpoints
export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/users/me',
};