import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReclaimerMethod() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header with faded image */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/components/ui/reclaimer.jpg')}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.titleWrapper}>
          <Text style={styles.tutorialTitle}>Reclaimer Garden Tutorial</Text>
          <Text style={styles.tutorialSubtitle}>Reclaim space and control your plant sizes!</Text>
        </View>
      </View>

      {/* Scrollable Tutorial Body */}
      <View style={styles.tutorialContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>What is the Reclaimer Tool?</Text>
          <Text style={styles.tutorialText}>
            For players running out of space—even with expansions—this is one of the best tools
            added to Grow a Garden. It provides a simple way to free up garden space without
            destroying any plants. It can also be used to achieve the desired size of your favorite
            plants.
          </Text>

          <Text style={styles.sectionTitle}>First Preparations:</Text>
          <Text style={styles.tutorialText}>
            - Make sure you have lots of Reclaimers crafted and ready to use.{'\n'}
            - Stock up on tons of watering cans — you’ll need them!{'\n\n'}
            <Text style={styles.boldText}>Helpful Things:</Text>{'\n'}
            - Fill a slot with Triceratops: helps plants grow instantly.{'\n'}
            - Fill a slot with Squirrels: chance to keep used Reclaimers (only for many plants
            scenario).
          </Text>

          <Text style={styles.sectionTitle}>Step-by-Step Tutorial:</Text>
          <Text style={styles.tutorialText}>
            1. If you have a lot of plants in the garden, drop all Triceratops at the same
            time.{'\n'}
            2. For a single plant, drop Triceratops with 25-second delays — this keeps timing
            perfect.{'\n'}
            3. When a Triceratops is about to trigger its passive, plant the seed or plant you want
            to grow bigger or smaller.{'\n'}
            4. Just before it rams the plant, water it at the same time — boom! Instant growth! 🌟
            {'\n'}
            5. If the plant isn’t the right size, reclaim it again and repeat.{'\n\n'}
            <Text style={styles.tutorialTip}>
              Tip: Squirrels are only useful when using many plants. For a single plant, don’t use
              squirrels — it ruins the delayed timing.
            </Text>
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
