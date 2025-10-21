// app/photo-uploader.tsx
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function PhotoUploader() {
  const { uri } = useLocalSearchParams();
  const router = useRouter();

  const photoUri = Array.isArray(uri) ? uri[0] : uri;
  const [caption, setCaption] = useState("");
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleUpload = async () => {
    if (!photoUri) return;
    try {
      const newPath = `${FileSystem.documentDirectory}uploaded_${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: photoUri, to: newPath });

      router.push({
        pathname: "/(tabs)/reels",
        params: { uri: newPath, caption },
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to upload photo");
    }
  };

  const handleDownload = async () => {
    if (!photoUri) return;

    try {
      if (!hasPermission) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission required", "Allow access to save photos.");
          return;
        }
      }

      const fileName = `photo_${Date.now()}.jpg`;
      const newPath = `${FileSystem.cacheDirectory}${fileName}`;
      await FileSystem.copyAsync({ from: photoUri, to: newPath });

      const asset = await MediaLibrary.createAssetAsync(newPath);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      Alert.alert("Saved", "Photo saved to gallery.");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to save photo.");
    }
  };

  return (
    <View style={styles.container}>
      {photoUri && (
        <>
          <View style={styles.photoContainer}>
            <Image source={{ uri: photoUri }} style={styles.photo} />

            {/* X Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Caption Field */}
            <TextInput
              style={styles.inputOverlay}
              placeholder="Add a caption..."
              placeholderTextColor="#E9C589"
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.circleBtn}>
              <Feather name="type" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="happy-outline" size={22} color="#fff" />
            </TouchableOpacity>

            {/* ✅ Download button now works */}
            <TouchableOpacity style={styles.circleBtn} onPress={handleDownload}>
              <Feather name="download" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.circleBtn, styles.uploadCircle]}
              onPress={handleUpload}
            >
              <MaterialIcons name="file-upload" size={24} color="#1E1E1E" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  photoContainer: {
    width: screenWidth,
    height: screenHeight * 0.8,
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
    opacity: 0.8,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 22,
    padding: 8,
    zIndex: 10,
  },
  inputOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#E9C589",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  bottomControls: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  circleBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 40,
    padding: 12,
  },
  uploadCircle: {
  backgroundColor: "#E9C589",
  width: 100,
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center",
}
});
