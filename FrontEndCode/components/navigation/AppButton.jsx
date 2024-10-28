// AppButton.jsx
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

const AppButton = ({ title, onPress, disabled }) => {
  // Handle press event for a disabled button
  const handlePress = () => {
    if (disabled) {
      Alert.alert("Incomplete Info", "Please fill in all the fields before proceeding.");
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      style={[styles.touchable, disabled && styles.disabledTouchable]}
      onPress={handlePress}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: "#eee4e1",
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 8,
  },
  disabledTouchable: {
    backgroundColor: "#d3d3d3", // Grey color for disabled button
  },
  text: {
    fontFamily: "Helvetica",
    color: "#463f3a",
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  disabledText: {
    color: "#a9a9a9", // Greyed out text color for disabled button
  },
});

export default AppButton;
