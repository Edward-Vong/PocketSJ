import { Redirect } from 'expo-router';

export default function TabIndex() {
  // Redirect to the home screen if someone navigates to the tabs root
  return <Redirect href="/(tabs)/home" />;
}