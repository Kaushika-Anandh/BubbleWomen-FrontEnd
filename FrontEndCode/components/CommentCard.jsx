import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Rating from "./Rating";
import { useRouter } from "expo-router";

// Get the screen width
const { width } = Dimensions.get("window");

const DatePickerOverlay = ({ initialDate, onSave, onClose }) => {
  const [selectedMonth, setSelectedMonth] = useState(initialDate.month);
  const [selectedDay, setSelectedDay] = useState(initialDate.day);
  const [selectedDate, setSelectedDate] = useState(initialDate.date);
  const [selectedHour, setSelectedHour] = useState(initialDate.hour);
  const [selectedMinute, setSelectedMinute] = useState(initialDate.minute);
  const [selectedPeriod, setSelectedPeriod] = useState(initialDate.period);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
  const periods = ["AM", "PM"];

  return (
    <Modal transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlayContainer}>
        <View style={styles.datePickerCard}>
          <Text style={styles.overlayHeading}>Pick a Date</Text>
          <View style={styles.pickerContainer}>
            {/* Month Picker */}
            <ScrollView style={styles.pickerColumn} snapToInterval={40} decelerationRate="fast">
              {months.map((month) => (
                <TouchableOpacity key={month} onPress={() => setSelectedMonth(month)}>
                  <Text style={[styles.pickerText, selectedMonth === month && styles.selectedText]}>{month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Day Picker */}
            <ScrollView style={styles.pickerColumn} snapToInterval={40} decelerationRate="fast">
              {days.map((day) => (
                <TouchableOpacity key={day} onPress={() => setSelectedDay(day)}>
                  <Text style={[styles.pickerText, selectedDay === day && styles.selectedText]}>{day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Date Picker */}
            <ScrollView style={styles.pickerColumn} snapToInterval={40} decelerationRate="fast">
              {dates.map((date) => (
                <TouchableOpacity key={date} onPress={() => setSelectedDate(date)}>
                  <Text style={[styles.pickerText, selectedDate === date && styles.selectedText]}>{date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Hour Picker */}
            <ScrollView style={styles.pickerColumn} snapToInterval={40} decelerationRate="fast">
              {hours.map((hour) => (
                <TouchableOpacity key={hour} onPress={() => setSelectedHour(hour)}>
                  <Text style={[styles.pickerText, selectedHour === hour && styles.selectedText]}>{hour}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Minute Picker */}
            <ScrollView style={styles.pickerColumn} snapToInterval={40} decelerationRate="fast">
              {minutes.map((minute) => (
                <TouchableOpacity key={minute} onPress={() => setSelectedMinute(minute)}>
                  <Text style={[styles.pickerText, selectedMinute === minute && styles.selectedText]}>{minute}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* Period Picker */}
            <ScrollView style={styles.pickerColumn} snapToInterval={40} decelerationRate="fast">
              {periods.map((period) => (
                <TouchableOpacity key={period} onPress={() => setSelectedPeriod(period)}>
                  <Text style={[styles.pickerText, selectedPeriod === period && styles.selectedText]}>{period}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => onSave(selectedDay, selectedMonth, selectedDate, selectedHour, selectedMinute, selectedPeriod)}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CommentCard = () => {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    day: "Wednesday",
    month: "March",
    date: "13",
    hour: "2",
    minute: "45",
    period: "PM",
  });
  const [commentText, setCommentText] = useState("");
  const characterLimit = 2000;
  const [warning, setWarning] = useState("");

  const handleSaveDate = (day, month, date, hour, minute, period) => {
    setSelectedDate({ day, month, date, hour, minute, period });
    setShowDatePicker(false);
  };

  const handlePost = () => {
    router.back();
    alert("Rating Posted");
  };

  const handleTextChange = (text) => {
    if (text.length > characterLimit) {
      setWarning("Character limit exceeded!");
    } else {
      setWarning("");
    }
    setCommentText(text);
  };

  return (
    <View style={styles.card}>
      <View style={styles.commentContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.user}>
          <View style={styles.userPic}>
            <Ionicons name="person" size={20} color="#707277" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Bubble User</Text>
            <Text style={styles.userDate}>
              on {selectedDate.day}, {selectedDate.month} {selectedDate.date}, {selectedDate.hour}:{selectedDate.minute} {selectedDate.period}
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.pickDateButton}>Pick a Date</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={styles.commentContent}
          placeholder="Add your experience"
          multiline
          maxLength={characterLimit}
          value={commentText}
          onChangeText={handleTextChange}
        />
        {warning ? <Text style={styles.warningText}>{warning}</Text> : null}
      </View>
      <View style={styles.textBox}>
        <TextInput
          style={styles.textInput}
          placeholder="add hashtags using '#'"
          placeholderTextColor="#707277"
          multiline
        />
      </View>
      <View style={styles.ratingContainer}>
        <Rating />
        <TouchableOpacity style={styles.sendButton} onPress={handlePost}>
          <Ionicons name="arrow-up" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DatePickerOverlay initialDate={selectedDate} onSave={handleSaveDate} onClose={() => setShowDatePicker(false)} />
      )}
    </View>
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  overlayHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerColumn: {
    width: 50,
    height: 120,
  },
  pickerText: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 8,
    color: "#707277",
  },
  selectedText: {
    color: "#000",
    fontWeight: "bold",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: width - 32, // Match width of the card to the screen width with margin
    marginHorizontal: 16, // Add horizontal margins to align with screen edges
    marginTop: 20, // Add top margin for spacing from the top
  },
  commentContainer: {
    marginBottom: 12,
  },
  cancelText: {
    color: "#FF4D4F",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userPic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userDate: {
    fontSize: 12,
    color: "#707277",
  },
  pickDateButton: {
    fontSize: 12,
    color: "#1890FF",
    marginTop: 4,
  },
  commentContent: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
  },
  warningText: {
    color: "#FF4D4F",
    fontSize: 12,
    marginTop: 5,
  },
  textBox: {
    marginTop: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  textInput: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  sendButton: {
    backgroundColor: "#1890FF",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentCard;
