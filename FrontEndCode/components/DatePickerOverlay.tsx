import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerOverlayProps {
  initialDate: Date;
  onSave: (selectedDate: Date) => void;
  onClose: () => void;
}

const DatePickerOverlay: React.FC<DatePickerOverlayProps> = ({ initialDate, onSave, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios"); // Show Date Picker directly on iOS

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false); // Close picker on Android after selection
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = () => {
    onSave(selectedDate);
    onClose();
  };

  // Format selected date
  const formattedDate = `${selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })}, ${selectedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;

  return (
    <Modal transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlayContainer}>
        <View style={styles.datePickerCard}>
          <Text style={styles.overlayHeading}>Pick a Date</Text>

          {/* iOS and Android Picker */}
          {(Platform.OS === "ios" || showDatePicker) && (
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="spinner" // Use spinner to apply custom colors
              onChange={handleDateChange}
              style={{ width: "100%" }}
              textColor={Platform.OS === "android" ? "#463f3a" : undefined} // Set text color for Android
              themeVariant={Platform.OS === "ios" ? "dark" : undefined} // Dark mode for iOS to adjust colors
            />
          )}

          {/* Android Date Picker Trigger Button */}
          {Platform.OS === "android" && !showDatePicker && (
            <TouchableOpacity
              style={styles.openDatePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.openDatePickerButtonText}>
                {`Selected Date: ${formattedDate}`}
              </Text>
            </TouchableOpacity>
          )}

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerCard: {
    backgroundColor: "#555555",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  overlayHeading: {
    fontSize: 25,
    color:"#e9ecef",
    fontWeight: "bold",
    marginBottom: 20,
  },
  openDatePickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#555555",
    borderRadius: 5,
    marginBottom: 20,
  },
  openDatePickerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#e6beae",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#6c757d",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DatePickerOverlay;
