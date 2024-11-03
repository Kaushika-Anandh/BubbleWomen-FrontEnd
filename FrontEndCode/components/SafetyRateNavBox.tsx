import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface SafetyRateNavBoxProps {
  visible: boolean;
  onClose: () => void;
  overlayText: string;
}

const SafetyRateNavBox: React.FC<SafetyRateNavBoxProps> = ({ visible, onClose, overlayText }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.card}>
        <Text style={styles.popupText}>{overlayText}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    bottom: 20,
    width: width * 0.9,
    alignSelf: 'center',
  },
  card: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  popupText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
  closeButton: {
    width: 80,
    height: 35,
    backgroundColor: '#7b57ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default SafetyRateNavBox;
