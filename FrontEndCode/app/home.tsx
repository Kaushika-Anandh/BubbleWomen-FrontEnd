import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView from "react-native-maps";
const home = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MapView style={StyleSheet.absoluteFill} />
      <Text>Backend Hosted Publically</Text>
    </View>
  );
};

export default home;
