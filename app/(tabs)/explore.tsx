import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutGrowGarden() {
  return (
    <View style={styles.container}>
      {/* Header with faded image */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/components/ui/gag.jpg')}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.titleWrapper}>
          <Text style={styles.tutorialTitle}>About Grow a Garden</Text>
          <Text style={styles.tutorialSubtitle}>Plant. Evolve. Grow.</Text>
        </View>
      </View>

      {/* Scrollable Body */}
      <View style={styles.tutorialContainer}>
        {/* Avatars Row */}
        <View style={styles.avatarsRow}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('@/components/ui/jandel.png')}
              style={[styles.avatarImage, { transform: [{ scale: 1.2 }, { translateY: -6 }] }]}
            />
          </View>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('@/components/ui/jhailatte.png')}
              style={[styles.avatarImage, { transform: [{ scale: 1.2 }, { translateY: -6 }] }]}
            />
          </View>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('@/components/ui/devnameddavid.png')}
              style={[styles.avatarImage, { transform: [{ scale: 1.2 }, { translateY: -6 }] }]}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>The Origins</Text>
          <Text style={styles.tutorialText}>
            Grow a Garden (GAG) started as a small online farming simulator around 2021. The idea
            was simple — plant, harvest, and grow digital crops while watching your garden evolve.
            But it quickly turned into something bigger.
          </Text>

          <Text style={styles.sectionTitle}>Gameplay Systems</Text>
          <Text style={styles.tutorialText}>
            Over time, the game introduced new systems like mutations, pets, and kg multipliers that
            made farming more strategic. Each crop could mutate into new, rarer types with different
            values, allowing players to experiment and compete for the most efficient yields.
          </Text>

          <Text style={styles.sectionTitle}>Community</Text>
          <Text style={styles.tutorialText}>
            The community behind Grow a Garden became one of its strongest points. Players shared
            strategies, tracked crop stats, and developed calculators to help optimize their
            gardens. What started as a chill farming game slowly evolved into a mix of creativity,
            luck, and resource management.
          </Text>

          <Text style={styles.sectionTitle}>Today</Text>
          <Text style={styles.tutorialText}>
            Today, Grow a Garden continues to grow as a community-driven project where players test
            mutations, breed crops, and calculate profits — blending simplicity with depth in a
            unique digital farming experience.
          </Text>

          <Text style={[styles.tutorialText, { color: '#E9C589', marginTop: 10 }]}>
            🌿 “Plant. Evolve. Grow.” — The heart of Grow a Garden.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E1E' },
  headerContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  titleWrapper: {
    position: 'absolute',
    left: 20,
    top: '35%',
  },
  tutorialTitle: {
    color: '#E9C589',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tutorialSubtitle: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 4,
  },
  avatarsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginVertical: 12,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A2A2A',
    borderWidth: 2,
    borderColor: '#E9C589',
    overflow: 'visible', // allow image to bulge out
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 35,
  },
  tutorialContainer: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 10,
    marginTop: -25,
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  scrollContent: { paddingBottom: 100 },
  sectionTitle: {
    color: '#E9C589',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  tutorialText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});
