import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  size?: number;
  onPress?: () => void;
};

export default function CenterButton({ size = 70, onPress }: Props) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const showArc = useRef(new Animated.Value(0)).current;
  const circleAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const handlePress = () => {
    const toValue = expanded ? 0 : 1;

    rotateAnim.setValue(0);
    showArc.setValue(1);

    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(showArc, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.stagger(
      100,
      circleAnims.map((anim) =>
        Animated.spring(anim, { toValue, useNativeDriver: true, friction: 5 })
      )
    ).start();

    setExpanded(!expanded);
  };

  // 📸 Open camera for photos only and redirect to trimmer
  const openCamera = async () => {
    try {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();

      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        Alert.alert(
          "Permission denied",
          "Camera and media permissions are required."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ photos only
        allowsEditing: false, // ❌ no cropping here
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        await MediaLibrary.createAssetAsync(asset.uri);

        // 🔁 Redirect to trimmer screen and pass image URI
        router.push({
          pathname: "/video-trimmer",
          params: { uri: asset.uri },
        });
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong while taking a photo.");
    }
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const opacity = showArc.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const positions = [
    { x: -70, y: -50 },
    { x: 0, y: -100 },
    { x: 70, y: -50 },
  ];

  const images = [
    require("./master-sprinkler.png"),
    require("./sheckles.png"),
    require("./reclaimer-tool.png"),
  ];

  const pages: Array<
    "/sprinkler-method" | "/sheckle-grind" | "/reclaimer-method"
  > = ["/sprinkler-method", "/sheckle-grind", "/reclaimer-method"];

  return (
    <View style={styles.wrapper}>
      <View style={styles.outerContainer}>
        <Animated.View
          style={[
            styles.arc,
            {
              width: size + 2,
              height: size + 2,
              borderRadius: (size + 2) / 2,
              transform: [{ rotate: rotation }],
              opacity,
              borderTopColor: "#E9C589",
            },
          ]}
        />

        {positions.map((pos, index) => (
          <Animated.View
            key={index}
            style={[
              styles.extraCircle,
              {
                transform: [
                  {
                    translateX: circleAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, pos.x],
                    }),
                  },
                  {
                    translateY: circleAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, pos.y],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                router.push(pages[index]);
                handlePress();
              }}
            >
              <Image
                source={images[index]}
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          </Animated.View>
        ))}

        <TouchableOpacity
          style={[
            styles.circle,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
          onPress={handlePress}
          onLongPress={openCamera} // 📸 opens camera then redirects
        >
          <Image
            source={require("./rc.png")}
            style={{ width: size, height: size, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  arc: {
    position: "absolute",
    borderWidth: 4,
    borderColor: "transparent",
    borderTopColor: "#E9C589",
  },
  extraCircle: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});
