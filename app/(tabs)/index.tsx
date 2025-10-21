import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const images = [
  require('@/components/ui/gear.jpg'),
  require('@/components/ui/seed.jpg'),
  require('@/components/ui/pet.jpg'),
  require('@/components/ui/merchant.jpg'),
  require('@/components/ui/cosmetic.jpg'),
  require('@/components/ui/event.jpg'),
];

export default function HomeScreen() {
  const [data, setData] = useState<any>(null);
  const [timeline, setTimeline] = useState<{ time: string; snapshot: any }[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchData = () => {
    setLoading(true);
    fetch('https://gagapi.onrender.com/alldata')
      .then(res => res.json())
      .then(json => {
        const cleaned = Object.fromEntries(
          Object.entries(json).filter(([key]) => key !== 'weatherHistory')
        );
        setData(cleaned);
        setLoading(false);

        const now = new Date();
        const timeLabel = now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        setTimeline(prev => {
          const updated = [...prev, { time: timeLabel, snapshot: cleaned }];
          return updated.slice(-5);
        });
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchAndSchedule = () => {
      fetchData();
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const nextInterval = ((5 - (minutes % 5)) * 60 - seconds) * 1000;
      timerRef.current = setTimeout(fetchAndSchedule, nextInterval);
    };

    fetchAndSchedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const sections = Object.entries(data || {}).filter(
    ([, value]) => Array.isArray(value)
  ) as [string, any[]][];

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>LIVE STOCK</Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={fetchData}>
          <Text style={styles.refreshText}>refresh</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E9C589" />
          <Text style={{ color: '#fff', marginTop: 8 }}>loading...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Stock Carousel */}
          <FlatList
            data={sections}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={([key]) => key}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item, index }: { item: [string, any[]]; index: number }) => {
              const [key, items] = item;
              const img = images[index % images.length];
              return (
                <ImageBackground
                  source={img}
                  style={[styles.card, { overflow: 'hidden' }]}
                  imageStyle={{
                    resizeMode: 'cover',
                    opacity: 0.2, // faded look
                  }}
                >
                  <Text style={styles.title}>
                    {(key === 'honey' ? 'MERCHANT' : key).toUpperCase()}
                  </Text>
                  {items.map((i: any, idx: number) => (
                    <Text key={idx} style={styles.item}>
                      {i.name} ×{i.quantity}
                    </Text>
                  ))}
                </ImageBackground>
              );
            }}
          />

          {/* Timeline Header with Clear Button */}
          <View style={styles.timelineHeader}>
            <Text style={styles.timelineTitle}>STOCKS TIMELINE</Text>
            <TouchableOpacity onPress={() => setTimeline([])} style={styles.clearBtn}>
              <Ionicons name="trash-outline" size={20} color="#E9C589" />
            </TouchableOpacity>
          </View>

          {/* Timeline */}
          <View style={styles.timelineContainer}>
            {timeline.length > 0 ? (
              timeline.map((t, index) => {
                const expanded = expandedIndex === index;
                const isLast = index === timeline.length - 1;
                return (
                  <View key={index} style={styles.timelineItem}>
                    {!isLast && <View style={styles.verticalLine} />}
                    <TouchableOpacity
                      style={styles.bulletRow}
                      onPress={() => setExpandedIndex(expanded ? null : index)}
                    >
                      <View style={styles.bullet} />
                      <Text style={styles.bulletText}>Updated at {t.time}</Text>
                      <Ionicons
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#E9C589"
                        style={{ marginLeft: 'auto' }}
                      />
                    </TouchableOpacity>

                    {expanded && (
                      <View style={styles.dropdown}>
                        {Object.entries(t.snapshot).map(([key, value]) => {
                          const items = Array.isArray(value)
                            ? (value as any[])
                            : [];
                          return (
                            <View key={key} style={styles.dropdownSection}>
                              <Text style={styles.dropdownTitle}>
                                {(key === 'honey' ? 'MERCHANT' : key).toUpperCase()}
                              </Text>
                              {items.map((i: any, idx: number) => (
                                <Text key={idx} style={styles.dropdownItem}>
                                  {i.name} ×{i.quantity}
                                </Text>
                              ))}
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={{ color: '#aaa', marginLeft: 20 }}>No recent reports</Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#E9C589',
    fontWeight: 'bold',
    fontSize: 28,
  },
  refreshBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#E9C589',
    borderRadius: 8,
  },
  refreshText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 14,
    marginRight: 10,
    width: 220,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E9C589',
    marginBottom: 6,
  },
  item: {
    color: '#fff',
    marginLeft: 8,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 8,
  },
  clearBtn: {
    padding: 6,
  },
  timelineTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E9C589',
  },
  timelineContainer: {
    paddingHorizontal: 16,
  },
  timelineItem: {
    position: 'relative',
    paddingLeft: 8,
  },
  verticalLine: {
    position: 'absolute',
    left: 11,
    top: 12,
    bottom: 0,
    width: 2,
    backgroundColor: '#E9C58955',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingVertical: 6,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E9C589',
    marginRight: 10,
  },
  bulletText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    flexShrink: 1,
  },
  dropdown: {
    backgroundColor: '#2A2A2A',
    marginLeft: 18,
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
  },
  dropdownSection: {
    marginBottom: 6,
  },
  dropdownTitle: {
    color: '#E9C589',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dropdownItem: {
    color: '#fff',
    marginLeft: 8,
  },
});
