import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    // For now, just filter some dummy data
    const data = ['Video 1', 'Video 2', 'Photo 1', 'Photo 2', 'Reel 1'];
    const filtered = data.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          query ? <Text style={styles.emptyText}>No results found</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  input: {
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#111',
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  resultItem: {
    padding: 16,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  resultText: { color: '#fff', fontSize: 16 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 20 },
});
