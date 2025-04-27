import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';
import { router, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HelloWave } from '@/components/HelloWave';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
type Sprite = {
  percent: string;
  color: string;
};

export type Event = {
  id: number;
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  image: ImageSourcePropType;
  description: string;
  sprites: Sprite[];
};

const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Second Harvest Food Loader',
    date: 'Sat, May 10',
    timeStart: '10:30 am',
    timeEnd: '12:30 pm',
    location: '325 Marine View Ave',
    image: require('client/assets/images/ChurchPic.jpeg'),
    description: 'Help load food boxes into vehicles for delivery to those in need.',
    sprites: [
      { percent: '66%', color: '#d1d5db' },
      { percent: '30%', color: '#22c55e' },
      { percent: '4%', color: '#a855f7' },
    ],
  },
  {
    id: 2,
    title: 'Great American Litter Pickup',
    date: 'Sat, April 19',
    timeStart: '9:00 am',
    timeEnd: '11:00 am',
    location: 'Welch Park',
    image: require('client/assets/images/welchpark.jpg'),
    description: 'Join us for our annual park cleanup event at Welch Park.',
    sprites: [
      { percent: '80%', color: '#d1d5db' },
      { percent: '15%', color: '#3b82f6' },
      { percent: '4%', color: '#a855f7' },
      { percent: '1%', color: '#f97316' },
    ],
  },
  {
    id: 3,
    title: 'Downtown Cleanup Initiative',
    date: 'Sun, May 25',
    timeStart: '8:00 am',
    timeEnd: '12:00 pm',
    location: 'Downtown San Jose',
    image: require('client/assets/images/CityShot.jpg'),
    description: 'Help clean up our beautiful downtown area and collect unique sprites.',
    sprites: [
      { percent: '60%', color: '#d1d5db' },
      { percent: '25%', color: '#93c5fd' },
      { percent: '10%', color: '#22c55e' },
      { percent: '5%', color: '#eab308' },
    ],
  },
];

export default function HomeScreen() {
  const { user, isLoading, logout } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
      </ThemedView>
    );
  }

  const handleEventImagePress = (eventId: number) => {
    router.push({
      pathname: "../event/[id]", // 
      params: { id: eventId.toString() },
    });
  };

  const filteredEvents = EVENTS.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEventCard = (event: Event) => (
    <TouchableOpacity key={event.id} style={styles.eventCard}>
      <TouchableOpacity onPress={() => handleEventImagePress(event.id)}>
        <View style={styles.eventImageContainer}>
          <Image source={event.image} style={styles.eventImage} />
          <View style={styles.spritesContainer}>
            {event.sprites.map((sprite, index) => (
              <View
                key={index}
                style={[styles.spriteBadge, { backgroundColor: sprite.color }]}
              >
                <Text style={styles.spriteText}>{sprite.percent}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.eventContent}>
        <ThemedText type="defaultSemiBold" style={styles.eventTitle}>
          {event.title}
        </ThemedText>
        <ThemedText style={styles.eventDetails}>
          {event.date} · {event.timeStart} - {event.timeEnd}
        </ThemedText>
        <ThemedText style={styles.eventLocation}>
          <IconSymbol name="house.fill" size={12} color={Colors[colorScheme].icon} /> {event.location}
        </ThemedText>
        <ThemedText style={styles.eventDescription}>
          {event.description}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Pocket SJ',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <TouchableOpacity
              onPress={logout}
              style={{
                marginRight: 15,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: '#dc2626',
                borderRadius: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ThemedView style={styles.container}>
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeContent}>
            <HelloWave />
            <ThemedText type="title" style={styles.welcomeText}>
              Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
            </ThemedText>
          </View>
          <ThemedText style={styles.subtitle}>
            Find volunteering opportunities near you
          </ThemedText>
        </View>

        <View style={styles.searchContainer}>
          <IconSymbol
            name="paperplane.fill"
            size={16}
            color={Colors[colorScheme].icon}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for opportunities..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Upcoming Events
        </ThemedText>

        <ScrollView
          style={styles.eventsScrollView}
          showsVerticalScrollIndicator={false}
        >
          {filteredEvents.map(event => renderEventCard(event))}
          <View style={styles.endPadding} />
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeSection: { marginTop: 8, marginBottom: 16 },
  welcomeContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  welcomeText: { marginLeft: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 24 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: '#4b5563' },
  sectionTitle: { marginBottom: 16 },
  eventsScrollView: { flex: 1 },
  eventCard: { backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  eventImageContainer: { position: 'relative', height: 160 },
  eventImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  spritesContainer: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', gap: 4 },
  spriteBadge: { width: 24, height: 30, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  spriteText: { color: 'white', fontSize: 10, fontWeight: '600' },
  eventContent: { padding: 16, backgroundColor: '#f9fafb' },
  eventTitle: { fontSize: 18, marginBottom: 4, color: '#1f2937' },
  eventDetails: { fontSize: 14, color: '#6b7280', marginBottom: 2 },
  eventLocation: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  eventDescription: { fontSize: 14, color: '#4b5563' },
  endPadding: { height: 16 },
});
