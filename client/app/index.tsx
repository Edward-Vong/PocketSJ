import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  const { user, isLoading } = useAuth();

  // Show a loading indicator while checking authentication status
  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ThemedView>
    );
  }

  // Redirect based on authentication status
  if (user) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});