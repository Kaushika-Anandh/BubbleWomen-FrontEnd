import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Alert, Dimensions, TouchableOpacity } from "react-native";
import MapView, { MapPressEvent, Marker, Region, Point } from "react-native-maps";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const SingleTapMapScreen = () => {
  const router = useRouter();
  const [marker, setMarker] = useState<any | null>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [locationName, setLocationName] = useState("Location Name");
  const [averageRating, setAverageRating] = useState(3.5); // Dummy rating value
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation();

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

  // Handle single-tap to place a marker and center map on the marker's location
  const handleSingleTap = async (event: MapPressEvent) => {
    const coordinate = event.nativeEvent.coordinate;

    if (marker) {
      Alert.alert(
        "New Location",
        "Do you want to place a marker at this new location?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            onPress: async () => {
              setMarker({ id: Math.random().toString(), coordinate });
              await fetchLocationName(coordinate);
              centerMapOnCoordinate(coordinate);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setMarker({ id: Math.random().toString(), coordinate });
      await fetchLocationName(coordinate);
      centerMapOnCoordinate(coordinate);
    }
  };

  const centerMapOnCoordinate = (coordinate: { latitude: number; longitude: number }) => {
    const region: Region = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current?.animateToRegion(region, 1000);
  };

  const fetchLocationName = async (coordinate: { latitude: number; longitude: number }) => {
    try {
      const [location] = await Location.reverseGeocodeAsync({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
  
      if (location) {
        // Check if a place name or point of interest is available
        const placeName = location.name; // often contains place names like "Phoenix Marketcity"
        const city = location.city ? `, ${location.city}` : "";
  
        // If `placeName` is a landmark or business name, use it; otherwise, use road or other fields
        if (placeName && placeName !== location.street) {
          setLocationName(`${placeName}${city}`);
        } else {
          setLocationName(`${location.street}${city}` || "Unknown Location");
        }
      } else {
        setLocationName("Unknown Location");
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Unknown Location");
    }
  };

  const updateOverlayPosition = async (coordinate: { latitude: number; longitude: number }) => {
    const point: Point | undefined = await mapRef.current?.pointForCoordinate(coordinate);
    if (point) {
      setOverlayPosition({
        x: point.x - 161, // Center the overlay horizontally
        y: point.y - 165,  // Position the overlay above the marker
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert("Error", errorMsg);
    }
  }, [errorMsg]);

  useEffect(() => {
    if (marker) {
      updateOverlayPosition(marker.coordinate);
    }
  }, [marker]);

  // Define a function to determine the color based on rating value
  const getRatingColor = () => {
    if (averageRating < 2.5) return "red";
    if (averageRating < 4) return "orange";
    return "green";
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 37.78825,
          longitude: currentLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleSingleTap}
        onRegionChange={() => {
          // Update overlay position continuously as the map moves
          if (marker) updateOverlayPosition(marker.coordinate);
        }}
      >
        {marker && <Marker key={marker.id} coordinate={marker.coordinate} />}
      </MapView>

      {marker && (
        <View
          style={[
            styles.popupContainer,
            { left: overlayPosition.x, top: overlayPosition.y },
          ]}
        >
          <View style={styles.popupCard}>
            <Text style={styles.locationHeading} numberOfLines={1} adjustsFontSizeToFit>
              {locationName}
            </Text>
            <Text style={styles.ratingText}>
              Average Rating: <Text style={{ color: getRatingColor() }}>{averageRating}</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => router.navigate("/writePost")}
              >
                <Text style={styles.buttonText}>Write your own Rating</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => router.navigate("/writePost")}
              >
                <Text style={styles.buttonText}>View Ratings</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.popupTail} />
        </View>
      )}
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
  popupContainer: {
    position: "absolute",
    alignItems: "center",
    zIndex: 1,
  },
  popupCard: {
    width: 320,
    padding: 20,
    backgroundColor: "#f4f3ee",
    borderRadius: 8,
    elevation: 5,
    alignItems: "flex-start", // Aligns content to the left
    zIndex: 2,
  },
  popupTail: {
    width: 16,
    height: 16,
    backgroundColor: "#f4f3ee",
    position: "absolute",
    bottom: -8,
    transform: [{ rotate: "45deg" }],
    elevation: 4,
    borderRadius: 1.5,
    zIndex: 1,
  },
  locationHeading: {
    fontSize: 20, // Max font size
    fontWeight: "800",
    color: "rgb(26, 26, 26)",
    marginBottom: 5,
    flexShrink: 1,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgb(99, 99, 99)",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  acceptButton: {
    width: 160,
    height: 30,
    backgroundColor: "#e0afa0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 2,
  },
  declineButton: {
    width: 100,
    height: 30,
    backgroundColor: "#e0afa0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "rgb(46, 46, 46)",
    fontWeight: "600",
  },
});

export default SingleTapMapScreen;
