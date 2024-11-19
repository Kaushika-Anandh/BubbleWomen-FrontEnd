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
import Rating from "@/components/Rating";
import { useRouter, useGlobalSearchParams} from "expo-router";
import DatePickerOverlay from "@/components/DatePickerOverlay";
const { width } = Dimensions.get("window");

const WritePost = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [commentText, setCommentText] = useState("");
  const characterLimit = 2000;
  const [warning, setWarning] = useState("");
  const {latitude, longitude } = params; // Retrieve the passed location
  const handleSaveDate = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handlePost = () => {
    router.back();
    alert("Rating Posted");
  };

  const handleTextChange = (text: string) => {
    if (text.length > characterLimit) {
      setWarning("Character limit exceeded!");
    } else {
      setWarning("");
    }
    setCommentText(text);
  };
    
  if (!latitude || !longitude) {
    // Handle the case where currentLocation is not passed or unavailable      
    return <Text>No location available</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.commentContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.user}>
            <View style={styles.userPic}>
              <Ionicons name="person" size={25} color="#707277" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Bubble User</Text>
              <Text style={styles.userDate}>
                on {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(selectedDate)}
              </Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.pickDateButton}>choose date & time</Text>
              </TouchableOpacity>
              <Text>Latitude: {latitude}, Longitude: {longitude}</Text>
            </View>
          </View>
          <TextInput
            style={styles.commentContent}
            placeholder="Add your experience"
            placeholderTextColor="#8a817c"
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
            placeholderTextColor="#8a817c"
            multiline
          />
        </View>
        <View style={styles.ratingContainer}>
          <Rating />
          <TouchableOpacity style={styles.sendButton} onPress={handlePost}>
            <Ionicons name="arrow-up" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DatePickerOverlay
          initialDate={selectedDate}
          onSave={handleSaveDate}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    width: width - 16,
    marginHorizontal: 16,
    marginTop: 20,
  },
  commentContainer: {
    marginBottom: 12,
  },
  cancelText: {
    color: "#FF4D4F",
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  userDate: {
    fontSize: 15,
    color: "#707277",
  },
  pickDateButton: {
    fontSize: 12,
    color: "#1890FF",
    marginTop: 4,
  },
  commentContent: {
    marginTop: 10,
    fontSize: 15,
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
    marginTop: 1,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  textInput: {
    fontSize: 15,
    color: "#333",
    lineHeight: 15,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  sendButton: {
    backgroundColor: "#7bdff2",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WritePost;
