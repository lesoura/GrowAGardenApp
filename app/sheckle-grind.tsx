import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SheckleGrind() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header with faded image */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/components/ui/shecklesbg.jpg')}
          style={styles.headerImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.titleWrapper}>
          <Text style={styles.tutorialTitle}>Sheckle Grind Tutorial</Text>
          <Text style={styles.tutorialSubtitle}>Earn trillions the legit way!</Text>
        </View>
      </View>

      {/* Scrollable Tutorial Body */}
      <View style={styles.tutorialContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>What Are Sheckles?</Text>
          <Text style={styles.tutorialText}>
            Sheckles are the primary currency in Grow a Garden, earned mainly by selling fruits/crops
            and pets at the Sell Stuff stand or Pet Shop. This guide focuses on legitimate in-game
            strategies to farm massive amounts, based on current mechanics as of October 2025. Avoid
            real-money trading to stay safe from bans.
          </Text>

          <Text style={styles.sectionTitle}>1. Selling Fruits with Tons of Mutations</Text>
          <Text style={styles.tutorialText}>
            The core way to earn Sheckles is harvesting and selling fruits. Formula: {"Base Fruit Value × Size (KG) × Mutation Multipliers"}.
            {'\n\n'}Choose high-base-value fruits: Start with Bamboo (~4k Sheckles, fast-growing),
            then upgrade to premium seeds like Dragonfruit, Apple, Maple Resin, or Bone Blossom.
            Mutations stack for exponential value.
          </Text>

          <Text style={styles.sectionTitle}>Top Mutations</Text>
          <Text style={styles.tutorialText}>
            - Shocked x100: Lightning Rod tool, Raiju pet, weather events.{'\n'}
            - Celestial x75+: Rare weather or Luminous Sprite pet.{'\n'}
            - Rainbow x50: Butterfly pet (requires 5+ prior mutations).{'\n'}
            - Molten/Meteor x30-50: Lobster Thermidor pet, hot weather/events.{'\n'}
            - Gold x20: Dragonfly pet, natural gold variants.{'\n'}
            - Chakra/Corrupted Chakra x15-25: Kitsune/Corrupted Kitsune pets, Zen events.
          </Text>

          <Text style={styles.sectionTitle}>Strategy</Text>
          <Text style={styles.tutorialText}>
            Plant in bulk (20+ of the same fruit). Let them grow gigantic. Apply mutations via pets,
            tools, or weather. Harvest after stacking 3-5 mutations (x1000+ multipliers possible).
            Sell immediately for massive Sheckles. Use low-value fruits for early mutation stacking.
          </Text>

          <Text style={styles.sectionTitle}>2. Getting Mutations</Text>
          <Text style={styles.tutorialText}>
            - Events and Admin: Join limited-time events for rare mutation pets/items. Prep your
            garden beforehand.{'\n'}
            - Sprays and Tools: Lightning Rod boosts Shocked, Sprinklers apply Wet mutation.{'\n'}
            - Weather Buffs: Plant all at once, wait 3-4 weather cycles for stacking mutations.{'\n'}
            - Pets: Place near crops for passive mutations (Queen Bee for Pollinated). Level pets
            for cooldown efficiency.
          </Text>

          <Text style={styles.sectionTitle}>3. Boosting Fruit Size</Text>
          <Text style={styles.tutorialText}>
            Bigger fruits = higher Sheckles. Use sprinklers and watering cans repeatedly. Pets like
            Moon Cat, Blood Hedgehog, and Dairy Cow boost size. Combine with mutations for gigantic
            fruits worth quadrillions.
          </Text>

          <Text style={styles.sectionTitle}>4. Using Pets for Sheckles</Text>
          <Text style={styles.tutorialText}>
            Money-Making Pets:{'\n'}
            - Raccoon: Steals duplicates from another player every ~15 mins.{'\n'}
            - Dragonfly: Converts fruits to Gold.{'\n'}
            - Corrupted Kitsune: Mutates up to 9 fruits.{'\n'}
            - Lobster Thermidor: Applies Molten/Meteor.{'\n\n'}
            <Text style={styles.boldText}>Raccoon Strategy:</Text> Set up a private server, place
            Raccoons on a high-value plant plot, AFK overnight, collect stolen fruits for trillions.
            Multiple Raccoons = faster steals. Mutate Raccoons for shorter cooldowns.
          </Text>

          <Text style={styles.sectionTitle}>5. Mutation Swapping with Carrots</Text>
          <Text style={styles.tutorialText}>
            - Plant many Carrots (or Blueberries/Tulips).{'\n'}
            - Apply mutations without harvesting to stack.{'\n'}
            - Use Seedling pet to swap mutations to high-value fruits like Maple Resin or Bone
            Blossom.{'\n'}
            - Harvest mutated high-value fruit for maximum Sheckles.
          </Text>

          <Text style={styles.sectionTitle}>6. Trading Pets for Sheckles</Text>
          <Text style={styles.tutorialText}>
            Approach a player, select items/pets/Sheckles, confirm trade. Strategy: farm common
            mutated pets/fruits, trade up to rarer items, flip for profit. High-tier: Corrupted
            Kitsune (~quadrillions), Medium: Raccoon (~trillions), Low: Bee (~millions).
          </Text>

          <Text style={styles.sectionTitle}>7. Additional Tips</Text>
          <Text style={styles.tutorialText}>
            - Starter Loop: Buy Bamboo seeds, mutate with weather/tools, sell, repeat.{'\n'}
            - AFK Farms: Combine pets and tools, stay online for weather.{'\n'}
            - Events: Always join for free rare pets/mutations.{'\n'}
            - Avoid Glitches: Stick to legit methods.{'\n'}
            - Scale Up: Invest in master tools and transcendent seeds for quadrillion-hourly yields.
          </Text>

          <Text style={styles.tutorialTip}>
            Tip: Experiment in private servers first to avoid theft. Follow these methods to go from
            broke to trillionaire fast!
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
    opacity: 0.4,
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
