import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import UserFeedbackCard from "./feedbackCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BackButton from "@/components/navigation/BackButton";

// Define Post type
type Post = {
  id: string;
  timestamp: string;
  message: string;
  hashtag: string;
  location: string;
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    const markerLocationString = await AsyncStorage.getItem("markerLocation");
    let markerLocation;
    if (markerLocationString) {
      markerLocation = JSON.parse(markerLocationString);
    }

    console.log("markerlocation", markerLocation);
    try {
      const response = await fetch(
        `https://bubblewomenserver-50023240811.development.catalystappsail.in/api/location/blog/nearby?longitude=${markerLocation.long}&latitude=${markerLocation.lat}&maxDistance=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("jwtToken")}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Post[] = await response.json();
      console.log("data", data);
      setPosts(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton/>
      </View>
      <Text style={styles.header}>Blogs</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserFeedbackCard
            username="BubbleUser"
            timestamp={item.timestamp}
            message={item.message}
            hashtag={item.hashtag}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default App;
