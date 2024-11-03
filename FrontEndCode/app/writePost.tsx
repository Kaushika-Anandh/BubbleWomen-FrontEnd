import React from "react";
import { View, StyleSheet } from "react-native";
import Rating from "@/components/Rating"; // Adjust the path based on your project structure
import CommentCard from "@/components/CommentCard"; // Adjust the path based on your project structure

const Home = () => {
  return (
    <View style={styles.container}>
      <CommentCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Home;