import CenterButton from '@//components/ui/center-button';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color="#E9C589" />
          ),
        }}
      />

      {/* Search (disabled) */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={28} color="#E9C589" />
          ),
          tabBarButton: (props) => (
            <View
              style={{
                opacity: 0.4,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {props.children}
            </View>
          ),
        }}
      />

      {/* Middle bulging center button */}
      <Tabs.Screen
        name="center"
        options={{
          title: '',
          tabBarButton: (props) => (
            <CenterButton
              onPress={() => {
                console.log('Center pressed');
              }}
            />
          ),
        }}
      />

      {/* Reels / Media */}
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color }) => (
            <Ionicons name="play-outline" size={28} color="#E9C589" />
          ),
        }}
      />

      {/* Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => (
            <Ionicons name="flower-outline" size={28} color="#E9C589" />
          ),
        }}
      />

      {/* Hidden tab example */}
      <Tabs.Screen
        name="reclaimer-method"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
