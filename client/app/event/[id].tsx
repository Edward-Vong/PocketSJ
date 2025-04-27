import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock event detail data
const EVENTS = {
  '1': {
    id: 1,
    title: 'Second Harvest Food Loader',
    date: 'May 10, 2025',
    timeStart: '10:30 AM',
    timeEnd: '12:30 PM',
    location: '325 Marine View Ave, San Jose, CA 95126',
    image: require('client/assets/images/ChurchPic.jpeg'),
    logoBackground: '#f97316',
    category: 'FOOD TYPE',
    description: 'Food loading is a hands-on volunteer activity that involves loading pre-packed food boxes into vehicles...',
    organization: 'SECOND HARVEST',
    organizationTagline: 'of SILICON VALLEY',
    pointsReward: 100,
    sprites: [
      { percent: '66%', color: '#d1d5db' },
      { percent: '30%', color: '#22c55e' },
      { percent: '4%', color: '#a855f7' },
    ],
  },
  '2': {
    id: 2,
    title: 'Great American Litter Pickup',
    date: 'April 19, 2025',
    timeStart: '9:00 AM',
    timeEnd: '11:00 AM',
    location: 'Welch Park, San Jose, CA 95125',
    image: require('client/assets/images/welchpark.jpg'),
    logoBackground: '#3b82f6',
    category: 'ENVIRONMENT',
    description: 'Join the annual Great American Litter Pickup! Help keep our parks clean and beautiful...',
    organization: 'CLEAN SJ',
    organizationTagline: 'KEEPING SAN JOSE BEAUTIFUL',
    pointsReward: 150,
    sprites: [
      { percent: '80%', color: '#d1d5db' },
      { percent: '15%', color: '#3b82f6' },
      { percent: '4%', color: '#a855f7' },
      { percent: '1%', color: '#f97316' },
    ],
  },
  '3': {
    id: 3,
    title: 'Downtown Cleanup Initiative',
    date: 'May 25, 2025',
    timeStart: '8:00 AM',
    timeEnd: '12:00 PM',
    location: 'Downtown San Jose, CA 95113',
    image: require('client/assets/images/CityShot.jpg'),
    logoBackground: '#22c55e',
    category: 'CITY BEAUTIFICATION',
    description: 'Be part of the Downtown Cleanup Initiative! Help clean up litter, graffiti, and plant flowers.',
    organization: 'SJ DOWNTOWN ASSOCIATION',
    organizationTagline: 'REVITALIZING THE HEART OF SAN JOSE',
    pointsReward: 200,
    sprites: [
      { percent: '60%', color: '#d1d5db' },
      { percent: '25%', color: '#93c5fd' },
      { percent: '10%', color: '#22c55e' },
      { percent: '5%', color: '#eab308' },
    ],
  },
};

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const eventId = Array.isArray(id) ? id[0] : id;
  const event = EVENTS[eventId as keyof typeof EVENTS];
  const colorScheme = useColorScheme() ?? 'light';

  if (!event) {
    return (
      <ThemedView style={styles.notFoundContainer}>
        <ThemedText type="title">Event not found</ThemedText>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ThemedText type="link">Go back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const handleRegister = () => {
    Alert.alert('Registration Successful!', `You have registered for ${event.title}. Check your email.`, [{ text: 'OK' }]);
  };

  const handleShare = () => {
    Alert.alert('Share Event', 'Sharing functionality will be implemented.', [{ text: 'OK' }]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Event Details',
          headerBackTitle: 'Events',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.organizationSection}>
          <View style={[styles.logoContainer, { backgroundColor: event.logoBackground }]}>
            <IconSymbol name="house.fill" size={60} color="white" />
          </View>
          <ThemedText type="title" style={styles.organizationName}>
            {event.organization}
          </ThemedText>
          <ThemedText style={styles.organizationTagline}>
            {event.organizationTagline}
          </ThemedText>
        </View>

        <Image source={event.image} style={styles.eventImage} />

        <View style={styles.detailsContainer}>
          <ThemedText type="title" style={styles.eventTitle}>
            {event.title}
          </ThemedText>

          <View style={styles.detailItem}>
            <IconSymbol name="calendar" size={18} color={Colors[colorScheme].icon} style={styles.detailIcon} />
            <ThemedText style={styles.detailText}>
              {event.date} at {event.timeStart} — {event.timeEnd} PST
            </ThemedText>
          </View>

          <View style={styles.detailItem}>
            <IconSymbol name="mappin" size={18} color={Colors[colorScheme].icon} style={styles.detailIcon} />
            <ThemedText style={styles.detailText}>
              {event.location}
            </ThemedText>
          </View>

          <View style={styles.categoryContainer}>
            <View style={[styles.categoryBadge, { backgroundColor: event.logoBackground }]}>
              <ThemedText style={styles.categoryText}>
                {event.category}
              </ThemedText>
            </View>
            <View style={styles.pointsContainer}>
              <ThemedText style={styles.pointsText}>
                Earn {event.pointsReward} points
              </ThemedText>
            </View>
          </View>

          <View style={styles.spritesSection}>
            <ThemedText type="subtitle" style={styles.spritesTitle}>
              Available Sprites
            </ThemedText>
            <View style={styles.spritesRow}>
              {event.sprites.map((sprite, index) => (
                <View key={index} style={[styles.spriteLarge, { backgroundColor: sprite.color }]}>
                  <ThemedText style={styles.spriteLargeText}>
                    {sprite.percent}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <ThemedText style={styles.registerButtonText}>
                Register
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <IconSymbol name="square.and.arrow.up" size={22} color={Colors[colorScheme].tint} />
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionSection}>
            <ThemedText type="subtitle" style={styles.descriptionTitle}>
              Description
            </ThemedText>
            <ThemedText style={styles.descriptionText}>
              {event.description}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFoundContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  backButton: { marginTop: 16 },
  organizationSection: { alignItems: 'center', paddingVertical: 24 },
  logoContainer: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  organizationName: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
  organizationTagline: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', marginTop: 4 },
  eventImage: { width: '100%', height: 200, resizeMode: 'cover' },
  detailsContainer: { padding: 20 },
  eventTitle: { fontSize: 22, marginBottom: 16 },
  detailItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  detailIcon: { marginRight: 12, marginTop: 2 },
  detailText: { flex: 1, fontSize: 15 },
  categoryContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 24 },
  categoryBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  categoryText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  pointsContainer: { marginLeft: 12 },
  pointsText: { fontSize: 14, fontWeight: '600' },
  spritesSection: { marginBottom: 24 },
  spritesTitle: { marginBottom: 12 },
  spritesRow: { flexDirection: 'row', gap: 12 },
  spriteLarge: { width: 48, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  spriteLargeText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  buttonsContainer: { flexDirection: 'row', marginBottom: 24 },
  registerButton: { flex: 1, backgroundColor: '#0a7ea4', borderRadius: 24, paddingVertical: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  registerButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  shareButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  descriptionSection: { marginBottom: 32 },
  descriptionTitle: { marginBottom: 12 },
  descriptionText: { fontSize: 15, lineHeight: 24 },
});
