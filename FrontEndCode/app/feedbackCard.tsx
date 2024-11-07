import React from "react";
import { View, Text, StyleSheet } from "react-native";

type UserFeedbackCardProps = {
  username: string;
  timestamp: string;
  message: string;
  hashtag: string;
};

const UserFeedbackCard: React.FC<UserFeedbackCardProps> = ({
  username,
  timestamp,
  message,
  hashtag,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.username}>BubbleUser</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.hashtags}>{hashtag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    marginVertical: 0,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  hashtags: {
    fontSize: 12,
    color: "#007bff",
  },
});

export default UserFeedbackCard;
