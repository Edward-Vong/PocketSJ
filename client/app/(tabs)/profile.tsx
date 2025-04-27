import { Stack } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText type="title">Profile Screen</ThemedText>
      </ThemedView>
    </>
  );
}
