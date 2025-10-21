import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SprinklerMethod() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header with faded image */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/components/ui/sprinklers.jpg')}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.titleWrapper}>
          <Text style={styles.tutorialTitle}>Sprinkler Garden Tutorial</Text>
          <Text style={styles.tutorialSubtitle}>Make your plants gigantic!</Text>
        </View>
      </View>

      {/* Scrollable Tutorial Body */}
      <View style={styles.tutorialContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>What Are Sprinklers?</Text>
          <Text style={styles.tutorialText}>
            Sprinklers automatically water your plants in a specific area, helping them grow faster
            and sometimes increasing mutation chances for fruits.
          </Text>

          <Text style={styles.sectionTitle}>First Preparations:</Text>
          <Text style={styles.tutorialText}>
            - Stock up on all types of sprinklers available.{'\n'}
            - Gather plenty of watering cans for manual touch-ups.{'\n\n'}
            <Text style={styles.boldText}>Helpful Things:</Text>{'\n'}
            - Moon Cat: Boosts fruit size for plants within its sleep radius. Move the plant inside
            the radius and place sprinklers there to trigger the size multiplier.{'\n'}
            - Blood Hedgehog: Boosts prickly fruits (cactus, pineapple).{'\n'}
            - Green Bean: Sacrifices Beanstalks to boost random plants.{'\n'}
            - Toucan: Boosts tropical fruits (banana, coconut) in range.
          </Text>

          <Text style={styles.sectionTitle}>Sprinkler Types:</Text>
          <Text style={styles.tutorialText}>
            - Basic Sprinkler: Waters a 5x5 area.{'\n'}
            - Advanced Sprinkler: Waters a 7x7 area.{'\n'}
            - Godly Sprinkler: Waters a 9x9 area.{'\n'}
            - Master Sprinkler: Waters an 11x11 area.{'\n'}
            - Grandmaster Sprinkler: Waters a 13x13 area.{'\n'}
            - Sweet Soaker Sprinkler: Boosts size of sweet fruits (Watermelon, Pumpkin, Moon
            Melon).{'\n'}
            - Berry Blusher Sprinkler: Boosts size of berry fruits (Strawberry, Blueberry,
            Grape).{'\n'}
            - Tropical Mist Sprinkler: Boosts size of tropical fruits (Coconut, Pineapple,
            Dragonfruit).{'\n'}
            - Gourd Sprinkler: Boosts size of gourd fruits.{'\n'}
            - Bee Sprinkler: Boosts size of flower-type plants.{'\n\n'}
            <Text style={styles.boldText}>Note:</Text> Sprinklers of the same variant cannot be
            stacked. Placing two Grandmasters will only activate one.
          </Text>

          <Text style={styles.sectionTitle}>Step-by-Step Tutorial:</Text>
          <Text style={styles.tutorialText}>
            1. Make sure the plant is harvested first, then place sprinklers around it.{'\n'}
            2. If using Moon Cat, move the plant inside its sleep radius and place sprinklers there
            to trigger the size multiplier.{'\n'}
            3. Use the harvest tool on the plant to start growth while sprinklers are active.{'\n'}
            4. Wait for the fruit to grow. If the fruit is small, shovel it and wait for a new one
            within the sprinklers’ active time.{'\n'}
            5. You can also go offline for an hour or two; fruits will still grow but size can vary.
          </Text>

          <Text style={styles.tutorialTip}>
            Tip: Sprinklers increase mutation chances! Position pets and sprinklers strategically
            for maximum growth and mutations.
          </Text>
        </ScrollView>
      </View>

      {/* Centered Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
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
    opacity: 0.4, // faded image
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  titleWrapper: {
    position: 'absolute',
    left: 20,
    top: '45%',
    transform: [{ translateY: -20 }],
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
  tutorialContainer: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 10,
    marginBottom: 15, // move upward
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
  boldText: { fontWeight: 'bold', color: '#FFD700' },
  tutorialTip: { fontWeight: 'bold', color: '#E9C589', marginTop: 10 },
  backButton: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#E9C589',
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 45,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  backText: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
