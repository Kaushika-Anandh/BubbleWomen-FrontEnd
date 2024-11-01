import React, { useEffect, useState } from "react";
import { View, StyleSheet, PermissionsAndroid, Alert } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import * as Location from "expo-location";

const DoubleTapMapScreen = () => {
  const [markers, setMarkers] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<any>(null); // Store the user's current location
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Request location permission and get the current location
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  };

  // Handle double-tap to place a marker
  const handleDoubleTap = (event: MapPressEvent) => {
    const coordinate = event.nativeEvent.coordinate;
    const newMarker = {
      id: Math.random().toString(),
      coordinate: coordinate,
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  };

  useEffect(() => {
    getLocation(); // Get the user's current location on component mount
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 37.78825, // Default to San Francisco coordinates if not available
          longitude: currentLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onDoublePress={handleDoubleTap} // Handle double-tap to place a marker
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate} // Display the marker
          />
        ))}
      </MapView>
      {/* {errorMsg && <Alert title="Error" message={errorMsg} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DoubleTapMapScreen;
