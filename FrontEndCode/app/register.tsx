import { View, Text, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import AppButton from '@/components/navigation/AppButton';
import { Link, useRouter } from 'expo-router';
import BackButton from '@/components/navigation/BackButton'; 

const Register = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '', 
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Handle input changes and validate form fields
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    const allFilled = Object.values({ ...formData, [field]: value }).every((val) => val.trim() !== '');
    setIsButtonEnabled(allFilled);

    if (field === 'passwordConfirm' || field === 'password') {
      setError(formData.password !== value && field === 'passwordConfirm' ? 'Passwords do not match.' : '');
    }
  };

  // Register function
  const onRegister = async () => {
    if (!isButtonEnabled) {
      Alert.alert("Incomplete Info", "Please fill in all the fields before creating an account.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Replace with your actual backend API call
      const response = await fetch('https://your-backend-url/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        Alert.alert("Registration Failed", "Please check your details and try again.");
      }
    } catch (err) {
      Alert.alert("An error occurred", "Unable to complete registration. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          
          {/* Back Button */}
          <View 
            style={[ 
              styles.backButtonWrapper, 
              Platform.OS === 'web' ? { left: screenWidth * 0.5 - 200 } : {} 
            ]}
          >
            <BackButton />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create new account</Text>

            {/* Image */}
            <Image 
              source={require("@/assets/images/register.png")}
              style={styles.image}
              resizeMode="contain"
            />

            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="First name"
              placeholderTextColor="#463f3a"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              placeholderTextColor="#463f3a"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />

            {/* Username Input */}
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#463f3a"
              value={formData.username}
              onChangeText={(text) => handleInputChange('username', text)}
            />

            {/* Other Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#463f3a"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Passcode"
              placeholderTextColor="#463f3a"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Passcode (confirmation)"
              placeholderTextColor="#463f3a"
              secureTextEntry
              value={formData.passwordConfirm}
              onChangeText={(text) => handleInputChange('passwordConfirm', text)}
            />

            {/* Error Message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Submit Button */}
            <AppButton
              title="Create Account"
              onPress={onRegister}
              disabled={!isButtonEnabled}
            />

            {/* Link to Login Page */}
            <Text style={styles.footerText}>
              Already a Member? 
              <Link style={styles.registerLink} href="/login"> Login</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles for the Register screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 20,
    zIndex: 10,
    ...Platform.select({
      web: { top: 20 },
      ios: { top: 50, left: 20 },
      android: { top: 50, left: 20 },
    }),
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 60, // Add top margin to push below back button
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10, // Reduced padding for title
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#463f3a',
    borderRadius: 7,
    paddingVertical: 14,
    paddingHorizontal: 24,
    fontSize: 16,
    marginBottom: 12, // Reduced margin for inputs
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#463f3a',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // Greyed out color when disabled
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
  },
  registerLink: {
    color: '#000000',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default Register;
