// _layout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import SosButton from '@/components/navigation/sosButton'; // Update path if needed

export default function RootLayout() {
  const segments = useSegments();
  const currentRoute = segments[0] || 'index';

  // Define screens where the SosButton should be hidden
  const hiddenScreens = ['index', 'login', 'register'];

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="AppDashboard" />
        <Stack.Screen name="writePost" />
        <Stack.Screen name="viewRatings" />
      </Stack>
      {/* Conditionally render SosButton based on the current route */}
      {!hiddenScreens.includes(currentRoute) && <SosButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
