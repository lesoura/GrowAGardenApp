import React from 'react';
import { Image, StyleSheet, View, useColorScheme } from 'react-native';

export default function AppHeader() {
  const colorScheme = useColorScheme();

  // const backgroundColor = colorScheme === 'dark' ? '#1C1C1E' : '#F9F9F9';
  const backgroundColor = '#1C1C1E';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require('@/components/ui/gag-cover.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  logo: {
    width: 150,
    height: 40,
  },
});
