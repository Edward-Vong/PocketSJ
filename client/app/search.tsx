import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Stack, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
type Category = {
  id: string;
  name: string;
};

type Event = {
  id: number;
  title: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  category: string;
  pointsReward: number;
  image?: ImageSourcePropType;
};

// Sample categories for filtering
const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Events' },
  { id: 'food', name: 'Food Bank' },
  { id: 'environment', name: 'Environment' },
  { id: 'education', name: 'Education' },
  { id: 'community', name: 'Community' },
  { id: 'health', name: 'Health' },
];

// Mock data for events
const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Second Harvest Food Loader',
    date: 'May 10, 2025',
    timeStart: '10:30 AM',
    timeEnd: '12:30 PM',
    location: '325 Marine View Ave',
    category: 'food',
    pointsReward: 100,
    image: require('client/assets/images/ChurchPic.jpeg'),
  },
  {
    id: 2,
    title: 'Great American Litter Pickup',
    date: 'April 19, 2025',
    timeStart: '9:00 AM',
    timeEnd: '11:00 AM',
    location: 'Welch Park',
    category: 'environment',
    pointsReward: 150,
    image: require('client/assets/images/welchpark.jpg'),
  },
  {
    id: 3,
    title: 'Downtown Cleanup Initiative',
    date: 'May 25, 2025',
    timeStart: '8:00 AM',
    timeEnd: '12:00 PM',
    location: 'Downtown San Jose',
    category: 'environment',
    pointsReward: 200,
    image: require('client/assets/images/CityShot.jpg'),
  },
  {
    id: 4,
    title: 'After-School Tutoring',
    date: 'Every Wednesday',
    timeStart: '3:00 PM',
    timeEnd: '5:00 PM',
    location: 'San Jose Public Library',
    category: 'education',
    pointsReward: 80,
  },
  {
    id: 5,
    title: 'Community Garden Planting',
    date: 'May 15, 2025',
    timeStart: '9:00 AM',
    timeEnd: '1:00 PM',
    location: 'Emma Prusch Farm Park',
    category: 'community',
    pointsReward: 120,
  },
  {
    id: 6,
    title: 'Blood Drive Volunteer',
    date: 'June 2, 2025',
    timeStart: '10:00 AM',
    timeEnd: '4:00 PM',
    location: 'Red Cross Center',
    category: 'health',
    pointsReward: 180,
  },
];

export default function SearchScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Event[]>(EVENTS);

  useEffect(() => {
    const searchEvents = () => {
      setSearching(true);

      setTimeout(() => {
        let filteredEvents = [...EVENTS];

        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
          );
        }

        if (selectedCategory !== 'all') {
          filteredEvents = filteredEvents.filter(event => 
            event.category === selectedCategory
          );
        }

        setResults(filteredEvents);
        setSearching(false);
      }, 500);
    };

    searchEvents();
  }, [searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const handleEventPress = (eventId: number) => {
    router.push({
      pathname: '/event/[id]',
      params: { id: eventId.toString() },
    });
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => handleEventPress(item.id)}
    >
      {item.image && (
        <Image
          source={item.image}
          style={styles.eventImage}
        />
      )}
      <View style={styles.eventDetails}>
        <ThemedText type="defaultSemiBold" style={styles.eventTitle}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.eventInfo}>
          {item.date} · {item.timeStart} - {item.timeEnd}
        </ThemedText>
        <ThemedText style={styles.eventLocation}>
          <IconSymbol name="house.fill" size={12} color={Colors[colorScheme].icon} /> {item.location}
        </ThemedText>
      </View>
      <View style={styles.pointsContainer}>
        <ThemedText style={styles.pointsText}>
          {item.pointsReward} pts
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: "Search Events",
          headerBackTitle: "Home",
        }} 
      />
      <ThemedView style={styles.container}>
        {/* Search Input */}
        <View style={styles.searchInputContainer}>
          <IconSymbol
            name="paperplane.fill"
            size={16}
            color={Colors[colorScheme].icon}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events by name or location..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <IconSymbol
                name="house.fill"
                size={16}
                color={Colors[colorScheme].icon}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextSelected,
                ]}
              >
                {category.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results */}
        {searching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
            <ThemedText style={styles.loadingText}>Searching...</ThemedText>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <IconSymbol
              name="paperplane.fill"
              size={40}
              color={Colors[colorScheme].icon}
              style={styles.noResultsIcon}
            />
            <ThemedText type="defaultSemiBold" style={styles.noResultsText}>
              No events found
            </ThemedText>
            <ThemedText style={styles.noResultsSubtext}>
              Try adjusting your search or filters
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={results}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.resultsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  // your styles remain the same (copied from your file)
  container: { flex: 1, padding: 16 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: '#4b5563' },
  categoriesContainer: { paddingVertical: 8, gap: 8, marginBottom: 16 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6', marginRight: 8 },
  categoryChipSelected: { backgroundColor: '#0a7ea4' },
  categoryText: { fontSize: 14, color: '#4b5563' },
  categoryTextSelected: { color: 'white', fontWeight: '600' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#6b7280' },
  noResultsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  noResultsIcon: { marginBottom: 16, opacity: 0.7 },
  noResultsText: { fontSize: 18, marginBottom: 8, textAlign: 'center' },
  noResultsSubtext: { fontSize: 16, color: '#6b7280', textAlign: 'center' },
  resultsList: { paddingBottom: 16 },
  eventItem: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, alignItems: 'center' },
  eventImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  eventDetails: { flex: 1 },
  eventTitle: { fontSize: 16, marginBottom: 4 },
  eventInfo: { fontSize: 14, color: '#6b7280', marginBottom: 2 },
  eventLocation: { fontSize: 14, color: '#6b7280' },
  pointsContainer: { justifyContent: 'center', paddingLeft: 12 },
  pointsText: { fontSize: 14, fontWeight: '600', color: '#0a7ea4' },
});
