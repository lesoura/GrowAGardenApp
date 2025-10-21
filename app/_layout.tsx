import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // ✅ add this
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import AppHeader from './header';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();

  const hiddenHeaderPages = ['sheckle-grind', 'reclaimer-method', 'sprinkler-method', 'video-trimmer'];
  const current = segments[segments.length - 1];
  const showHeader = !hiddenHeaderPages.includes(current || '');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* ✅ wrap everything */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#1E1E1E' }}>
          {showHeader && <AppHeader />}

          <View style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colorScheme === 'dark' ? '#000' : '#1E1E1E' },
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="modal"
                options={{ presentation: 'modal', title: 'Modal' }}
              />
            </Stack>
          </View>

          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
