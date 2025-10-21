import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

type MediaItem = {
  uri: string;
  type: "image" | "video";
  caption?: string;
  uploaded?: boolean;
  liked?: boolean;
  likes?: number;
  comments?: number;
  shares?: number;
  followed?: boolean;
};

function VideoItem({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePress = () => {
    if (isPlaying) player.pause();
    else player.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false}
        allowsPictureInPicture={false}
        nativeControls={false}
        contentFit="cover"
      />
    </TouchableOpacity>
  );
}

// ✅ Each reel is now a separate component
function ReelItem({
  item,
  index,
  handleLikeToggle,
  handleFollowToggle,
}: {
  item: MediaItem;
  index: number;
  handleLikeToggle: (index: number) => void;
  handleFollowToggle: (index: number) => void;
}) {
  const [showGif, setShowGif] = useState(false);
  const lastTap = useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // Only trigger GIF when liking via double tap
      if (!item.liked) {
        setShowGif(true);
        setTimeout(() => setShowGif(false), 800);
      }
      handleLikeToggle(index);
    }
    lastTap.current = now;
  };

  return (
    <View style={styles.reelContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleDoubleTap}
        style={styles.videoWrapper}
      >
        {item.type === "video" ? (
          <VideoItem uri={item.uri} />
        ) : (
          <Image
            source={{ uri: item.uri }}
            style={styles.video}
            resizeMode="cover"
          />
        )}

        {showGif && (
  <View style={styles.likeGifContainer}>
    <Image
      source={require("@/components/ui/heart-react.gif")}
      style={styles.likeGif}
      contentFit="contain"
    />
  </View>
)}

        {/* Right-side actions */}
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={[styles.actionBtn, item.liked && styles.iconActive]}
            onPress={() => handleLikeToggle(index)} // no GIF trigger here
          >
            <Ionicons
              name={item.liked ? "heart" : "heart-outline"}
              size={32}
              color={item.liked ? "#000" : "#E9C589"}
            />
            <Text
              style={[
                styles.actionText,
                { color: item.liked ? "#000" : "#E9C589" },
              ]}
            >
              {item.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="chatbubble-outline" size={30} color="#E9C589" />
            <Text style={[styles.actionText, { color: "#E9C589" }]}>
              {item.comments}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="share-outline" size={28} color="#E9C589" />
            <Text style={[styles.actionText, { color: "#E9C589" }]}>
              {item.shares}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom info */}
        <View style={styles.overlayBottom}>
          <View style={styles.userRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />
            <Text style={styles.username}>lesoura</Text>
            <Text style={styles.check}>✔</Text>
            <TouchableOpacity
              style={[
                styles.followBtn,
                item.followed && styles.followBtnActive,
              ]}
              onPress={() => handleFollowToggle(index)}
            >
              <Text
                style={[
                  styles.followText,
                  item.followed && styles.followTextActive,
                ]}
              >
                {item.followed ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
          {item.caption && <Text style={styles.caption}>{item.caption}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function Reels() {
  const { uri, caption } = useLocalSearchParams();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadImages = () => {
    const results = Array.from({ length: 5 }).map(() => ({
      uri: `https://picsum.photos/1080/1920?random=${Math.random() * 9999}`,
      type: "image" as const,
      caption: "Random photo from Picsum",
      likes: Math.floor(Math.random() * 300),
      comments: Math.floor(Math.random() * 80),
      shares: Math.floor(Math.random() * 40),
      liked: false,
      followed: false,
    }));
    setMedia(results);
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    if (uri) {
      const safeCaption = Array.isArray(caption) ? caption[0] : caption || "";
      setMedia((prev) => [
        {
          uri: String(uri),
          type: "image",
          caption: safeCaption,
          uploaded: true,
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false,
          followed: false,
        },
        ...prev.filter((i) => !i.uploaded),
      ]);
    }
  }, [uri]);

  const handleLikeToggle = (index: number) => {
    setMedia((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? item.likes! - 1 : item.likes! + 1,
            }
          : item
      )
    );
  };

  const handleFollowToggle = (index: number) => {
    setMedia((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, followed: !item.followed } : item
      )
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadImages();
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <FlatList
      data={media}
      renderItem={({ item, index }) => (
        <ReelItem
          item={item}
          index={index}
          handleLikeToggle={handleLikeToggle}
          handleFollowToggle={handleFollowToggle}
        />
      )}
      keyExtractor={(_, i) => i.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={height}
      snapToAlignment="start"
      bounces={true}
      windowSize={5}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#fff"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  reelContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  videoWrapper: {
    width: "100%",
    height: height * 0.8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    marginTop: -120,
    opacity: 0.8,
  },
  overlayBottom: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    marginBottom: 60,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  check: {
    color: "#E9C589",
    marginLeft: 4,
    fontSize: 14,
  },
  followBtn: {
    borderWidth: 1.5,
    borderColor: "#E9C589",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  followBtnActive: {
    backgroundColor: "#E9C589",
  },
  followText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#E9C589",
  },
  followTextActive: {
    color: "#000",
  },
  caption: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 2,
  },
  rightActions: {
    position: "absolute",
    right: 10,
    bottom: 60,
    alignItems: "center",
  },
  actionBtn: {
    alignItems: "center",
    marginBottom: 22,
    borderRadius: 50,
    padding: 8,
  },
  iconActive: {
    backgroundColor: "#E9C589",
  },
  actionText: {
    fontSize: 13,
    marginTop: 4,
  },
  likeGifContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 80,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
},
likeGif: {
  height: 400,
  width: 400,
},

});
